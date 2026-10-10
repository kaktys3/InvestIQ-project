import header from "./header.module.css";
import { outLoginUser } from "../../Store/dataScript";
import { useAppDispatch, useAppSelector } from "../../Store";
import { monthlyAnalitic, profile } from "../../Store/finansSelector";
import type { AnalyticsResponse, Profile } from "../../Store/interface";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const [moduleWindow, setModuleWindow] = useState(false)

  const profileData = useAppSelector(profile);
  const monthlyAnaliticData = useAppSelector(monthlyAnalitic);

  const onAutorisationPage = () => {
    dispatch(outLoginUser()).unwrap()
    navigate('/')
  }

  return (
    <header className={header.header}>
      <div className={header.navigationContainer}>
        <div className={header.logoWrapper}>
          <span className={header.logoDot}>●</span>
          <div className={header.logoTitle}>
            <h2>INVESTIQ</h2>
            <p>SMART FINANCE</p>
          </div>
        </div>

        <nav className={header.navContainer}>
          <button className={`${header.navButton}`} style={{
            backgroundColor: (location.pathname as any) === '/mainPage' ? '#272a32' : 'rgba(11, 14, 21, 0.6)',
            transition: 'background-color 0.3s ease-in-out',
          }} onClick={() => navigate('/mainPage')}>ГОЛОВНА</button>

          <button className={`${header.navButton}`} style={{
            backgroundColor: (location.pathname as any) === '/ReportsPage' ? '#272a32' : 'rgba(11, 14, 21, 0.6)',
            transition: 'background-color 0.3s ease-in-out',
          }} onClick={() => navigate('/ReportsPage')}>ЗВІТИ</button>

          <button className={`${header.navButton}`} onClick={() => setModuleWindow(true)}>Авторизація</button>
          <div className={`${header.modalOverlay} ${moduleWindow ? header.modalOverlayActive : ''}`}>
            <div className={header.modalWindow}>
              <h2 className={header.modalTitle}>
                Для переходу на сторінку необхідно вийти з акаунту
              </h2>

              <div className={header.modalActions}>
                <button
                  type="button"
                  className={header.btnCancel}
                  onClick={() => setModuleWindow(false)}
                >
                  Відмінити
                </button>

                <button
                  type="button"
                  className={header.btnConfirm}
                  onClick={() => onAutorisationPage()}
                >
                  Продовжити
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className={header.userInfo}>
        <div className={header.balanceBlock}>
          <span className={header.statusDot}>●</span>
          <span>Баланс:</span>
          <p className={header.balanceUser}>{(monthlyAnaliticData as AnalyticsResponse)?.net_summary ?? 0} грн</p>
          <span className={header.statusBadge}>АКТУАЛІЗОВАНО</span>
        </div>

        <div className={header.userBox}>
          <div className={header.avatar}></div>
          <div className={header.userNameBox}>
            <span className={header.userName}>{(profileData as Profile)?.full_name}</span>
            <p>{(profileData as Profile)?.is_premium ? 'клієнт' : 'преміум клієнт'}</p>
          </div>
        </div>

        <button className={header.logoutButton} onClick={() => onAutorisationPage()} title="Вийти з акаунту">
          <FaSignOutAlt className={header.logoutButtonImg} />
        </button>
      </div>
    </header>
  );
}

export default Header;