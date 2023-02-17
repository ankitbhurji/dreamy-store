import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate();
    const clickProduct = () => navigate('/');

    return ( 
        <div>
            <div className={styles.header}>
                <div className={styles.path}>
                <p>Home/</p>
                <p className={styles.product} onClick={clickProduct}>Product/</p>
                <p>{props.item}</p>
                </div>
            </div>
        </div>
     );
}

export default Header;