import { Outlet, Link } from "react-router-dom";
import styled from '@emotion/styled';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

const Header = styled.header`
  background-color: #ffffffff;
  padding: 0px 10px;
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
  background-color: #ffffffff;
  text-align: center;
  padding: 0px 10px;
`;

const Footer = styled.footer`
  background-color: #ffffffff;
  text-align: center;
  padding: 10px;
`;

export function AppLayout() {
    return (
        <>
        <Layout>
        <Header>
            <Nav>
                <NavLink to="/login">Войти</NavLink>
                <NavLink to="/student">Студент</NavLink>
                <NavLink to="/admin">Админ</NavLink>
            </Nav>
        </Header>
        <Main>
                <Outlet/>
        </Main>
        <Footer>© 2025</Footer>
        </Layout>
        </>
    )
}