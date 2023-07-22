import { toast } from "react-toastify";
import cards, { Card } from "./business/cards";
import { addCard } from "../services/apiService";
import { useState } from "react";
import AddForm from "../components/AddForm";
import { Navigate, useNavigate } from "react-router-dom";
interface Props{
    background:string;
    color:string;
}
function AddPage({background,color}:Props){
    const [cards, setCards] = useState<Array<Card>>([]);
    const navigate=useNavigate()
 function onAdd(card: Card) {
        addCard(card)
            .then(json => {
                toast.success(`Card of ${json.title} has been added successfully`);

            })
    }
    return (
        <>
           <AddForm 
           onAdd={onAdd}
           background={background}
           color={color}
           />
        </>
           )
    }
    export default AddPage;