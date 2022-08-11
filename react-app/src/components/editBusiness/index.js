import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBusinessThunk, updateBusinessThunk, deleteBusinessThunk } from "../../store/business";
import EditBusinessModal from "./editBusinessModal";
// import './editBusiness.css'


function EditBusiness ({business, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [showModal, setShowModal] = useState(false);
    const showModal = EditBusinessModal.showModal
    const user = useSelector(state => state.session.user)
    // console.log(name)
    let errorsObj = {content: ''};

    const [userId] = useState((user.id));
    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [phone_number, setPhoneNumber] = useState(business.phone_number);
    const [website, setWebsite] = useState(business.website);

    const [errors, setErrors] = useState(errorsObj);

    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updateWebsite = (e) => setWebsite(e.target.value)
    // console.log(name)
    const handleSubmit = async (e) => {
        e.preventDefault();

        let error = false;
        errorsObj = {...errorsObj};
        if(name === '') {
          errorsObj.name = "Name is required";
          error = true;
        } else if (name.length < 4 || name.length > 20) {
          errorsObj.name = "Name must be longer than 4 characters and shorter than 20";
          error = true;
        } else if (address.length < 4 || address.length > 25) {
          errorsObj.address = "Address must be longer than 4 characters and shorter than 25";
          error = true;
        } else if (city === '') {
          errorsObj.city = "City is required"
          error = true;
        }else if (state === '') {
          errorsObj.state = "State is required"
          error = true;
        }else if (phone_number === '') {
          errorsObj.phone_number = "Phone # is required"
          error = true;
        }else if (phone_number.length !== 10 ) {
          errorsObj.phone_number ="Valid 10 digit phone number is required"
          error = true;
        }else if(!website.includes('www')) {
          errorsObj.website = "Please enter a valid website starting with 'www'"
          error = true;
        }
        setErrors(errorsObj);

        if(!error) {
            const updateBusiness = {
                userId,
                name,
                address,
                city,
                state,
                phone_number,
                website,
            }
            // console.log(createdBusiness)

            await dispatch(updateBusinessThunk(updateBusiness, business.id))
            await dispatch(getAllBusinessThunk())
            // alert("Business Updated")
            // history.push(`/business/${business.id}`)
            setShowModal(false)
        }
    }
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        dispatch(deleteBusinessThunk(business.id));
        // alert("Business Deleted successfully")
        history.push(`/business`)

    }


    return (
        <>
            <h2>Edit your business!</h2>
            <form className='business-form' onSubmit={handleSubmit}>
          {Object.values(errors).map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
          <div>
          <label>Name</label>
            <input className='name-form' type='text' value={name} placeholder='Business name' onChange={updateName} required/>
          </div>
          <div>
            <label>Address</label>
            <input className='address-form' type='text' value={address} placeholder='address' onChange={updateAddress} required/>
          </div>
          <div>
            <label>City</label>
            <input className='city-form' type='text' value={city} placeholder='city' onChange={updateCity} required/>
          </div>
          <div>
            <label>State</label>
            <input className ='state-form' type='text' value={state} placeholder='state' onChange={updateState} required/>
          </div>
          <div>
            <label>Phone #</label>
            <input className = 'phone-form' type='text' value={phone_number} placeholder='phone number' onChange={updatePhoneNumber} required/>
          </div>
          <div>
            <label>Website</label>
            <input className = 'website-form' type='text' value={website} placeholder='website' onChange={updateWebsite} required/>
          </div>
            <button className="Create-Business" type="submit">Post</button>
        </form>
        </>
    )
}

export default EditBusiness
