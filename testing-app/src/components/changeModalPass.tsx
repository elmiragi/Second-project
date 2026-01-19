import styled from "@emotion/styled";
import { Modal } from "./modal";
import { useState } from "react";

const ContainerButton = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  display: flex;
  flex: 1 1 calc(50% - 10px);
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background: #97b1d8ff;
    color: #fff;
  }
`;

// const SaveButton = styled.button<{ variant: 'primary' | 'default' }>`
//   display: flex;
//   flex: 1 1 calc(50% - 10px);
//   justify-content: center;
//   border: 1px solid #e5e5e5;
//   border-radius: 6px;

//   background: ${({variant}) => (variant === "primary" ? "#4094f7" : "#e5e5e5")};
//   padding: 8px;
//   cursor: pointer;
//   transition: 0.2s ease;
//   &:hover {
//     background: ${({variant}) => (variant === "default" ? "#e5e5e5" : "#4094f7")};
//     color: #fff;
//   }
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

const SaveButton = styled.button<{ variant: "primary" | "default" }>`
  display: flex;
  flex: 1 1 calc(50% - 10px);
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: ${({ variant }) =>
    variant === "primary" ? "#4094f7e5" : "#e5e5e5"};
  color: #fff;
  padding: 8px;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ variant }) =>
      variant === "default" ? "#e5e5e5" : "#2d83f5"};
  }
`;

const TextError = styled.pre`
  color: red;
  font-size: 12px;
  white-space: pre-wrap;
`;

const StyledInput = styled.input`
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: row;
`;

interface ChangeModalPassProps {
  open: boolean;
  onClose: (v: boolean) => void;
  onSuccess: (v: boolean) => void;
}
export function ChangeModalPass(props: ChangeModalPassProps) {
  const { open, onClose, onSuccess } = props;
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [touchedPass1, setTouchedPass1] = useState(false);
  const [touchedPass2, setTouchedPass2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const MOCK_USER_ID = 1;
  const MOCK_USER_PASSWORD = "Password123";

  function ValidatePassword(pw: string): string[] {
    let error: string[] = [];

    if (pw.length < 8) error.push("Пароль должен быть из 8-ми символов");
    if (!/^(?=.*[A-Z])/.test(pw))
      error.push("Вы не используете верхний регистр");
    if (!/^(?=.*[a-z])/.test(pw))
      error.push("Вы не используете нижний регистр");
    if (!/[0-9]/.test(pw)) error.push("Должна быть хотя бы одна цифра");
    if (!/[@!$%~&^?_-]/.test(pw))
      error.push("Должна быть хотя бы один спецсимвол");
    if (pass1 === MOCK_USER_PASSWORD) error.push("Пароль совпадают");

    // const value = pw.trim();
    // const regex = /^(?=.*\p{Lu})(?=.*\d).{8,}$/u;
    // const isValid = regex.test(value);
    // console.log("ValidatePassword", isValid);

    // if (!isValid) {
    //   error.push(
    //     "Вы не используете верхний регистр и пароль должен быть из 8-ми символов"
    //   );
    //   return error;
    // }
    //  if (pass1 !== MOCK_USER_PASSWORD) error.push("Пароль не совпадают");
    return error;
  }

  const pwError = ValidatePassword(pass1);
  console.log(pwError);
  const mathError =
    pass1 && pass2 && pass1 !== pass2 ? "Пароль не совпадают" : "";
  console.log(mathError);

  const formValid = pass1 !== "" && pass2 !== "" && pwError.length === 0;
  console.log(formValid);

  function mockChangePassword(userId: number, newPw: string) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newPw.toLowerCase().includes("pass1"))
          reject(setError("Пароль простой"));
        else resolve(true);
      }, 300);
    });
    return promise;
  }

  async function onSubmit() {
    setError(error);
    if (!formValid) {
      setError(mathError);
      return;
    }

    setTouchedPass1(true);
    setTouchedPass2(true);

    try {
      await mockChangePassword(MOCK_USER_ID, pass1);
      console.log("123");
      onClose(false);
      onSuccess();
      setPass1("");
      setPass2("");
    } catch (error: any) {
      setError(error);
    }
    //         await mockChangePassword(pass1);
    //       onClose(false);
    //       setPass1("");
    //       setPass2("");
    //     } catch (e: any) {
    //       setError(String(e || "Ошибка"));
    //     } finally {
    //       setSubmitting(false);
    //     }
    // }
  }
  return (
    <Modal onClose={() => onClose(false)} open={open} title="Сменить пароль">
      <div>
        <label>
          Новый пароль
          <StyledInput
            type="password"
            placeholder="Введите новый пароль..."
            onChange={(e) => setPass1(e.target.value)}
            onBlur={() => setTouchedPass1(true)}
            value={pass1}
          />
        </label>
      </div>

      <div>
        <label>
          Повторите пароль
          <StyledInput
            type="password"
            placeholder="Повторите пароль..."
            onChange={(e) => setPass2(e.target.value)}
            onBlur={() => setTouchedPass2(true)}
            value={pass2}
          />
          {touchedPass2 && mathError && (
            <h3 style={{ color: "red" }}>{mathError}</h3>
          )}
        </label>
      </div>
      <TextError>{mathError}</TextError>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <ContainerButton>
        <CancelButton onClick={() => onClose(false)}>Отменить</CancelButton>
        <SaveButton
          variant={formValid ? "primary" : "default"}
          disabled={!formValid}
          onClick={() => onSubmit()}
        >
          Подтвердить
        </SaveButton>
      </ContainerButton>
      {touchedPass1 && <pre style={{ color: "red" }}>{pwError.join("\n")}</pre>}
    </Modal>
  );
}
