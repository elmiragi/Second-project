import styled from "@emotion/styled";
import { useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  inset: 0; /* shorthand for top/right/bottom/left */
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* space on small screens */
  overflow: hidden; /* prevent page scroll from overlay itself */
  z-index: 1000;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  max-height: calc(100vh - 40px); /* keep modal within viewport */
  overflow: auto; /* scroll inside modal when content is tall */
  gap: 10px;
  box-sizing: border-box;
  border: 1px solid #eef0f2;
  min-width: 320px;
`;

const Header = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center; /* center title */
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Footer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.div`
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: row;
`;

type TaskModalProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export function Modal(props: TaskModalProps) {
  const { open, title, children, footer, onClose } = props;

  useEffect(() => {
    if (!open) return;
    const keydwn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", keydwn);
    return () => window.removeEventListener("keydown", keydwn);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <Overlay onClick={() => onClose()}>
      <MainContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{title}</h2>
          <Close onClick={() => onClose()}>
            ×
          </Close>
        </Header>
        <StyledInput>
          <Body>{children}</Body>
          <Close>X</Close>
          <Footer>{footer}</Footer>
        </StyledInput>
        {/* <ContainerButton>
                    <CancelButton onClick={() => }>Отмена</CancelButton>
                    <SaveButton onClick={() => }>Сохранить</SaveButton>
                </ContainerButton> */}
      </MainContainer>
    </Overlay>
  );
}
