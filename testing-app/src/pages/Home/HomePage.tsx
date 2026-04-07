import { Link } from "react-router-dom";
import styled from '@emotion/styled';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  background-color: #fbfbfb;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #3f3e3e;
  margin-bottom: 50px;
  font-weight: 600px;
  text-align: center;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const NavLink = styled(Link)`
  background-color: #659edb;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  text-align: center;
  min-width: 200px;

  &:hover {
    background-color: #0056b3;
  }
`;

export function HomePage() {
  return (
    <HomeContainer>
      <Title>Добро пожаловать в систему тестирования</Title>
      <NavContainer>
        <NavLink to="/login">Войти</NavLink>
        <NavLink to="/student">Студент</NavLink>
        <NavLink to="/admin">Админ</NavLink>
      </NavContainer>
    </HomeContainer>
  );
}