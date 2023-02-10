import { useState } from "react";
import HomePage from "../components/HomePage/HomePage";
import Product from "../components/Product/Product";
import styles from './Home.module.css'

function Home() {   
    const [products, setProducts] = useState([{}])
    const [WindowKey, setWindowKey] = useState({
        isProductKey:false,
        isHomePageKey:true
    })
    // console.log(products)
    function clickBroadCrumps(){
        setWindowKey({...WindowKey, isHomePageKey:true, isProductKey:false})
    }

    return ( 
         <div>
            <div className={styles.container}>

                {/* <div className={styles.heading}><p onClick={clickBroadCrumps}>Home/products/{WindowKey.isProductKey?(products.name):('')}</p></div> */}
                <div className={styles.heading}>
                    <div className={styles.BroadCrumps}>
                    <p onClick={clickBroadCrumps}>Home/products</p>
                    <p>{WindowKey.isProductKey?("/"+products.name):('')}</p>
                    </div>
                </div>

                {/* <HomePage WindowKey={setWindowKey} /> */}
                {/* <Product products={setProducts}/> */}
                {
                    WindowKey.isHomePageKey?(<HomePage WindowKey={setWindowKey} products={setProducts} />)
                    :
                    WindowKey.isProductKey?(<Product WindowKey={setWindowKey}  products={products}/>)
                    :
                    ('')
                }
                
            <footer className={styles.footer}>C 2023<label> Dremy store</label>All rights reserved</footer>
            </div>
        </div>
        // <div>
        //     <HomePage />
        //     <Product/>
        // </div>
     );
}

export default Home;