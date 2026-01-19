import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { SearchIcon } from "../../icons/icons";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e6e6e6;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0e73f6;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  color: #475569;
  padding: 6px 10px;
  border-radius: 15px;
  transition: background 0.2s ease;
  &:hover {
    background: rgba(221, 228, 243, 1);
  }
`;

const SearchInput = styled.input`
  height: 36px;
  min-width: 220px;
  padding: 0 10px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  &:focus {
    border-color: #0e73f6;
    box-shadow: 0 0 0 3px rgba(14, 115, 246, 0.15);
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6eefc;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Nick = styled.span`
  font-size: 12px;
  color: #6f93c5ff;
`;

type StudentHeaderProps = {
  title: string;
  backTo?: string;
};

export default function StudentHeader(props: StudentHeaderProps) {
  const { title } = props;
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isTestsHeader = title?.trim().toLowerCase() === "тестирования";

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  }

  return (
    <Header>
      <Left>
        <Title>{title}</Title>
      </Left>

      <Right>
        {isTestsHeader &&
          (searchOpen ? (
            <SearchInput
              ref={inputRef}
              autoFocus
              placeholder="Поиск тестов…"
              aria-label="Строка поиска по тестам"
              onBlur={() => setSearchOpen(false)}
              onKeyDown={onKeyDown}
            />
          ) : (
            <SearchButton
              aria-label="Поиск"
              title="Открыть поиск"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </SearchButton>
          ))}

        <User>
          <Avatar />
          <Info>
            <Name>Студент</Name>
            <Nick>@elmira</Nick>
          </Info>
        </User>
      </Right>
    </Header>
  );
}
