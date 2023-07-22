import { ToastContainer, toast } from "react-toastify";
import { Card } from "./business/cards";
import {editCard } from "../services/apiService";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import EditForm from "../components/EditForm";
interface Props{
    background:string;
    color:string;
}
function EditPage({background,color}:Props){
    const [cards, setCards] = useState<Array<Card>>([]);
    const navigate=useNavigate()
 function onEdit(card: Card) {
        editCard(card)
            .then(json => {
                toast.success(`Card of ${json.title} has been edited successfully`);
            })
    }
    return (
        <>
           <EditForm 
           onEdit={onEdit}
           background={background}
           color={color}
           />
        </>
           )
    }
    export default EditPage;