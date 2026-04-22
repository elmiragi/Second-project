import styled from "@emotion/styled";
import QuestionBlock from "../../components/tests/QuestionsBlock";
import { useNavigate, useParams } from "react-router-dom";
import { TestHeader } from "../../components/tests/TestHeader";
import { Activity, useEffect, useMemo, useRef } from "react";
import TimerBox from "../../components/tests/Timer";
import StudentHeader from "../../components/student/StudentHeader";
import { Loader } from "../../components/UI/Loader";
import SubBtn from "../../components/tests/SubBtn";
// import { ConfirmModal } from "../../components/tests/ConfirmModal";
import { ResultScore } from "../../components/tests/ResultScore";
import { TestRunPageVM } from "../../store/tests/TestRunPageVM";
import { useStores } from "../../store/useStore";
import { observer } from "mobx-react-lite";

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

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const BackBtn = styled.button`
  background-color: #fff;
  color: #09090b;
  border: 1px solid #dde2e4;
  padding: 10px 20px;
  margin-top: 0;
  border-radius: 5px;
  font-weight: 400;
  cursor: pointer;
  min-width: 150px;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #bbb;
  }
`;

export const StudentRunTest = observer(() => {
  const root = useStores();
  const studentTest = useMemo(() => new TestRunPageVM(root), [root]);
  const { init, requestFinish, submit } = studentTest;
  const testRun = useStores().testRunStore;
  const {
    results,
    totalScore,
    maxScore,
    loading: isLoading,
    error,
    filteredQuestions,
    answer,
    showResult,
    timeSec,
    setAnswer,
    durationSec,
    setTimeLeftSec,
    spentSec,
  } = testRun;

  // Для возврата к началу страницы при открытии результатов
  const resultRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResult]);

  console.log("answer", answer);
  const params = useParams();
  const testId = Number(params.id);
  const title = testId ? `Тестирование №${testId}` : `Тестирование`;
  const navigate = useNavigate();

  useEffect(() => {
    init(testId);
  }, [studentTest, testId]);

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
          {filteredQuestions.map((q) => {
            return (
              <QuestionBlock
                key={q.id}
                question={q}
                value={answer[q.id]?.value ?? null}
                onChange={setAnswer}
                result={results[q.id]}
                showResult={showResult}
              />
            );
          })}
        </OptionList>
        <ContainerBox>
          <Activity mode={showResult ? "visible" : "hidden"}>
            <div ref={resultRef}>
              <ResultScore max={maxScore} score={totalScore} />
            </div>
          </Activity>
          <Activity mode={timeSec ? "visible" : "hidden"}>
            <TimerBox
              // Когда showResult изменится с false на true, React пересоздаст компонент и примет новое значение duration.
              key={showResult ? "spent" : "running"}
              duration={showResult ? durationSec - timeSec : durationSec}
              onTick={setTimeLeftSec}
              onFinished={() => {
                if (!showResult) submit(navigate);
              }}
              finished={showResult}
            />
          </Activity>
          {/* <Activity mode={timeSec ? "visible" : "hidden"}>
            <TimerBox
              // duration={seconds}
              duration={durationSec - timeSec}
              onTick={setTimeLeftSec}
              onFinished={() => {
                if (!showResult) submit(navigate);
              }}
              finished={showResult}
            />
          </Activity> */}
        </ContainerBox>

        <SubBtn onClick={() => requestFinish(navigate)} disabled={showResult} />
        {showResult && (
          <ButtonContainer>
            <BackBtn
              onClick={() => {
                navigate("/student/tests");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Вернуться к тестам
            </BackBtn>
          </ButtonContainer>
        )}
        {/* <ConfirmModal
          open={finishModal}
          title={finishModalText}
          confirmLabel="Завершить"
          onClose={() => closeFinishModal()}
          onConfirm={() => confirmFinish(navigate)}
        /> */}
      </Layout>
    </>
  );
});
