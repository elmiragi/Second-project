import styled from "@emotion/styled";
import { Link } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export function NotFound() {
    return (
        <Container>
            <p>Страница не найдена</p>
            <h1>404</h1>
            <Link to="/">Вернуться на главную</Link>
        </Container>
    )
};