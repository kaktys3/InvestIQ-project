import Header from "./Header/Header";
import { styled } from "../stitches.config";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";

export type Page = "dashboard" | "reports";

const AppWrapper = styled("div", {
  backgroundColor: "$bgMain",
  width: "100%",
  color: "$textPrimary",
  margin: "0 auto",
});

export default function Layout() {
  const location = useLocation()

  return (
    <>
    <AppWrapper>
      {location.pathname != '/' && <Header />}

      <Outlet />

      {location.pathname != '/' && <Footer />}
    </AppWrapper>
    </>
  );
}