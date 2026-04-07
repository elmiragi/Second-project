import { Outlet, Link, useLocation } from "react-router-dom";
import styled from '@emotion/styled';
import { StoreProvider } from "../store/storeProvider";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

const Header = styled.header`
  padding: 5px 10px;
`;

const Main = styled.main`
  flex: 1;
  padding: 10px;
  width: 100%;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

const NavLink = styled(Link)`
  background-color: #60aafa;
  color: white;
  text-decoration: none;
  padding: 5px 20px;
  border-radius: 10px;
  margin: 0 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  background-color: #fbfbfb;
  text-align: center;
  padding: 10px;
`;

export function AppLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
        <Layout>
        {!isHomePage && (
            <Header>
                {/* <Nav>
                    <NavLink to="/login">Войти</NavLink>
                    <NavLink to="/student">Студент</NavLink>
                    <NavLink to="/admin">Админ</NavLink>
                </Nav> */}
            </Header>
        )}
        <Main>
            <StoreProvider>
                <Outlet/>
            </StoreProvider>
        </Main>
        <Footer>© 2025</Footer>
        </Layout>
        </>
    )
}