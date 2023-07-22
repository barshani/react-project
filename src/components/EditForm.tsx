import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Title from "./Title";
import { Card } from "../pages/business/cards";
import { getCard } from "../services/apiService";
import { getUserEmail } from "../auth/TokenManager";
import validator from "validator";

interface Props {
    onEdit: Function;
    background:string;
    color:string;
}

function EditForm({onEdit,background,color}:Props) {
    const navigate = useNavigate();
     const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imageALT, setImageALT] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNum, setHouseNum] = useState('');
    const [zip, setZip] = useState('');
    const [disable, setdisable] = useState(true);
    const [error, setError] = useState('');
    const {_id} =useParams();
      useEffect(() => {
        if (!_id) return;
        getCard(_id)
            .then(card => {
               setTitle(card.title)
               setSubtitle(card.subtitle)
              setDescription(card.description)
              setPhone(card.phone)
        setEmail(card.email)
        setWeb(card.web||'')
        setImageURL(card.imageURL||'')
        setImageALT(card.imageALT||'')
        setState(card.state||'')
        setCountry(card.country)
        setCity(card.city)
        setStreet(card.street)
        setHouseNum(card.houseNum)
        setZip(card.zip||'')
            })
    }, [_id])
    function validate(): boolean {
        if (!title) {
            setError('*title is required')
            return false;
        }
        if (title.length<3) {
            setError('*title is too short');
            return false;
        }
        if (!subtitle) {
           setError('*subtitle is required');
            return false;
        }
        if (subtitle.length<3) {
            setError('*subtitle is too short');
            return false;
        }
        if (!description) {
           setError('*discription is required');
            return false;
        }
        if (description.length<3) {
            setError('*discription is too short');
            return false;
        }
        if (!phone) {
            setError('*phone is required');
            return false;
        }
        if(!validator.isNumeric(phone)) {
            setError('*phone number is invalid');
            return false;
        }
        if (phone.length<10||phone.length>12) {
            setError('*phone is invalid');
            return false;
        }
        if (!email) {
            setError('*email is required');
            return false;
        }
        if (email.length<10||!validator.isEmail(email)) {
            setError('*invalid mail');
            return false;
        }
        if (!country) {
            setError('*country name is required');
            return false;
        }
        if (country.length<3) {
            setError('*country is too short');
            return false;
        }
        if (!city) {
            setError('*city name is required');
            return false;
        }
        if (city.length<3) {
            setError('*city is too short');
            return false;
        }
        if (!street) {
            setError('*street name is required');
            return false;
        }
        if (street.length<3) {
            setError('*street is too short');
            return false;
        }
        if (!houseNum) {
            setError('*house number is required');
            return false;
        }
        if(!validator.isNumeric(houseNum)) {
            setError('*house number is invalid');
            return false;
        }

        setError('');
        setdisable(false)
        return true;
    }

    function handleClick() {
        const createdBy=getUserEmail(); 
        onEdit({
            _id,
            title,
            subtitle,
            description,
            phone,
            email,
            web,
            imageURL,
            imageALT,
            state,
            country,
            city,
            street,
            houseNum,
            zip,
        })
        setdisable(true);
        
    }

    return (
        <>
        <ToastContainer/>
        <div style={{paddingTop:'15vh'}}>
        <Title mainText="UPDATE CARD"></Title>
        <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Title*"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value); 
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Subtitle*"
                value={subtitle}
                onChange={(e) => {
                setSubtitle(e.target.value);
                setdisable(true);
            }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Description*"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Phone*"
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) =>{ 
                    setEmail(e.target.value);
                   setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Web"
                value={web}
                onChange={(e) => {
                    setWeb(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image url"
                value={imageURL}
                onChange={(e) =>{
                    setImageURL(e.target.value);
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Image alt"
                value={imageALT}
                onChange={(e) => {
                    setImageALT(e.target.value)
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => {
                    setState(e.target.value)
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Country*"
                value={country}
                onChange={(e) => {
                    setCountry(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="City*"
                value={city}
                onChange={(e) => {
                    setCity(e.target.value)
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Street*"
                value={street}
                onChange={(e) => {
                    setStreet(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Housenumber*"
                value={houseNum}
                onChange={(e) => {
                    setHouseNum(e.target.value);
                    setdisable(true);
                }}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Zip*"
                value={zip}
                onChange={(e) => {
                    setZip(e.target.value);
                    setdisable(true);
                }}
            />
            </div>
            <div className="row mx-auto w-50 pb-3">
            <div className="text-center text-danger">{error}</div>
            <div className="row mx-auto gap-1">
            <button
                className="btn col mx-auto"
                onClick={()=>navigate(-1)}
                style={{background:background,color:color}}
            >
                    back
            </button>
            <button
                className="btn col mx-auto"
                onClick={validate}
                style={{background:background,color:color}}
            >
            <i className="bi bi-arrow-repeat"></i>
            </button>
            </div>
            <div className="row mx-auto mt-1">
            <button
                disabled={disable}
                className="btn"
                onClick={handleClick}
                style={{background:background,color:color}}
            >
            Update
            </button>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default EditForm;