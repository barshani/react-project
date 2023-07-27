import { useEffect, useState } from "react";
import { deleteCard, getMyCards } from "../services/apiService";
import { Card } from "./business/cards";
import Title from "../components/Title";
import { getUserEmail } from "../auth/TokenManager";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
interface Props{
    background:string
    color:string
}
function MyCardsPage({background,color}:Props){
   const [cards, setCards] = useState<Array<Card>>([]);
   const [searchCards, setSearchCards] = useState<Array<Card>>([]);
   const [search, setSearch] = useState('');
    useEffect(() => {
        const userEmail=getUserEmail()
        getMyCards(userEmail)
            .then(json => {
                setCards(json)
                setSearchCards(json)
            })
    }, []);
    async function onDelete(_id: string) {
        const res = await deleteCard(_id);
        const updated = [...cards].filter(
            cards => cards._id !== _id
        )

        setSearchCards(updated);

        toast.success('Card has been deleted');
    }
     function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        const normalizedValue = value.trim().toLowerCase();
        console.log(normalizedValue)
        const updated = [...cards].filter(
            card =>card.title.toLowerCase().includes(normalizedValue)
        );
        setSearchCards(updated);
    }

    return (
        <>
        <ToastContainer/>
        <div className="w-75 mx-auto" style={{paddingTop:'15vh'}}>
        <Title mainText="My Cards" subText="Here you can find business cards that you created"></Title>
        <input
                        className="form-control mx-3 mb-3 w-25"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                           <div className="d-flex flex-wrap justify-content-start ms-3 gap-3">
                    {
                        searchCards.map(card =>
                           <div className="card" key={card._id}style={{width:"22rem",height:"35rem",background:background,color:color}}>
                            {card.imageURL&&card.imageALT&&<img src={card.imageURL} alt={card.imageALT} className="card-img-top h-50"/>}
                            {card.imageURL&&!card.imageALT&&<img src={card.imageURL} className="card-img-top h-50"/>}
                            {!card.imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-50" alt="Logo" />}
                           
                            <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.subtitle}</p>
                            <hr />
                            <p className="card-text">{card.phone}</p>
                            <p className="card-text">{card.country}</p>
                            <p className="card-text">{card.zip}</p>
                            <div className="row">
                            <div className="col">
                             <button
                             className="btn btn-default"
                             onClick={()=>onDelete(card._id)}
                                 >
                            <i className="bi bi-trash" style={{color:color}}/>
                            </button>
                            </div>
                            <div className="d-flex justify-content-end col">
                             <button
                             className="btn btn-default"
                                 >
                            <Link to={`/editPage/${card._id}`}>
                            <i className="bi bi-pencil-fill" style={{color:color}}/>
                            </Link>
                            </button>
                             <button
                             className="btn btn-default"
                                 >
                            <Link to={`/viewPage/${card._id}`}>
                            <i className="bi bi-telephone-fill" style={{color:color}}/>
                            </Link>
                            </button>
                            </div>
                            </div>
                            </div>
                           </div>
                        )
                    }
                    
                </div>
                </div>
                 <div className="d-flex pb-3 me-5 justify-content-end">
                 <button
                className="btn rounded-circle"
                style={{backgroundColor:background==='black'?'black':'darkgrey'}}
            >
             <Link
                    to="/addPage"
                    className="btn"
                >
                    <h4 style={{color:background==='black'?'white':'black'}}>+</h4>
                </Link>
            </button>
            </div>
               
        </>
        );
}
export default MyCardsPage;
