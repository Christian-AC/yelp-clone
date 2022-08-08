import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBusinessThunk, updateBusinessThunk, deleteBusinessThunk } from "../../store/business";


function EditBusiness ({business}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)
    // console.log(name)

    const [userId] = useState((user.id));
    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [phone_number, setPhoneNumber] = useState(business.phone_number);
    const [website, setWebsite] = useState(business.website);

    const [validationErrors, setValidationErrors] = useState([]);

    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updateWebsite = (e) => setWebsite(e.target.value)
    // console.log(name)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];

        if (name.length > 40)
          errors.push("Business name too long (40 characters or less)");

        if (address.length === 0) errors.push("Address can't be empty");

        if (city.length > 25)
          errors.push("City name too long (25 characters or less)");

        if (phone_number.length !== 10)
          errors.push("Phone number must be 10 digits");

        if (!website.includes("http://") && !website.includes("https://"))
          errors.push("Website must include http:// or https://");

        if (website.length > 52) errors.push("Website URL too long");

        setValidationErrors(errors);

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
    }
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        dispatch(deleteBusinessThunk(business.id));
        alert("Business Deleted successfully")
        history.push(`/business`)

    }

    let requirements;

      if (validationErrors.length) {
        requirements = (
                validationErrors.map(error =>{
                    return(
                        <h3>{error}</h3>
                    )
                }))
      } else {
        requirements = <></>;
      }



    return (
        <>
        <button onClick={(e)=>handleDeleteClick(e)}>Delete</button>
        <form className='business-form' onSubmit={handleSubmit}>
            <h2>Edit your business!</h2>
            {requirements}
            <input type='text' value={name} placeholder='Business name' onChange={updateName} required/>
            <input type='text' value={address} placeholder='address' onChange={updateAddress} required/>
            <input type='text' value={city} placeholder='city' onChange={updateCity} required/>
            <input type='text' value={state} placeholder='state' onChange={updateState} required/>
            <input type='text' value={phone_number} placeholder='phone number' onChange={updatePhoneNumber}/>
            <input type='text' value={website} placeholder='website' onChange={updateWebsite}/>
            <button className="button" type="submit">Post</button>
        </form>
        </>
    )
}

export default EditBusiness
