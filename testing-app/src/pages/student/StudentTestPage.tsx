import styled from "@emotion/styled";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestCard } from "../../components/tests/TestCard";
import type { TestItem, Attempt } from "../../components/types/testing";
import { ExitIcon, SearchIcon } from "../../icons/icons";

const Upload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 16px;
  color: #0f172a;
`;

const Cards = styled.div`
  display: grid;
  // grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: start;
`;
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
const BackLink = styled(Link)`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #f4f9ff;
  color: #0e73f6;
  text-decoration: none;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #f4f9ff;
  color: #0e73f6;
  border: none;
  cursor: pointer;
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
  font-size: 18px;
  color: #475569;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.2s ease;
  &:hover {
    background: #f5f7fb;
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
  color: #64748b;
`;

// type Attempt = {
//   id: number;
//   testId: number;
//   userId: number;
//   score: number;
//   status: "submitted" | "graded" | "in_progress";
// };

// type TestItem = {
//   id: number;
//   title: string;
//   description: string;
//   attempts: Attempt[];
//   repeatsAllowed: boolean;
//   passingScore: number;
// };
type StudentHeaderProps = {
  title: string;
  backTo?: string;
};

export default function StudentTestPage(props: StudentHeaderProps) {
  // const params = useParams();
  const { title } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<TestItem[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const pageTitle = "Тестирования";
  const isTestsHeader = pageTitle.trim().toLowerCase() === "тестирования";
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  function onSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") setSearchOpen(false);
  }

  useEffect(() => {
    const testsPath = "/data/tests.json";
    const attemptsPath = "/data/attempts.json";
    let ignore = false;

    Promise.all([fetch(testsPath), fetch(attemptsPath)])
      .then(async ([res1, res2]) => {
        if (ignore) return;
        if (!res1.ok) throw new Error(`HTTP ${res1.status}`);
        if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
        const r: TestItem[] = await res1.json();
        const a: Attempt[] = await res2.json();
        if (ignore) return;
        setTests(r);
        setAttempts(a);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message || String(err));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const lastAttempByTest = useMemo(() => {
    const unique = new Map();
    const mine = attempts.filter((a) => a.userId === 1);
    for (const element of mine) unique.set(element.userId, element);
    return unique;
  }, [attempts]);


  if (isLoading) return <Upload className="custom-loader">Загрузка...</Upload>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (tests.length === 0)
    return <div>В текущий момент тесты отсутствуют...</div>;

  return (
    <section>
      {/* <QuestionsContainer>
        <TextBlock>
          <h2>Список тестов</h2>
        </TextBlock>

        {tests.map((t: any) => (
          <OptionCard key={t.id}>
            <QuestionNumber>{t.title ?? `Тест ${t.id}`}</QuestionNumber>
            <TestCard testItem={t} />

        
          </OptionCard>
        ))}
      </QuestionsContainer> */}
      <Header>
        <Left>
          {props.backTo ? (
            <BackLink to={props.backTo} aria-label="Назад">
              <ExitIcon />
            </BackLink>
          ) : (
            <BackButton
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Назад"
            >
              <ExitIcon />
            </BackButton>
          )}
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
                onKeyDown={onSearchKeyDown}
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
              <Nick>@nick</Nick>
            </Info>
          </User>
        </Right>
      </Header>
      <Cards>
          {tests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              lastAttempt={lastAttempByTest.get(test.id)}
            />
          ))}
        {/* <div>
          <div>Результаты</div>
          <div>2/5</div>
        </div> */}
      </Cards>
    </section>
  );
}
