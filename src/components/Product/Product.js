import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import React, { useEffect, useState } from 'react'
import styles from './Product.module.css';
import { Rating } from 'react-simple-star-rating'
import getItemApi from "../../api/getItemApi";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";



function Product() {

    const navigate = useNavigate();
    let {id} = useParams()
    const [item, setItem] = useState('')
    const [thumbnailImage, setThumbnailImage] = useState(item.thumbnail)
    const [rating, setRating] = useState(0)
  
    const handleRating = () => {
        if(item){
            let sum = 0;
        const ratings = item.rating
        ratings.map((value)=>{
            sum = sum + parseInt(value)
        })
        const rating = sum / ratings.length
        setRating(rating)
        }
        }
  
    const clickBack = () => navigate(-1);
    function clickThumbnail(data){
        setThumbnailImage(data)
    }
    async function getItem(){
        const items = await getItemApi(id)
        setItem(items[0])
    }

    useEffect(()=>{
        handleRating()
        if(item){
            setThumbnailImage(item.thumbnail[0].url)
        }   
    },[item])

    useEffect(()=>{
        getItem()
    }, [])

   

    return (
       <div>
       <Header item = {item.name}/>
        <div className={styles.container}>
            <div className={styles.child}>
                <div>
                    <div >
                        <button className={styles.buttonBack} onClick={clickBack}>BACK TO PRODUCT</button>
                    </div>
                    <div className="d-flex">
                        <div>
                            <div className={styles.mainImage}>
                                 <img src={thumbnailImage} height="400" width="370" />
                            </div>
                            <div className={styles.thumbnail}>
                            {   item &&
                                item.thumbnail.map((data,i)=>
                                <div key={i} >
                                {/* <img className={thumbnailImage._id==data._id?`${styles.clicked}`:""}  src={data.url} onClick={()=>{clickThumbnail(data)}}  height="50" width="70" />  */}
                                    <img className={item._id==data._id?`${styles.clicked}`:""}  src={data.url} onClick={()=>{clickThumbnail(data.url)}}  height="50" width="70" /> 
                                </div>
                                )
                            }
                            </div>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className="row">
                                <div className="row">
                                    <div className="col">
                                        <p className={styles.name}>{item.name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <Rating
                                            onClick={()=>{handleRating(10)}}
                                            initialValue={rating}
                                            size='18px'
                                            readonly={true}
                                        />
                                    </div>
                                    {/* <div className="col-6">
                                        <p className={styles.comments}>{item.rating.length} customer reviews</p>
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className={styles.price}>${item.price}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className={styles.details}>{item.discription}</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                <div className="row">
                                    <div className="col-2">
                                        <div className={styles.tag}>Available:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>{item.available}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-2">
                                        <div className={styles.tag}>SKU:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>{item.sku}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-2">
                                        <div className={styles.tag}>Brand:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>{item.company}</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
     );
}

export default Product;