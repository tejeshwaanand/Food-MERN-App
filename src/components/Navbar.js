import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./contextReducer";


export default function Navbar() {
const [cartview, setcartview] = useState(false)
let data =useCart();
const navigate=useNavigate();


const handlelogout=()=>{
  localStorage.removeItem("authtoken");
  navigate("/login")

}


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <Link className="navbar-brand fs-1 " to="/">
          Wofood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {
              (localStorage.getItem("authtoken")) ?
                <li className="nav-item active">
                  <Link className="nav-link" to="/myOrder">
                    My order
                    
                  </Link>
                </li>
                : ""
            }
          </ul>
          {
            (!localStorage.getItem("authtoken")) ?
              <div className="d-f">
                <Link className="btn bg-white text-secondary mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-secondary mx-1" to="/signup">
                  Signup
                </Link>
              </div>
              :
              <div className="d-f">
                <div className="btn bg-white text-secondary mx-1" onClick={()=>setcartview(true)}>
                  My Cart
                  <span class="badge badge-dark text-secondary bg-danger ms-1"  >{data.length}</span>
                </div>
                {cartview ? <Modal onClose={()=>setcartview(false)}><Cart></Cart></Modal>: ""}
                <div className="btn bg-white text-danger mx-1" to="/" onClick={handlelogout}>
                  Logout
                </div>
              </div>
          }

        </div>
      </nav>
    </div>
  );
}
