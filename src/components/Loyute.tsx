// import { loginUser, registerUser } from '../Store/dataScript'
// import { useAppDispatch, useAppSelector } from '../Store'
// import { market, monthlyAnalitic, profile, selectAllTransaction, selectState, statisticCategory } from '../Store/finansSelector'
// import RegisterPage from '../pages/RegisterPage/RegisterPage'
import { useState } from "react";
import Header from "./Header";
import Dashboard from "../pages/DashboardPage/DashboardPage";
import ReportsHero from "./ReportsHero";
import { loginUser } from "../Store/dataScript";
import { styled } from "../stitches.config";
import { useAppDispatch, useAppSelector } from "../Store";
import { profile } from "../Store/finansSelector";

export type Page = "dashboard" | "reports";

const AppWrapper = styled("div", {
  backgroundColor: "$bgMain",
  minHeight: "100vh",
  width: "100%",
  color: "$textPrimary",
});

const MainContent = styled("main", {
  padding: "24px",
  maxWidth: "1400px",
  margin: "0 auto",
});

const LoginCard = styled("div", {
  maxWidth: "400px",
  margin: "80px auto",
  padding: "32px",
  backgroundColor: "$bgCard",
  borderRadius: "$card",
  border: "1px solid $border",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export default function Layout() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<Page>("dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLoginSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(loginUser({ email, password }));
  // };

  // const isAuthenticated = profile && Object.keys(profile).length > 0;

  // if (!isAuthenticated) {
  //   return (
  //     <AppWrapper>
  //       <LoginCard>
  //         <h2>Вхід в INVESTIQ</h2>
  //         <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  //           <input
  //             type="email"
  //             placeholder="Email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             style={{ padding: "10px", borderRadius: "8px", border: "1px solid #2A3447", background: "#1C2333", color: "#FFF" }}
  //           />
  //           <input
  //             type="password"
  //             placeholder="Пароль"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             style={{ padding: "10px", borderRadius: "8px", border: "1px solid #2A3447", background: "#1C2333", color: "#FFF" }}
  //           />
  //           <button
  //             type="submit"
  //             style={{ padding: "12px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #FF2A7A 0%, #7B2CBF 100%)", color: "#FFF", fontWeight: "bold", cursor: "pointer" }}
  //           >
  //             УВІЙТИ
  //           </button>
  //         </form>
  //       </LoginCard>
  //     </AppWrapper>
  //   );
  // }

  return (
    <AppWrapper>
      <Header setPage={setPage} page={page} />

      <MainContent>
        {page === "dashboard" && <Dashboard />}

        {page === "reports" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <ReportsHero />
          </div>
        )}
      </MainContent>
    </AppWrapper>
  );
}

// export default function Loyute() {
//     const dispatch = useAppDispatch()
//     const profil = useAppSelector(profile)

//     console.log(profil)

//     const testFunction = (): void => {
//         dispatch(registerUser({ gmail: 'anang@gmai.com', password: '123456789', name: 'churka'}))
//     }
//     return (
//         <>
//         <button onClick={testFunction}>clik me</button>
//         </>
//     )
// }