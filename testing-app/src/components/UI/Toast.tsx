import { useEffect } from "react";
import { CloseIcon, DoneIcon } from "../../icons/icons";
import styled from "@emotion/styled";

// const Notice = styled.div`
// gap: 8px;
// bottom: 35px;
// color: "#4094f7";
// background-color: #D7EDFF;
// display: flex;
// justify-content: space-between;
// position: fixed;
// border-radius: 15px;
// padding: 15px 10px;
// min-width: 320px;
// `
const Notice = styled.div`
  gap: 8px;
  bottom: 35px;
  right: 35px;
  color: "#4094f7";
  background-color: #D7EDFF;
  display: flex;
  justify-content: space-between;
  position: fixed;
  border-radius: 15px;
  padding: 15px 10px;
  min-width: 320px;
`;

const Content = styled.div`
display: flex;
gap: 8px;
align-items: center;
`

const Subtitle = styled.span`
font-size: 14px;
font-weight: 600;
line-height: 1.71;
color: "#4094f7";
`

const Close = styled.button`
border: none;
background: none;
position: absolute;
line-height: 1.71;
top: 8.67px;
cursor: pointer;
color: #0e73f6;
right: 8.67px;
&:hover {
  opacity: 0.7;
}
`


type ToastProps = {
    open: boolean;
    message: string;
    onClose: () => void;
    duration?: number;
}

export function Toast(props: ToastProps) {
    const {open, message, onClose, duration=3000} = props;

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => onClose(), duration)
        return () => clearTimeout(timer)
    }, [open, duration, onClose]);

    if (!open) return null;
    return (
        <Notice>
            <Content>
                <DoneIcon/>
                <Subtitle>{message}</Subtitle>
            </Content>
            <Close aria-label='Закрыть' onClick={() => onClose()}><CloseIcon/></Close>
            
        </Notice>
    )
}