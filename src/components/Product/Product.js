import Header from "../Header/Header";
import styles from './Product.module.css'
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import getItemApi from "../../api/getItemApi";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'

function Product() {

    const navigate = useNavigate();
    let {id} = useParams()
    const [item, setItem] = useState('')
    const [thumbnailImage, setThumbnailImage] = useState('')
    const [image, setImage] = useState('')
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
        setImage(data)
    }
    async function getItem(){
        const items = await getItemApi(id)
        setItem(items[0])
    }


    useEffect(()=>{
        handleRating()
        if(item){
            setThumbnailImage(item.thumbnail)
            setImage(item.thumbnail[0])
        }   
    },[item])

    useEffect(()=>{
        getItem()
    }, [])


    return ( 
        <div>
            <Header item = {item.name}/>
            {item? 
            <div className={styles.container}>
                <button onClick={clickBack} className={styles.back_button}>BACK TO PRODUCT</button>
                <div className={styles.product_container}>
                    <div className={styles.product}>
                        <img className={styles.product_image} src={image.url}/>
                    </div>
                    <div className={styles.product_details}>
                        <div>
                            <div className={styles.product_name}>{item.name}</div>
                            <div className={styles.prodcut_rating}>
                                <Rating
                                    onClick={()=>{handleRating(10)}}
                                    initialValue={rating}
                                    size='18px'
                                    readonly={true}
                                />
                            <div className={styles.product_reviews}>({item.rating.length} customer reviews)</div>
                            </div>
                            <div className={styles.product_price}>${item.price}</div>
                            <div className={styles.product_discription}>{item.discription}</div>
                            <div className={styles.prodcut_status}>
                                <div className={styles.prodcut_status_tag}>Available : </div>
                                <div className={styles.prodcut_status_tag_details}>{item.available}</div>
                            </div>
                            <div className={styles.prodcut_status}>
                                <div className={styles.prodcut_status_tag}>SKU : </div>
                                <div className={styles.prodcut_status_tag_details}>{item.sku}</div>
                            </div>
                            <div className={styles.prodcut_status}>
                                <div className={styles.prodcut_status_tag}>Company : </div>
                                <div className={styles.prodcut_status_tag_details}>{item.company}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.thumnail_container}>
                        {
                            item && 
                            item.thumbnail.map((data, i)=>{
                                return(
                                    <div key={i} className={styles.thumbnail}>
                                        <img 
                                        onClick={()=>{clickThumbnail(data)}} 
                                        className={
                                            image._id==data._id?`${styles.product_image} ${styles.product_image_active}`
                                            :
                                            (styles.product_image)
                                            } 
                                        src={data.url}/>
                                    </div> 
                                )
                            })
                        }
                    </div> 
                </div>
            </div>
            :
            <div className={styles.loader}>
                <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                />
            </div>
            }
        </div>
     );
}

export default Product;