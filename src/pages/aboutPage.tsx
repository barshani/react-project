import { Link } from "react-router-dom";
import { Card } from "./business/cards";
import { verifyToken } from "../auth/TokenManager";
import { hover } from "@testing-library/user-event/dist/hover";
interface Props{
    background:string
    color:string
}
function AboutPage({background,color}:Props){
    const cards:Array<Card>=[{
        _id:"0",
        title:"google",
        subtitle:"",
        description:`Google is an internet search engine. It uses a proprietary algorithm that's designed to retrieve and order search results to provide the most relevant and dependable sources of data possible.

Google's stated mission is to "organize the world's information and make it universally accessible and useful." It is the top search engine in the world, a position that has generated criticism and concern about the power it has to influence the flow of online information.

Google is so dominant that the term "Google" can also be used as a verb, so that when someone searches for something on Google, they may say they "Googled" it.`,
    phone:"07704440444",
    email:"google@gmail.com",
    web:"www.google.com",
    imageURL:"https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/streams/2013/March/130326/1C6639340-google-logo.jpg",
    imageALT:"google",
    state:"",
    country:"israel",
    city:"tel aviv",
    street:"bareket",
    houseNum:"1",
    zip:"234324"
    },
{
        _id:"1",
        title:"microsoft",
        subtitle:"",
        description:`Microsoft is the largest vendor of computer software in the world. It is also a leading provider of cloud computing services, video games, computer and gaming hardware, search and other online services. Microsoft's corporate headquarters is located in Redmond, Wash., and it has offices in more than 60 countries.`,
    phone:"0770234432",
    email:"microsoft@gmail.com",
    web:"www.microsoft.com",
    imageURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEX0TiSBuQABpO//uQL////2Qwr0vbK91ZZ9uACp1vQAofDN36v13qn/twCr2PLu1Zb4NwC605B3twD45N/j7NTb7ff069L13qUAnvLu05DcvaNKAAABIElEQVR4nO3PSRKCQAAEwVEBEfdd//9Rb8LFa4ejWR+oyFJitV3zbtnPUuWAhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhF8obGMdJsLjqU9VulznUXhZxyrNr0dYf4T1R1h/hPX3B8JVruu4vd03qcoQ67Ebhc9trDKPNUyE+0UsQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCws+9AOAEg+8RU74vAAAAAElFTkSuQmCC",
    imageALT:"microsoft",
    state:"",
    country:"israel",
    city:"herzelia",
    street:"nov",
    houseNum:"1",
    zip:"32423"
    },
{
        _id:"3",
        title:"apple",
        subtitle:"",
        description:`Apple Inc (Apple) designs, manufactures, and markets smartphones, tablets, personal computers, and wearable devices. The company also offers software applications and related services, accessories, and third-party digital content. Apple’s product portfolio includes iPhone, iPad, Mac, iPod, Apple Watch, and Apple TV. It offers various consumer and professional software applications such as iOS, macOS, iPadOS, and watchOS, iCloud, AppleCare, and Apple Pay. Apple sells and delivers digital content and applications through App Store, Apple Arcade, Apple News+, Apple Fitness+, Apple Card, Apple TV+, and Apple Music. The company also provides advertising services, payment services and cloud services. The company has business presence across the Americas, Europe, the Middle East, Africa, and Asia-Pacific. Apple is headquartered in Cupertino, California, the US.`,
    phone:"+3239421",
    email:"apple@gmail.com",
    web:"www.apple.com",
    imageURL:"https://cdn.pixabay.com/photo/2018/05/08/21/28/apple-3383994_1280.png",
    imageALT:"apple",
    state:"",
    country:"usa",
    city:"new york",
    street:"3rd avenue",
    houseNum:"124",
    zip:"24342"
    }]
    return(
    <>
     <div className="" style={{paddingTop:'15vh'}}>
    <div className="container">
        <section id="join-us">
            <div className="row">
                <div className="col-12 text-center mt-4">
                    <h1 className="display-4">Welcome to Bcard</h1>
                    <h5>
                        the place you can create your business card
                    </h5>
                   {!verifyToken()&& <p>
                     <p>sign now to watch our colection and choose your favorites</p>
                    <p>sign now as business and you can start creating your own business cards,</p>
                        <a href="\signup" className="btn btn-outline btn-lg" style={{borderColor:color ,color:color}}>Lets Start</a>
                    </p>}
                   {verifyToken()&& 
                   <p>
                        <a href="\allcards" className="btn btn-outline btn-lg" style={{borderColor:color,color:color ,background:background}}>watch our collection</a>
                    </p>
                    }
                </div>
            </div>
        </section>
         <div className="d-flex flex-wrap justify-content-center ms-3 gap-3">
         {
                        cards.map(card =>
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
                                 >
                            <i className="bi bi-trash" style={{color:color}}/>
                            </button>
                            </div>
                            <div className="d-flex justify-content-end col">
                            <button
                             className="btn btn-default"
                                 >
                            <i className="bi bi-heart" style={{color:color}} />
                           </button>
                             <button
                             className="btn btn-default"
                                 >
                            <i className="bi bi-telephone-fill" style={{color:color}}/>
                            </button>
                            </div>
                            </div>
                            </div>
                           </div>
                     )
                    }
         </div>
         </div>
         </div>
            <section id="about-digg">
                <hr />
          <div className="text-center mb-5">
         <h5>by pressing the <i className="bi bi-telephone-fill" /> symbol you will get all the information about your buisness</h5>
         </div>
            <div className="row w-75 mx-auto pb-5 gap-2">
             <div className="col">
             {cards[0].imageURL&&cards[0].imageALT&&<img src={cards[0].imageURL} alt={cards[0].imageALT} className="card-img-top h-100"/>}
        {cards[0].imageURL&&!cards[0].imageALT&&<img src={cards[0].imageURL} className="card-img-top h-100"/>}
        {!cards[0].imageURL&& <img src={'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg'} className="card-img-top h-100" alt="Logo" />}
    </div>
    <div className="col w-50 ">
    <h1>{cards[0].title}</h1>
    <h4>{cards[0].subtitle}</h4>
    <p>{cards[0].description}</p>
    <h6>contact</h6>
    <p>{cards[0].email}</p>
    <p>{cards[0].phone}</p>
    <p>{cards[0].country}, {cards[0].city}, {cards[0].street}, {cards[0].houseNum}</p>
    </div>
    </div>
    </section>
    </>
    );
}

export default AboutPage;