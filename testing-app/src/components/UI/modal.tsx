import styled from "@emotion/styled";
import { useEffect, useId } from "react";

const Overlay = styled.div`
  position: fixed;
  inset: 0; 
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
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-width: 520px;
  width: 100%;
  max-height: calc(100vh - 40px);
  overflow: auto;
  gap: 10px;
  box-sizing: border-box;
  // border: 1px solid #eef0f2;
  min-width: 320px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  line-height: 1.33;
`;

const Close = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Footer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.div<{ showBorder?: boolean }>`
  outline: none;
  border: ${({ showBorder }) => (showBorder ? "none" : "1px solid #e5e5e5")};
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

type TaskModalProps = {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: (open?: boolean) => void;
  showBorder?: boolean;
};

export function Modal(props: TaskModalProps) {
  const { open, title, children, footer, onClose, showBorder } = props;
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const keydwn = (e: KeyboardEvent) => e.key === "Escape" && onClose(false);
    window.addEventListener("keydown", keydwn);
    return () => window.removeEventListener("keydown", keydwn);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <Overlay onClick={() => onClose(false)} aria-hidden={!open}>
      <MainContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <ModalTitle id={`modal-title-${id}`}>{title}</ModalTitle>
          <Close aria-label="Закрыть" onClick={() => onClose(false)}>
            ×
          </Close>
        </Header>
        <StyledInput showBorder={showBorder}>
          {children && <Body>{children}</Body>}
          {footer && <Footer>{footer}</Footer>}
        </StyledInput>
      </MainContainer>
    </Overlay>
  );
}
