import styled from "@emotion/styled";
import { useState } from "react";
import { Modal } from "../UI/modal";

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: none;
  width: 100%;
`;

const Title = styled.h2`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
min-width: 380px;
`;
// const CancelButton = styled.button`
//   display: flex;
//   flex: 1 1 calc(50% - 10px);
//   justify-content: center;
//   border: 1px solid #e5e5e5;
//   border-radius: 6px;
//   background: #fff;
//   padding: 8px;
//   cursor: pointer;
//   transition: 0.2s ease;
//   &:hover {
//     background: #a7c3eeff;
//     color: #fff;
//   }
// `;

// const SendButton = styled.button`
//   display: flex;
//   flex: 1 1 calc(50% - 10px);
//   justify-content: center;
//   border: 1px solid #1b72e4ff;
//   border-radius: 6px;
//   background-color: #0e73f6;
//   color: #fff;
//   padding: 8px;
//   cursor: pointer;
//   transition: 0.2s ease;
//   &:hover {
//     background: #1b72e4ff;
//     color: #fff;
//   }
// `;

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
          <CancelButton onClick={() => onClose(false)}>{cancelLabel}</CancelButton>
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
