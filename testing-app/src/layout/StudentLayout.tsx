import styled from "@emotion/styled";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { ProfileIcon, StatsIcon, TestsIcon } from "../icons/icons";


const MainBox = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 240px 1fr;
  background: #fff;
`;

const Aside = styled.aside`
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid red
  padding: 30px 16px 25px;
`;

const Main = styled.main`
  padding: 25px 30px;
  background-color: #fbfbfb;
`;
const Brand = styled.div`
  padding: 5px 10px;
  color: #0e73f6;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(NavLink)`
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: #09090b;
  font-weight: 500;
  font-size: 14px;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f6f8fb;
    border-radius: ${(p) => p.theme.radius.md};
    color: #0e73f6;
  }
  &:focus-visible { outline: 2px solid #0e73f6; outline-offset: 2px; }

  &.active {
    background: #e8f5ff;
    color: #0e73f6;
    border-radius: ${(p) => p.theme.radius.md};
    font-weight: 600;
  }
`;

const IconBox = styled.span`
    display: inline-grid;
    place-items: center;
`;

export function StudentLayout() {
  let navigate = useNavigate();
  return (
    <MainBox>
      <Aside>
        <Brand>
          <h3>ПАЗЛ&КОД</h3>
        </Brand>

        <Nav>
          <Item
            to="/student/tests"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <IconBox>
              <TestsIcon />
            </IconBox>
            Тестирования
          </Item>

          <Item
            to="/student/statistics"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <IconBox>
              <StatsIcon />
            </IconBox>
            Статистика
          </Item>

          <Item
            to="/student/profile"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <IconBox>
              <ProfileIcon />
            </IconBox>
            Профиль
          </Item>
        </Nav>
      </Aside>

      <Main>
        <Outlet />
      </Main>
    </MainBox>
  );
}


// export function StudentLayout() {
//     return (
//         <>
//         <h2>student test</h2></>
//     )
// }