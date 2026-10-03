import type { Page } from "../App";
import {
  StyledHeader,
  LogoWrapper,
  LogoDot,
  LogoTitle,
  NavContainer,
  NavButton,
  UserInfo,
  BalanceBlock,
//   StatusDot,
  StatusBadge,
  Avatar,
  UserName,
  LogoutButton,
} from "../styles/Header.styles";

type HeaderProps = {
  page: Page;
  setPage: (page: Page) => void;
  balance?: string;
  userName?: string;
  onLogout?: () => void;
};

function Header({
  page,
  setPage,
  balance = "54 200.00 грн",
  userName = "Олена Кравченко",
  onLogout,
}: HeaderProps) {
  // Автоматична генерація ініціалів ("Олена Кравченко" -> "ОК")
  const userInitials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <StyledHeader>
      <LogoWrapper onClick={() => setPage("dashboard")}>
        <LogoDot></LogoDot>
        <LogoTitle>
          <strong>INVESTIQ</strong>
          <small>SMART FINANCE</small>
        </LogoTitle>
      </LogoWrapper>

      <NavContainer>
        <NavButton
          active={page === "dashboard"}
          onClick={() => setPage("dashboard")}
        >
          ГОЛОВНА
        </NavButton>

        <NavButton
          active={page === "reports"}
          onClick={() => setPage("reports")}
        >
          ЗВІТИ
        </NavButton>

        <NavButton>АВТОРИЗАЦІЯ</NavButton>
      </NavContainer>

      <UserInfo>
        <BalanceBlock>
          {/* <StatusDot>●</StatusDot> */}
          <span>Баланс:</span>
          <strong>{balance}</strong>
          <StatusBadge>АКТУАЛЬНО</StatusBadge>
        </BalanceBlock>

        <Avatar>{userInitials}</Avatar>

        <UserName>{userName}</UserName>

        <LogoutButton onClick={onLogout} title="Вийти з акаунту">
          ↪
        </LogoutButton>
      </UserInfo>
    </StyledHeader>
  );
}

export default Header;