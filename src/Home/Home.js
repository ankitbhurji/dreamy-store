import HomePage from "../components/HomePage/HomePage";
import Product from "../components/Product/Product";
import styles from './Home.module.css'

function Home() {
    return ( 
         <div>
            <div className={styles.container}>
                <div className={styles.heading}><p>Home/</p></div>
                {/* <HomePage /> */}
                <Product/>
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