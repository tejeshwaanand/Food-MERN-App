import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './contextReducer';

export default function Card(props) {
    let dispatch=useDispatchCart();
    let options=props.options;
    let priceOption=Object.keys(options);
    // let value=Object.values(options);
    // let foodItem=props.foodItems;
    const priceRef=useRef();
    let Data=useCart();
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")

    const handleAddtocart= async()=>{
        
        let food=[];
        for(const item of Data){
            if(item.id===props.fooditem._id ){
                food=item;
                break;
            }
        }
        
        if(food){
            if(food.size===size){

                await dispatch({type:"UPDATE",id:props.fooditem._id,price:finalprice,qty:qty})
                return
            }

            else if(food.size!==size){

                await dispatch({type:"ADD", id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qty:qty,size:size,img:props.fooditem.img});
                return 
            }
            return
        }
            

        await dispatch({type:"ADD", id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qty:qty,size:size,img:props.fooditem.img});
         
        
        // console.log(Data);
    }
    let finalprice=qty*parseInt(props.options[size]);
    useEffect(()=>{
        setsize(priceRef.current.value)
    },[])
    
  return (
    <div>
      <div className="card mt-3" style={{"width": "18rem","maxHeight":"360px"}}>
                    <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"150px",objectFit:'fill'}}/>
                        <div className="card-body">
                            <h5 className="card-title">{props.fooditem.name}</h5>
                            <p className="card-text">some text</p>
                            {/* <Link to="/" className="btn btn-primary">Go somewhere</Link> */}
                            <div className="container w-100">
                                <select className="m-2 h-100  bg-primary" onClick={(e)=>setqty(e.target.value)}>
                                    {
                                        Array.from(Array(6),(e,i)=>{
                                            return(
                                                <option key={i+1} value={i+1}>{i+1}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className="m-2 h-100  bg-primary" ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                                    {
                                        priceOption.map((data)=>{
                                            return <option key={data} value={data}>{data}</option>
                                        })
                                    }
                                    
                                </select>
                                <div className='d-inline fs-5'>₹{finalprice}/-</div>
                                <hr />
                                <button className='btn btn-primary justify-center ms-2' onClick={handleAddtocart}>Add to Cart</button>
                            </div>
                        </div>
                </div>
    </div>
  )
}
