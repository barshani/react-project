import { useContext, useEffect, useState } from "react";
import {addToFavorites, deleteCard, deleteFavCard, getCards, getFavCards, getNotFavCards } from "../../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import { Link} from "react-router-dom";
import Title from "../../components/Title";
import { getUserEmail, isAdmin, isBusiness } from "../../auth/TokenManager";
    export interface Card {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    imageURL?: string;
    imageALT?: string;
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNum: string;
    zip?: string;
    createdBy?: string;
}
export interface Favorite{
    _id?:string;
    userEmail:string;
    cardId:string;
    
}
interface Props{
    background:string
    color:string
}

function Cards({background,color}:Props){
   const [cards, setCards] = useState<Array<Card>>([]);
   const [favCards, setFavCards] = useState<Array<Card>> ([]);
   const [searchCards, setSearchCards] = useState<Array<Card>>([]);
   const [search, setSearch] = useState('');
       useEffect(() => {
        getCards()
            .then(json => {
                setCards(json);
                setSearchCards(json);
            })
    }, []);
       useEffect(() => {
        const userEmail=getUserEmail();
        getFavCards(userEmail)
            .then(json => {
                setFavCards(json);
            })
    }, []);
    async function onDelete(_id: string) {
        const res = await deleteCard(_id);
        const userEmail=getUserEmail()
        const cardId=_id
        deleteFavCard({cardId,userEmail});
        const updated = [...cards].filter(
            cards => cards._id !== _id
        )

        setSearchCards(updated);

        toast.success('Card has been deleted');
    }
    async function addFavorites(card:Card) {
        const userEmail=getUserEmail()
        const cardId=card._id
        addToFavorites({
            userEmail,
            cardId
        });
        const newFav=cards.map(card=>card._id===cardId)
        setFavCards([...favCards,card])
        toast.success('Card has added to your favorites');
    }
    async function deleteFavorite(cardId:string){
         const userEmail=getUserEmail()
        const res =await deleteFavCard({userEmail,cardId});
         const updated = [...favCards].filter(
            favorites => favorites._id !== cardId
        )
        setFavCards(updated)
          toast.success('Card has deleted from your favorites');
    }
    function isFavorite(cardId:string) {
        let bol=false;
        favCards.map(card=>{
            if(card._id===cardId)
               bol=true;
        })
        return bol
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
          <ToastContainer />
        <div className="w-75 mx-auto" style={{paddingTop:'15vh'}}>
        <Title mainText="Cards" subText="Here you can find business cards from all categories"></Title>
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
                            {isAdmin()&&<button
                             className="btn btn-default"
                             onClick={()=>onDelete(card._id)}
                                 >
                            <i className="bi bi-trash" style={{color:color}}/>
                            </button>}
                            {isAdmin()&&<button
                             className="btn btn-default"
                                 >
                            <Link to={`/editPage/${card._id}`}>
                            <i className="bi bi-pencil-fill" style={{color:color}}/>
                            </Link>
                            </button>}
                            </div>
                            <div className="d-flex justify-content-end col">
                            {!isFavorite(card._id)&&<button
                             className="btn btn-default"
                             onClick={()=>{
                                addFavorites(card)
                             }
                            }
                                 >
                            <i className="bi bi-heart" style={{color:color}}/>
                           </button>}
                            {isFavorite(card._id)&&<button
                             className="btn btn-default"
                             style={{color:"red"}}
                             onClick={()=>{
                                deleteFavorite(card._id)
                             }}
                                 >
                            <i className="bi bi-heart-fill" />
                            </button>}
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
                 {isBusiness()&&<button
                className="btn rounded-circle"
                style={{backgroundColor:background==='black'?'black':'darkgrey'}}
            >
             <Link
                    to="/addPage"
                    className="btn"
                >
                    <h4 style={{color:background==='black'?'white':'black'}}>+</h4>
                </Link>
            </button>}
            </div>
               
        </>
        );
}
export default Cards;