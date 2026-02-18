import styled from "@emotion/styled";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestCard } from "../../components/tests/TestCard";
import type { TestItem, Attempt } from "../../components/types/testing";
import { TestHeader } from "../../components/tests/TestHeader";


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


export default function StudentTestPage() {
  // const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<TestItem[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState<string>("");
  
  
  
  // const [searchOpen, setSearchOpen] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (searchOpen) inputRef.current?.focus();
  // }, [searchOpen]);

  

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
      <TestHeader title="Список тестов"/>
      
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
