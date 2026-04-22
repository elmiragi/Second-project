import styled from "@emotion/styled";
import { Modal } from "../UI/modal";

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: none;
  width: 100%;
`;

const CancelButton = styled.button`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  padding: 8px 60px;
  cursor: pointer;
  transition: 0.4s ease;
  flex: 1 1 calc(50% - 10px);

  &:hover {
    background: #c2c2c2ff;
    color: #ffffffff;
  }
`;
const SaveButton = styled.button<{ variant: "primary" | "default" }>`
  display: flex;
  flex: 1 1 calc(50% - 10px);
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: ${({ variant }) =>
    variant === "primary" ? "#4094f7e5" : "#e5e5e5"};
  color: #fff;
  padding: 8px 60px;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ variant }) =>
      variant === "default" ? "#e5e5e5" : "#0e73f6"};
  }
`;

interface ConfirmModalProps {
  open: boolean;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: (v?: boolean) => void;
  children?: React.ReactNode;
}
export function ConfirmModal(props: ConfirmModalProps) {
  const {
    open,
    title,
    confirmLabel = "Подтвердить",
    cancelLabel = "Отменить",
    onConfirm,
    onClose,
    children,
  } = props;

  return (
    <Modal
      onClose={onClose}
      open={open}
      title={title}
      showBorder={true}
      footer={
        <Actions>
          <CancelButton onClick={() => onClose(false)}>
            {cancelLabel}
          </CancelButton>
          <SaveButton variant="primary" onClick={() => onConfirm()}>
            {confirmLabel}
          </SaveButton>
        </Actions>
      }
    >
      {children}
    </Modal>
  );
}
