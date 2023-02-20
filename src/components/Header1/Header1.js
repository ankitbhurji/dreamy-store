import styles from './Header1.module.css'

function Header1() {
    return ( 
        <div>
            <div className={styles.header_container}>
                <div className={styles.header}>
                    <div className={styles.broadcmps}>
                        <p>Home/</p>&#8209;
                        <p className={styles.product}>Product/</p>&#8209;
                        <p>ProductName</p>
                    </div>
                    {/* <p>Home/ Product/ <a href=''>Name</a></p> */}
                </div>
            </div>
        </div>
     );
}

export default Header1; 