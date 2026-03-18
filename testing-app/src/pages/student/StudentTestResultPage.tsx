import { useLocation, useNavigate, useParams } from "react-router-dom";
import StudentHeader from "../../components/student/StudentHeader";
import { ResultScore } from "../../components/tests/ResultScore";
// import Timer from "../../components/tests/Timer";
import styled from "@emotion/styled";
import { Activity } from "react";
import TimerBox from "../../components/tests/Timer";

const BaseBtn = styled.button`
  display: flex;
  align-items: baseline;
  gap: 10px;
  background-color: #4094f7;
  color: #ffffffff;
  border: 1px solid #4094f7;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  min-width: 122px;
  max-width: 200px;
  justify-content: center;
  padding: 7px 20px;
  margin-top: 10px;
  border-radius: 5px;
  transition: opacity 0.3s;

  &:hover {
    background-color: #0c65d8;
    border-color: #0c65d8;
    opacity: 0.9;
  }
`;
const AttemptsBox = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  box-shadow: inset 0 0 20px 0 #dde2e4;
  background: #fff;
  color: #babcbd;
  border: 1px solid #dde2e4;
  border-radius: 10px;
  font-weight: 400;
  cursor: pointer;
  min-width: 260px;
  min-height: 133px;
  justify-content: center;
  transition: opacity 0.3s;

`;
const ResultBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

  const Attempt = styled.h4`
  line-height: 1;
  font-size: 66px;
  font-weight: 700; 
  letter-spacing: 0;
  `;

export function StudentTestResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  // console.log("location", location.state);

  if (!location.state) {
    navigate(`/student/tests`, { replace: true });
    return null;
  }

  const { score, max, attempts, time, showResult } = location.state;
  console.log("locationeee", score, max, attempts, time);

  function takeTheTestAgain() {
    console.log("Navigating back to test with id:", id);
    navigate(`/student/test/${id}`, {
      replace: true,
    });
    // return null;
  }
  return (
    <>
      <StudentHeader title={`Тестирование №${id}`} />
      <ResultBox>
        <ResultScore score={score} max={max} />
        {/* <TimerBox duration={time} onFinished={() => console.log("Test end")} finished={showResult} /> */}
        <TimerBox duration={time} finished />

        <Activity mode={attempts === 0 ? "hidden" : "visible"}>
          <AttemptsBox>Осталось попыток <Attempt>{attempts}</Attempt></AttemptsBox>
        </Activity>
      </ResultBox>
      <BaseBtn onClick={takeTheTestAgain}>Пройти тест заново</BaseBtn>
    </>
  );
}
