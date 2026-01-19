import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TestCard } from "../../components/tests/TestCard";

const QuestionsContainer = styled.div`
  padding: 20px;
`;

const QuestionNumber = styled.h4`
  background: white;
  color: black;
  border-radius: 10px;
  padding: 15px;
`;

const TextBlock = styled.div`
  color: #272829ff;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionCard = styled.div`
  border: 1px solid #f0f0f0ff;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  margin-bottom: 12px;
`;




export default function StudentTestPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const data = "/data/tests.json"; // Vite serves public/ as root
    let ignore = false;
    // Promise.all([promise1, promise2, promise3])
    fetch(data)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (ignore) return;
        
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
      })
      .finally(() => setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) return <Upload className="custom-loader">Загрузка...</Upload>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (tests.length === 0) return <div>В текущий момент тесты отсутствуют...</div>;

  return (
    <section>
      <QuestionsContainer>
        <TextBlock>
          <h2>Список тестов</h2>
        </TextBlock>

        {tests.map((t: any) => (
          <OptionCard key={t.id}>
            <QuestionNumber>{t.title ?? `Тест ${t.id}`}</QuestionNumber>
            <TestCard testItem={t} />

        
          </OptionCard>
        ))}
      </QuestionsContainer>
    </section>
  );
}

