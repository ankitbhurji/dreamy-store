import { useState } from "react";
import HomePage from "../components/HomePage/HomePage";
import Product from "../components/Product/Product";
import styles from './Home.module.css'
import copyright from '../images/copyright.svg'


function Home() {   
    const [products, setProducts] = useState([{}])
    const [WindowKey, setWindowKey] = useState({
        isProductKey:false,
        isHomePageKey:true
    })
    function clickBroadCrumps(){
        setWindowKey({...WindowKey, isHomePageKey:true, isProductKey:false})
    }

    return ( 
         <div>
            <div className={styles.header}>
                <div className={styles.BroadCrumps}>
                    <p onClick={clickBroadCrumps}>Home/ <a className={styles.link}>Products</a></p>
                    <p>{WindowKey.isProductKey?("/ "+products.name):('')}</p>
                </div>
            </div>
            <div className={styles.container}>
                {
                    WindowKey.isHomePageKey?(<HomePage WindowKey={setWindowKey} products={setProducts} />)
                    :
                    WindowKey.isProductKey?(<Product WindowKey={setWindowKey}  products={products}/>)
                    :
                    ('')
                }
                
                <footer className={styles.footer}><img src={copyright} /> 2023  <label> Dremy store </label> All rights reserved</footer>
            </div>
        </div>
     );
}

export default Home;