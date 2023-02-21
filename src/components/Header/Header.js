import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom';


function Header(props) {

    const navigate = useNavigate();
    const clickProduct = () => navigate('/');

    return ( 
        <div>
            <div className={styles.header_container}>
                <div className={styles.header}>
                    <div className={styles.broadcmps}>
                        <p>Home/</p>&#8209;
                        <p className={styles.product} onClick={clickProduct}>Product</p>&#8209;
                        <p>{props.item? (`/${props.item}`) :('')}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Header; 