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
  StatusDot,
  StatusBadge,
  Avatar,
  UserName,
  LogoutButton,
} from "../styles/Header.styles";
import { outLoginUser } from "../Store/dataScript";
import { useAppDispatch, useAppSelector } from "../Store";
import { monthlyAnalitic, profile } from "../Store/finansSelector";
import type { AnalyticsResponse, Profile } from "../Store/interface";

type HeaderProps = {
  page: Page;
  setPage: (page: Page) => void;
};

export function Header({ page, setPage }: HeaderProps) {
  const dispatch = useAppDispatch();
  
  const profileData = useAppSelector(profile);
  const monthlyAnaliticData = useAppSelector(monthlyAnalitic);

  const handleLogout = () => {
    dispatch(outLoginUser());
  };

  const userName = (profileData as Profile)?.full_name || "Користувач";
  const balance = (monthlyAnaliticData as AnalyticsResponse)?.net_summary;

  const userInitials = userName
    .split(" ")
    .map((word: string) => word[0])
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
      </NavContainer>

      <UserInfo>
        <BalanceBlock>
          <StatusDot></StatusDot>
          <span>Баланс:</span>
          <strong>{balance} грн</strong>
          <StatusBadge>АКТУАЛЬНО</StatusBadge>
        </BalanceBlock>

        <Avatar>{userInitials}</Avatar>

        <UserName>{userName}</UserName>

        <LogoutButton onClick={handleLogout} title="Вийти з акаунту">
          ↪
        </LogoutButton>
      </UserInfo>
    </StyledHeader>
  );
}

export default Header;