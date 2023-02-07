import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import React, { useEffect, useState } from 'react'
import styles from './Product.module.css';
import { Rating } from 'react-simple-star-rating'


function Product() {
    const imgs=[
        {id:0,value:"https://wallpaperaccess.com/full/2637581.jpg"},
        {id:1,value:"https://source.unsplash.com/user/c_v_r/1900x800"},
        {id:2,value:"https://source.unsplash.com/user/c_v_r/100x100"},
        {id:3,value:"https://source.unsplash.com/user/c_v_r/100x100"},
        {id:4,value:"https://source.unsplash.com/user/c_v_r/100x100"},
      ]

    const [rating, setRating] = useState(0)
    const [wordData,setWordData]=useState(imgs[0])
  

    const handleClick=(index)=>{
        // console.log(index)
        const wordSlider=imgs[index];
        setWordData(wordSlider)
        }

    const handleRating = () => {
        setRating(2)
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
                        <button className={styles.buttonBack}>BACK TO PRODUCT</button>
                    </div>
                    <div className="d-flex">
                        <div>
                            <div className={styles.mainImage}>
                                <img src={wordData.value} height="400" width="370" />
                            </div>
                            <div className={styles.thumbnail}>
                            {imgs.map((data,i)=>
                              <div key={i} >
                                 <img className={wordData.id==i?`${styles.clicked}`:""} src={data.value}  onClick={()=>handleClick(i)}  height="50" width="70" />
                             </div>
                             )} 
                            </div>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className="row">
                                <div className="row">
                                    <div className="col">
                                        <p className={styles.name}>Mordern Posters</p>
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
                                        <p className={styles.comments}>(100 customer reviews)</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className={styles.price}>$30.99</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className={styles.details}>king it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                <div className="row">
                                    <div className="col-2">
                                        <div className={styles.tag}>Available:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>in stock</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-2">
                                        <div className={styles.tag}>SKU:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>dksa23k3jl32kjj</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-2">
                                        <div className={styles.tag}>Brand:</div>
                                    </div>
                                    <div className="col-2">
                                        <div className={styles.tagValue}>Liddy</div>
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