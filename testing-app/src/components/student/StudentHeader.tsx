import styled from "@emotion/styled";

type StudentHeaderProps = {
  title: string;
  backTo?: string;
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e6e6e6;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0e73f6;
`;

export default function StudentHeader(props: StudentHeaderProps) {
  return (
    <Header>
      <Title>{props.title}</Title>
    </Header>
  );
}
