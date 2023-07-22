import {Card, Favorite} from "../pages/business/cards"
import { getToken, isAdmin } from "../auth/TokenManager";
import { User } from "../auth/SignUp";
import { loginUser } from "../auth/login";
const serverUrl = 'http://localhost:3000/';

const cardsUrl = `${serverUrl}cards/`;
const usersUrl = `${serverUrl}users/`;
const favUrl = `${serverUrl}favorites/`;
export async function addCard(card: Card): Promise<Card> {
    const res = await fetch(`${cardsUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });
    return res.json();
}
export async function editCard(card: Card): Promise<Card> {
    const res = await fetch(`${cardsUrl}${card._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(card)
    });
    return res.json();
}
export async function deleteCard(_id: string): Promise<Card> {
    const res = await fetch(`${cardsUrl}${_id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': getToken()
        },
    })
    return res.json()
}
export async function deleteFavCard(favorite:Favorite): Promise<Favorite> {
    const res = await fetch(`${favUrl}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favorite)
    })
    return res.json()
}
export async function addToFavorites(favorite:Favorite): Promise<Favorite> {
    const res = await fetch(`${favUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favorite)
    })
    return res.json()
}
export async function getCards(): Promise<Array<Card>> {
    const res = await fetch(`${cardsUrl}`);
    return res.json();
}

export async function getCard(_id:string): Promise<Card> {
    const res = await fetch(`${cardsUrl}${_id}`);
    return res.json();
}
export async function getFavorites(userEmail:string): Promise<Array<Favorite>> {
    const res= await fetch(`${favUrl}${userEmail}`);
    return res.json();
}
export async function getFavCards(userEmail:string):Promise<Array<Card>> {
    const res=await getFavorites(userEmail)
    const res2=await getCards()
    const filter=res2.filter(card=>{
         let bol=false
        res.map((favorite=>{
        if(card._id===favorite.cardId)
           bol=true;
    }))
    return bol;
    
})
    return filter;
}
export async function getNotFavCards(userEmail:string):Promise<Array<Card>> {
    const res=await getFavorites(userEmail)
    const res2=await getCards()
    const filter=res2.filter(card=>{
         let bol=true
        res.map((favorite=>{
        if(card._id===favorite.cardId)
           bol=false;
    }))
    return bol;
    
})
    return filter;
}
export async function getMyCards(userEmail:string):Promise<Array<Card>> {
    
    const res=await getCards()
    const filter=res.filter(card=>card.createdBy===userEmail)
    return filter;
}

export async function signup(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}
export async function login(user:loginUser): Promise<loginUser> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}
