import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { deleteFavCard, getFavCards } from "../services/apiService";
import { Card, } from "./business/cards";
import Title from "../components/Title";
import { getUserEmail } from "../auth/TokenManager";
interface Props{
    background:string
    color:string
}
function FavCardsPage({background,color}:Props){
   const [cards, setCards] = useState<Array<Card>>([]);
   const [searchCards, setSearchCards] = useState<Array<Card>>([]);
   const [search, setSearch] = useState('');
   const navigate=useNavigate()
    useEffect(() => {
        const userEmail=getUserEmail();
        getFavCards(userEmail)
            .then(json => {
                setCards(json)
                setSearchCards(json)
            })
    }, []);
    async function onDelete(cardId: string) {
        const userEmail=getUserEmail()
        const res =await deleteFavCard({userEmail,cardId});
        
        const updated = [...cards].filter(
            favorites => favorites._id !== cardId
        )
        
        setSearchCards(updated);
         setCards(updated);
        toast.success('Card has been deleted from favorite');
    }
      function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        const normalizedValue = value.trim().toLowerCase();
        const updated = [...cards].filter(
            card =>card.title.toLowerCase().includes(normalizedValue)
        );
        setSearchCards(updated);
    }
    return (
        <>
        <ToastContainer/>
        <div className="w-75 mx-auto" style={{paddingTop:'15vh'}}>
        <Title mainText="Favorites"></Title>
          <input
                        className="form-control mx-3 mb-3 w-25"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                           <div className="d-flex flex-wrap justify-content-start ms-3 pb-5 gap-3">
                    {
                        searchCards.map(card =>
                           <div className="card" key={card._id}style={{width:"22rem",height:"35rem",background:background,color:color}}>
                            {card.imageURL&&card.imageALT&&<img src={card.imageURL} alt={card.imageALT} className="card-img-top h-50"/>}
                            {card.imageURL&&!card.imageALT&&<img src={card.imageURL} className="card-img-top h-50"/>}
                            {!card.imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-50" alt="Logo" />}
                           
                            <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.description}</p>
                            <hr />
                            <p className="card-text">{card.phone}</p>
                            <p className="card-text">{card.country}</p>
                            <p className="card-text">{card.zip}</p>
                            <div className="row">
                            <div className="col">
                            </div>
                            <div className="d-flex justify-content-end col">
                             <button
                             className="btn btn-default"
                             onClick={()=>onDelete(card._id)}
                                 >
                            <i className="bi bi-heart-fill" style={{color:"red"}}/>
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
               
               
        </>
        );
}
export default FavCardsPage;
