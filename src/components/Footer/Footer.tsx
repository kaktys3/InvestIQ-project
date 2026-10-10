import { TbPointFilled } from 'react-icons/tb';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.brand}>
                <h2 className={styles.title}>INVESTIQ</h2>
                <p className={styles.copyright}>
                    © 2025 INVESTIQ Financial Intelligence Systems. Усі права захищено.
                </p>
            </div>

            <div className={styles.security}>
                <p className={styles.securityItem}><TbPointFilled className={styles.pointImgFooter} />ШИФРУВАННЯ 256-BIT SSL</p>
                <p className={styles.securityCountry}>Сервери в ЄС</p>
            </div>
        </footer>
    );
}