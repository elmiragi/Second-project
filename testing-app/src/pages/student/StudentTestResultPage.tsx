import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";

import StudentHeader from "../../components/student/StudentHeader";
import { ResultScore } from "../../components/tests/ResultScore";
import TimerBox from "../../components/tests/Timer";
import { StudentTestResultPageVM } from "../../store/tests/StudentTestResultPageVM";
import { useStores } from "../../store/useStore";

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
  transition: opacity 0.3s;

  &:hover {
    background-color: #0c65d8;
    border-color: #0c65d8;
    opacity: 0.9;
  }
`;

const AttemptsBox = styled.div`
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
  min-width: 260px;
  min-height: 133px;
  justify-content: center;
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
  color: #babcbd;
`;

export const StudentTestResultPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const rootStore = useStores();

  const vm = useMemo(() => new StudentTestResultPageVM(rootStore), [rootStore]);

  useEffect(() => {
    vm.init(id, location.state as any);
  }, [vm, id, location.state]);

  useEffect(() => {
    vm.redirectMainState(navigate);
  }, [vm, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (!vm.flagState) return null;

  return (
    <>
      <StudentHeader title={`Тестирование №${vm.testId}`} />
      <ResultBox>
        <ResultScore score={vm.score ?? 0} max={vm.max ?? 0} />
        <TimerBox duration={vm.time ?? 0} finished />

        {vm.showAttempts && (
          <AttemptsBox>
            Осталось попыток <Attempt>{vm.attempts}</Attempt>
          </AttemptsBox>
        )}
      </ResultBox>

      {vm.goRetry && (
        <BaseBtn onClick={() => vm.goRetry(navigate)}>
          Пройти тест заново
        </BaseBtn>
      )}
    </>
  );
});
