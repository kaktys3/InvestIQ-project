import RegisterIcon from '../../img/registerIcon.svg';
import gogle from '../../img/SVG (1).png'
import line from '../../img/Visual Linear Divider.png'
import { FaUserPlus } from "react-icons/fa6"
import { GiExitDoor } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdFingerPrint } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { useAppSelector } from '../../Store';
import { market } from '../../Store/finansSelector';
// import { MdOutlineAlternateEmail } from "react-icons/md";

import register from './register.module.css';

export default function RegisterPage() {
    const marketData = useAppSelector(market)
    console.log(marketData)
    return (
        <>
            <div className={register.registerContainer}>
                <div className={register.registerContent}>
                    <div className={register.registerHeader}>
                        <img src={RegisterIcon} alt="" className={register.registerLogo} />
                        <h1 className={register.registerTitle}>
                            INVESTIQ <span className={register.registerSubtitle}>SMART FINANCE</span>
                        </h1>
                    </div>
                    <div className={register.registerInfo}>
                        <h3 className={register.registerInfoTitle}>SMART FINANCE</h3>
                        <p className={register.registerInfoText}>Керуйте фінансами розумно, наочно та безпечно</p>
                    </div>
                    <div className={register.registerFormBlock}>
                        <div className={register.registerTabs}>
                            <button className={register.registerTabBtn}><GiExitDoor />УВІЙТИ</button>
                            <button className={register.registerTabBtn}><FaUserPlus />РЕЄСТРАЦІЯ</button>
                        </div>
                        <button className={register.registerGoogleBtn}>
                            <img src={gogle} alt="" className={register.registerGoogleIcon} />Увійти за допомогою Google
                        </button>
                        <div className={register.registerDivider}>
                            <p className={register.registerDividerText}>АБО ЗА ДОПОМОГОЮ ЕЛЕКТРОННОЇ ПОШТИ</p>
                            <img src={line} alt="" className={register.registerDividerLine} />
                        </div>
                        <form action="" className={register.registerForm}>
                            <div className={register.registerInputGroup}>
                                <label htmlFor="" className={register.registerLabel}>
                                    <p className={register.registerLabelText}>Електронна пошта</p>
                                    <p className={register.registerLabelNote}>TLS Protected</p>
                                </label>
                                <input type="text" placeholder='yourname@email.com' className={register.registerInput}/>
                            </div>
                            <div className={register.registerInputGroup}>
                                <label htmlFor="" className={register.registerLabel}>
                                    <p className={register.registerLabelText}></p>
                                    <p className={register.registerLabelNote}></p>
                                </label>
                                <input type="text" placeholder='••••••••••••' className={register.registerInput}/>
                            </div>
                            <div className={register.registerInputGroup}>
                                <input type="text" className={register.registerInput} />
                                <label htmlFor="" className={register.registerLabel}>
                                    <p className={register.registerLabelText}></p>
                                    <p className={register.registerLabelNote}></p>
                                </label>
                            </div>
                        </form>
                        <div className={register.registerActions}>
                            <button className={register.registerSubmitBtn}>.УВІЙТИ В АКАУНТ <FaArrowRight /></button>
                            <button className={register.registerCreateBtn}><IoMdFingerPrint /> Створити новий профіль</button>
                        </div>
                    </div>
                    <div className={register.registerSecurity}>
                        <p className={register.registerSecurityTitle}>256-БІТНЕ БАНКІВСЬКЕ ШИФРУВАННЯ</p>
                        <p className={register.registerSecurityText}>Захист персональних даних згідно стандартів ISO/IEC 27001</p>
                    </div>
                </div>

                <div className={register.registerSidebar}>
                    <h4 className={register.registerSidebarTitle}><TbPointFilled />INVESTIQ MKT CORE:</h4>
                    <p className={register.registerMarketRow}>
                        S&P 500 <span className={register.registerMarketVal}>{(marketData as any)!.SPY?.dp}%</span>
                    </p>
                    <p className={register.registerMarketRow}>
                        BTC/USD <span className={register.registerMarketVal}>{(marketData as any)!.BTC?.dp}%</span>
                    </p>
                    <p className={register.registerMarketRow}>
                        EUR/UAH <span className={register.registerMarketVal}>{(marketData as any)!.EUR_UAH?.rate}</span>
                    </p>
                </div>
            </div>
        </>
    )
}