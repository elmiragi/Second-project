import styled from "@emotion/styled";

const Wrapper = styled.li`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding-left: 30px;
  margin: 0 0 20px 0;
`;

const Button = styled.button`
  background-color: #4094f7;
  color: #ffffffff;
  border: 1px solid #4094f7;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-weight: 400;
  cursor: pointer;
  min-width: 150px;

  &:hover {
    background-color: #0c65d8;
    border-color: #0c65d8;
  }
`;

type SubBtnProps = {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function SubBtn({ onClick, disabled, children }: SubBtnProps) {
  return (
    <Wrapper>
      <Button onClick={onClick} disabled={disabled}>{children ?? "Отправить"}</Button>
    </Wrapper>
  );
}
