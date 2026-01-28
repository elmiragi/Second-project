import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WrapperQuestions = styled.li`
  width: 100%;
  max-width: 792px;
  height: 100%;
  background: #fff;
  border: 1px solid #dde2e4;
  border-radius: 12px;
  margin: 20px;
  list-style: none;
`;

const OptionList = styled.ul`
  display: grid;
  gap: 15px;
  padding: 15px;
  list-style: none;
`;

const OptionLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const QuestionCard = styled.li`
  width: 100%;
  max-width: 792px;
  height: 100%;
  background: #fff;
  border: 1px solid #dde2e4;
  border-radius: 12px;
  margin: 20px;
  list-style: none;
`;

const ContainerQuestions = styled.div`
  padding: 34px 22px;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 600;
  font-size: 18px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: -2.2%;
`;

export default function QuestionBlock() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const testId = Number(params.id);
  useEffect(() => {
    const data = "/public/data/questions.json";
    let ignore = false;
    fetch(data)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (ignore) return;
        const filtredQuestions = data.filter((q) => q.testId === testId);
        setQuestions(filtredQuestions);
      })
      .catch((e) => {
        if (ignore) return;
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
    return () => {
      ignore = true;
    };
  }, [testId]);
  if (Number.isNaN(testId)) return <h3>Невверный ID</h3>;
  if (isLoading) return <div className="custom-loader" />;
  if (error) return <h3>{error}</h3>;
  if (questions.length === 0)
    return <h3>В текущий момент тесты отсутствуют...</h3>;

  return (
    <OptionList>
      {questions.map((q) => (
        <QuestionCard key={q.id}>
          <ContainerQuestions>
            <h4>{q.text}</h4>
          </ContainerQuestions>

          {q.type === "multiple" && (
            <OptionList>
              {(q.options ?? []).map((option, i) => (
                <li key={i}>
                  <OptionLabel htmlFor={`q-${q.id}-${i}`}>
                    <input id={`q-${q.id}-${i}`} type="checkbox" />
                    <span>{option}</span>
                  </OptionLabel>
                </li>
              ))}
            </OptionList>
          )}

          {q.type === "single" && (
            <OptionList>
              {(q.options ?? []).map((option, i) => (
                <li key={i}>
                  <OptionLabel htmlFor={`q-${q.id}-${i}`}>
                    <input
                      id={`q-${q.id}-${i}`}
                      type="radio"
                      name={`q-${q.id}`}
                      aria-label={`Option ${i} q-${q.id}`}
                    />
                    <span>{option}</span>
                  </OptionLabel>
                </li>
              ))}
            </OptionList>
          )}
        </QuestionCard>
      ))}
    </OptionList>
  );
}
