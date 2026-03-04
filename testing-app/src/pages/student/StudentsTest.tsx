// import { Link } from "react-router-dom";
// import StudentHeader from "../../components/student/StudentHeader";
import styled from "@emotion/styled";
import QuestionBlock from "../../components/tests/QuestionsBlock";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { TestHeader } from "../../components/tests/TestHeader";
import { useEffect, useMemo, useState } from "react";
import type { Question, TestItem } from "../../components/types/testing";
import TimerBox from "../../components/tests/Timer";
import StudentHeader from "../../components/student/StudentHeader";
import { Loader } from "../../components/UI/Loader";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
  padding: 12px;
`;

const OptionList = styled.ul`
  display: grid;
  gap: 15px;
  padding: 10px;
  list-style: none;
`;



export default function StudentsTest() {
  const params = useParams<{ id?: string; testId?: string }>();
  //   const parsed = Number(params.id ?? params.testId);
  //   const testId = Number.isNaN(parsed) ? undefined : parsed;
  const testId = Number(params.id);
  const title = testId ? `Тестирование №${testId}` : `Тестирование`;
  const [testData, setTestData] = useState<TestItem | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  //   const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const passDuration = Number(location.state?.durationSec) || undefined;
  //   const durationSeconds = testData?.durationSec;
  const [seconds, setSeconds] = useState<number | undefined>(passDuration);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  //   const location = useLocation();
  //   console.log(location.state.durationSec);

  useEffect(() => {
    const data = "/data/tests.json";

    fetch(data)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((tests: TestItem[]) => {
        const filteredTests = tests.find((t) => t.id === testId);
        setTestData(filteredTests || null);
        setSeconds(filteredTests?.durationSec ?? 600);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [testId]);

  useEffect(() => {
    const data = "/public/data/questions.json";
    fetch(data)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Question[]) => {
        if (!Array.isArray(data)) throw new Error("Ошибка с JSON");
        setAllQuestions(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
    return () => {};
  }, [testId]);

  const filteredQuestions = useMemo(
    () => allQuestions.filter((q) => q.testId === testId),
    [testId, allQuestions],
  );

  useEffect(() => {
    if (passDuration) return;
    if (testData?.durationSec) setSeconds(testData.durationSec);
  }, [testData, passDuration]);

  function handleAnswer(id: number, value: string | string[] | null) {
    setAnswers((prev) => ({
      ...prev,
      [id]: value ?? (Array.isArray(value) ? [] : ""),
    }));
  }

//   function isQuestionAnswered(q: Question) {
//     const value = answers[q.id];
//     if (q.type === "text")
//       return typeof value === "string" && value.trim() !== "";
//     if (q.type === "single") return typeof value === "string" && value !== "";
//     if (q.type === "multiple") return Array.isArray(value) && value.length > 0;
//     return false;
//   }

//   const allAnswered = filteredQuestions.every((q) => isQuestionAnswered(q));

//   function handleSubmit() {
//     const payload = {
//       testId,
//       answers,
//       time: seconds ?? null,
//     };
//     console.log("Отправка теста", payload);
//     navigate("/student/tests");
//   }

  if (Number.isNaN(testId)) {
    return (
      <section>
        <StudentHeader title={`Тестирование`} />
        <p style={{ color: "red", textAlign: "center" }}>Неверный ID теста</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <StudentHeader title={`Тестирование №${testId}`} />
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <StudentHeader title={`Тестирование №${testId}`} />
        <h3 style={{ color: "red" }}>{error}</h3>
      </section>
    );
  }

  if (filteredQuestions.length === 0)
    return (
      <section>
        <StudentHeader title={`Тестирование №${testId}`} />
        <h3>В текущий момент тесты отсутствуют...</h3>
      </section>
    );

  return (
    <>
      <TestHeader title={title} />
      <Layout>
        <OptionList>
          {filteredQuestions.map((q) => (
            <QuestionBlock
              key={q.id}
              question={q}
              value={answers[q.id] ?? null}
              onChange={handleAnswer}
            />
          ))}
          {/* <SubBtn>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
            >
              Отправить тест
            </button>
          </SubBtn> */}
        </OptionList>
        {/* <div>
          {typeof seconds === "number" && (
            <TimerBox duration={seconds} onFinished={handleSubmit} />
          )}
        </div> */}
      </Layout>
    </>
  );
}
