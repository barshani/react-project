import { ToastContainer, toast } from "react-toastify";
import { Card } from "./business/cards";
import {editCard, getCard } from "../services/apiService";
import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import Title from "../components/Title";
interface Props{
    background:string;
    color:string;
}
function ViewPage({background,color}:Props){
    const navigate=useNavigate()
    const [card,setCard]=useState<Card>()
     const {_id} =useParams();
      useEffect(() => {
        if (!_id) return;
        getCard(_id)
            .then(card => {setCard(card)

              })
    }, [_id])
return(
    <>
    <div className="row w-75 mx-auto mb-5 gap-2" style={{paddingTop:'15vh'}}>
    <Title mainText="Card Ditails"/>
    <div className="col">
        {card?.imageURL&&card.imageALT&&<img src={card.imageURL} alt={card.imageALT} className="card-img-top h-100"/>}
        {card?.imageURL&&!card.imageALT&&<img src={card.imageURL} className="card-img-top h-100"/>}
        {!card?.imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-100" alt="Logo" />}
    </div>
    <div className="col w-50 ">
    <h1>{card?.title}</h1>
    <h4>{card?.subtitle}</h4>
    <p>{card?.description}</p>
    <h6>contact</h6>
    <p>{card?.email}</p>
    <p>{card?.phone}</p>
    <p>{card?.country}, {card?.city}, {card?.street}, {card?.houseNum}</p>
    </div>
    </div>
    <div className="d-flex justify-content-center">
            <button
                className="btn w-25 mb-5"
                onClick={()=>navigate(-1)}
                style={{background:background,color:color}}
            >
                    Back
            </button>
        </div>
    </>
);
}
export default ViewPage;