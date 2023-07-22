import { NavLink } from "react-router-dom"
import { isAdmin, isBusiness, verifyToken } from "../auth/TokenManager";
interface Props {
    background: string;
    color: string;
}
function Footer({background,color}:Props){
return(
 <div className="p-2 d-flex text-center justify-content-evenly" style={{background:background}}>
    <div className="col">
      <NavLink to="/" className="navbar-brand" style={{color:color}}>
      <i className="bi bi-info-circle-fill" style={{color:color}}></i><br />
      About
      </NavLink>
    </div>
    {verifyToken()&&<div className="col">
      <NavLink to="/favorites" className="navbar-brand" style={{color:color}}>
      <i className="bi bi-heart-fill" style={{color:color}}></i><br />
      Favorites
      </NavLink>
    </div>}
    {verifyToken()&&(isBusiness()||(!isBusiness()&&isAdmin()))&&<div className="col">
      <NavLink to="/myCards" className="navbar-brand" style={{color:color}}>
       <i className="bi bi-person-video" style={{color:color}}></i><br />
      My Cards
      </NavLink>
    </div>}
  </div>
)
}
export default Footer