import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import food1 from '../photos/food1.jpg'
import food2 from '../photos/food2.jpg'
import food3 from '../photos/food3.jpg'
// import Carousel from '../components/Carousel'
// import{Link} from'react-router-dom'
export default function Home() {
    const empty=[];
    const [search, setsearch] = useState("")
    const [foodcat, setfoodcat] = useState([])
    const [fooditem, setfooditem] = useState([])
    const loadData = async () => {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/fooddata`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setfooditem(response[0])
        setfoodcat(response[1])
        // console.log(response[0],response[1])
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption d-md-block' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={food1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={food2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={food3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
            {
        Array.isArray(foodcat) && foodcat.length > 0 ? (
            foodcat.map((data) => (
                <div className='row mb-3' key={data._id}>
                    <div className='fs-3 m-3'>{data.CategoryName}</div>
                    <hr />
                    {
                        Array.isArray(fooditem) && fooditem.length > 0 ? (
                            fooditem
                                .filter((item) => 
                                    item.CategoryName === data.CategoryName && 
                                    item.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((filteritem) => (
                                    <div key={filteritem._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card
                                            fooditem={filteritem}
                                            options={filteritem.options?.[0] || {}}
                                        />
                                    </div>
                                ))
                        ) : (
                            <div>No such data found</div>
                        )
                    }
                </div>
            ))
        ) : (
            <div>Loading categories...</div>
        )
    }

            </div>
            <div><Footer /></div>

        </div>

    )
}
