import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    padding: 10px;
    border: 1px solid #dde2e4;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-color: #4094f7;
    }
  }
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const SubmitBtn = styled.button`
  display: flex;
  align-items: baseline;
  gap: 10px;
  background-color: #4094f7;
  color: #ffffffff;
  border: 1px solid #4094f7;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  min-width: 200px;
  justify-content: center;
  padding: 7px 20px;
  margin-top: 10px;
  border-radius: 5px;
  transition: opacity 0.3s;

  &:hover {
    background-color: #0c65d8;
    border-color: #0c65d8;
    opacity: 0.9;
  }
`;

const TextBlock = styled.h3`
  line-height: 1;
  font-size: 36px;
  font-weight: 400; 
  letter-spacing: 0;
  padding-bottom: 20px;
`;
  

export function LoginPage() {
  let navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Вы вошли");
    navigate("/student");
  };

  return (
    <>
      <LoginContainer>
        <TextBlock>Вход</TextBlock>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputBlock>
            <input type="email" placeholder="Email"></input>
          </InputBlock>
          <InputBlock>
            <input type="password" placeholder="Пароль"></input>
          </InputBlock>
          <SubmitBtn type="submit">Войти</SubmitBtn>
        </Form>
      </LoginContainer>
    </>
  );
}
