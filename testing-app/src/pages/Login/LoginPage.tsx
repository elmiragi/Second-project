import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


export function LoginPage() {
    let navigate = useNavigate();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Вы вошли");
        navigate('/student');
    };

    return (
        <>
        <LoginContainer>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <input type="email" placeholder='Email'></input>
            </div>
            <div>
                <input type="password" placeholder='Пароль'></input>
            </div>
            <button type="submit">Войти</button>
        </Form>
        </LoginContainer>
        </>
    )
}