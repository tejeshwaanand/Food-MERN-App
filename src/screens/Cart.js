import React from 'react'
import { useCart, useDispatchCart } from '../components/contextReducer'
import del from "../photos/trash.svg"


export default function Cart() {
    
    let data=useCart();
    let dispatch=useDispatchCart();
    if (data.length === 0) {
        return (
          <div className="col">
            <p><span className="h2">Shopping Cart </span><span className="h4">({"0"} item in your cart)</span></p>
          </div>
        )
      }
    const handleCheckOut =async()=>{
      let userEmail=localStorage.getItem("userEmail");
      let responce =await fetch(`${process.env.REACT_APP_API_URL}/api/orderData`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          order_data:data,
          email:userEmail,
          // order_date:new Date().toISOString()
        })
      });
      console.log("order responce",responce)
      if(responce.status===200){
        dispatch({type:'DROP'})
      }

    }
      let totalprice = data.reduce((total,food)=> total+food.price,0);
    return (
        <div>
            <div>

      {console.log(data)}
      

<div className="container h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-12">
      <p>
        <span className="h2">Shopping Cart </span>
        <span className="h4">({data.length} item in your cart)</span>
      </p>

      <div className="card-body p-2">
        <div className="row align-items-center">
          <div className="col-2 col-md-2">
            <p className="small text-muted mb-4 pb-2">SNO.</p>
          </div>
          <div className="col-2 col-md-2 d-flex justify-content-center">
            <div>
              <p className="small text-muted mb-4 pb-2">Name</p>
            </div>
          </div>
          <div className="col-2 col-md-2 d-flex justify-content-center">
            <div>
              <p className="small text-muted mb-4 pb-2">Size</p>
            </div>
          </div>
          <div className="col-2 col-md-1 d-flex justify-content-center">
            <div>
              <p className="small text-muted mb-4 pb-2">Quantity</p>
            </div>
          </div>
          <div className="col-2 col-md-2 d-flex justify-content-center">
            <div>
              <p className="small text-muted mb-4 pb-2">Price</p>
            </div>
          </div>
          <div className="col-2 col-md-1 d-flex justify-content-center">
            <div>
              <p className="small text-muted mb-4 pb-2">Total</p>
            </div>
          </div>
        </div>
      </div>

      {data.map((food, index) => (
        
        <div className="card mb-4" key={index}>
          <div className="card-body p-2">
            <div className="row align-items-center">
              <div className="col-4 col-md-2">
                <img
                style={{ height: '50px' ,objectFit: 'cover', 
                  objectPosition: 'center'}}
                  src={food.img}
                  className="img-fluid"
                  alt="food_img"
                  
                />
              </div>
              <div className="col-4 col-md-2 d-flex justify-content-center">
                <div>
                  <p className="lead fw-normal mb-0">{food.name}</p>
                </div>
              </div>
              <div className="col-4 col-md-2 d-flex justify-content-center">
                <div>
                  <p className="lead fw-normal mb-0">
                    <i
                      className="fas fa-circle me-2"
                      style={{ color: "#fdd8d2" }}
                    ></i>
                    {food.size}
                  </p>
                </div>
              </div>
              <div className="col-3 col-md-1 d-flex justify-content-center">
                <div>
                  <p className="lead fw-normal mb-0">{food.qty}</p>
                </div>
              </div>
              <div className="col-3 col-md-2 d-flex justify-content-center">
                <div>
                  <p className="lead fw-normal mb-0">
                    ₹{food.price / food.qty}/-
                  </p>
                </div>
              </div>
              <div className="col-3 col-md-1 d-flex justify-content-center">
                <div>
                  <p className="lead fw-normal mb-0">₹{food.price}</p>
                </div>
              </div>
              <div className="col-3 col-md-2 d-flex justify-content-center">
                <div>
                  <button className=' btn p-0'>
                  <img src={del} onClick={()=>{dispatch({type:"REMOVE",index:index})} } alt="del"/>

                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card mb-5">
        <div className="card-body p-2">
          <div className="float-end">
            <p className="mb-0 me-5 d-flex align-items-center">
              <span className="small text-muted me-2">Order total:</span>{" "}
              <span className="lead fw-normal">₹{totalprice}/-</span>
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary btn-lg" onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  </div>
</div>




    </div>

        </div>
    )
}
