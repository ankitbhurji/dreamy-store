import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import React, { useEffect, useState } from 'react'
import styles from './Product.module.css';
import { Rating } from 'react-simple-star-rating'


function Product(props) {

    const product = props.products
    const [thumbnailImage, setThumbnailImage] = useState(product.thumbnail[0])

    const [rating, setRating] = useState(0)
  
    const handleRating = () => {
        let sum = 0;
        const ratings = product.rating
        ratings.map((value)=>{
            sum = sum + parseInt(value)
        })
        const rating = sum / ratings.length
        setRating(rating)
        }
    function clickBack(){
        props.WindowKey({isProductKey:false, isHomePageKey:true})
    }

    function clickThumbnail(data){
        setThumbnailImage(data)
    }

    useEffect(()=>{
        handleRating() 
    },[])


    return (
       <div>
        <div className={styles.container}>
            <div className={styles.child}>
                <div>
                    <div >
                        <button className={styles.buttonBack} onClick={clickBack}>BACK TO PRODUCT</button>
                    </div>
                    <div className="d-flex">
                        <div>
                            <div className={styles.mainImage}>
                                <img src={thumbnailImage.url} height="400" width="370" />
                            </div>
                            <div className={styles.thumbnail}>
                            {props.products.thumbnail.map((data,i)=>
                              <div key={i} >
                                  <img className={thumbnailImage._id==data._id?`${styles.clicked}`:""}  src={data.url} onClick={()=>{clickThumbnail(data)}}  height="50" width="70" />
                             </div>
                             )} 
                            </div>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className="row">
                                <div className="row">
                                    <div className="col">
                                        <p className={styles.name}>{product.name}</p>
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
                                    <div className="col-6">
                                        <p className={styles.comments}>{product.rating.length} customer reviews</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className={styles.price}>${product.price}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className={styles.details}>{product.discription}</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                <div className="row">
                                    <div className="col-2">
                                        <div className={styles.tag}>Available:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>{product.available}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-2">
                                        <div className={styles.tag}>SKU:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>{product.sku}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-2">
                                        <div className={styles.tag}>Brand:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>{product.company}</div>
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