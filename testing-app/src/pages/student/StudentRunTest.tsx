// import { Link } from "react-router-dom";
// import StudentHeader from "../../components/student/StudentHeader";
import styled from "@emotion/styled";
import QuestionBlock from "../../components/tests/QuestionsBlock";
import { useParams } from "react-router-dom";
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

type AnswerValueType = {
  value: string | string[] | null;
};

type AnswerValue = {
  type: "multiple" | "single" | "text";
  value: AnswerValueType;
};

type AnswerState = Record<number, AnswerValue>;

export default function StudentRunTest() {
  const params = useParams<{ id?: string; testId?: string }>();
  //   const parsed = Number(params.id ?? params.testId);
  //   const testId = Number.isNaN(parsed) ? undefined : parsed;
  const testId = Number(params.id);
  const title = testId ? `Тестирование №${testId}` : `Тестирование`;
  const [testData, setTestData] = useState<TestItem | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const durationSeconds = testData?.durationSec;
  const [seconds, setSeconds] = useState(durationSeconds);
  const [answer, setAnswer] = useState<AnswerState>({});

  //   const location = useLocation();
  //   console.log(location.state.durationSec);
  //   const [time, setTime] = useState(durationSeconds);

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

  // useEffect(() => {
  //   setAnswer(prev => {
  //     if (Object.keys(prev).length > 0) return prev;
  //     const ansInitial: AnswerState = {};
  //     for (const q of filteredQuestions) {
  //       ansInitial[q.id] = { type: q.type, value: q.type === "multiple" ? [] : null, };
  //     }
  //     return ansInitial;
  //   });
  // }, [filteredQuestions]);

  useEffect(() => {
    setAnswer((prev) => {
      if (Object.keys(prev).length > 0) return prev;
      const answInitial: AnswerState = {};
      for (const q of filteredQuestions) {
        answInitial[q.id] = {
          type: q.type,
          value: q.type === "multiple" ? [] : null,
        };
      }
      return answInitial;
    });
  }, [filteredQuestions]);

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

  // function onChange(questionId: number, value: AnswerValueType) {
  //   console.log("onChange", questionId, value);
  //   setAnswer((prev) => ({
  //     ...prev,
  //     [questionId]: { ...prev[questionId], value },
  //   }));
  // }

  function onChange(questionId: number, value: AnswerValueType) {
    console.log("onChange", questionId, value);
    setAnswer((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        value,
      },
    }));
  }

  return (
    <>
      <TestHeader title={title} />
      <Layout>
        <OptionList>
          {filteredQuestions.map((q) => (
            <QuestionBlock
              key={q.id}
              question={q}
              value={answer}
              onChange={onChange}
            />
          ))}
        </OptionList>
        {seconds && (
          <TimerBox
            duration={seconds}
            onFinished={() => console.log("Timer finished!")}
          />
        )}
      </Layout>
    </>
  );
}
