import type { Attempt, TestItem } from "../types/testing";
import styled from "@emotion/styled";
import {
  CalendarIcon,
  DoneOutlineIcon,
  RetryIcon,
  TimeIcon,
} from "../../icons/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../UI/modal";
import { ConfirmModal } from "./ConfirmModal";

const Card = styled.article`
  border: 1px solid #dde2e4;
  border-radius: 12px;
  padding: 34px 16px 15px 22px;
  position: relative;
  background-color: #fff;
  min-heighrt: 200px;
`;

const TitleCard = styled.h4`
  margin-bottom: 8;
  font-size: 22px;
  font-weight: 600;
  line-height: 1;
  color: #09090b;
`;
const CardText = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 2;
  color: #09090b;
`;

const Tag = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #0e73f6;
  padding: 7px 12px;
  margin: 5px 5px 5px 0px;
  border: 1px solid #0e73f680;
  border-radius: 10px;
`;

const Tags = styled.div`
  display: flex;
  font-size: 4px;
  font-weight: 400;
  line-height: 1;
  color: #0e73f6;
  padding: 0;
  gap: 8px;
  /* border: 1px solid #0e73f680; */
  flex-flow: row nowrap;
  border-radius: 10px;
  justify-content: flex-start;
`;

const Times = styled.span`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
`;

const Calendar = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  color: #ffffff;
  padding: 7px 12px;
  border: 1px solid #ffa528;
  background-color: #ffa528;
  border-radius: 10px;
`;

const Time = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  color: #0e73f6;
  padding: 7px 12px;
  border: 1px solid #f4f9ff;
  background-color: #f4f9ff;
  border-radius: 10px;
`;

const ScoreData = styled.div`
  position: absolute;
  top: 0;
  right: 35px;
  padding: 29px 10px 46px;
  border-radius: 2px 2px 10px 10px;
  background: #e8f5ff;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
`;

const Score = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  color: #0e73f6;
  letter-spacing: 1px;
`;

const ScoreMax = styled.span`
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  color: #0e73f6;
`;

const BlockBtn = styled.span`
  display: flex;
  justify-content: flex-end;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 14px;
  line-height: 1.71;
  font-weight: 600;
  padding: 7px 20px;
  min-width: 122px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DoneBtn = styled(BaseButton)`
  background-color: #00c63f;
  border-color: #00c63f;
`;

export const StartBtn = styled(BaseButton)`
  display: flex;
  justify-content: center;
  background-color: #0e73f6;
  border-color: #0e73f6;
`;

export const RetryBtn = styled(BaseButton)`
  background-color: #fff;
  border-color: #dde2e4;
  color: #09090b;
`;

type TestCardProps = {
  test: TestItem;
  lastAttempt?: Attempt | null;
};
export function TestCard(props: TestCardProps) {
  const navigate = useNavigate();
  const { test, lastAttempt } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  console.log(lastAttempt);
  console.log(test.tags);

  function formateDate(date?: string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString("ru-RU");
  }

  function formatMinutes(seconds?: number | null): string | null {
    if (!seconds) return null;

    const minutes = Math.round(seconds / 60);

    let wordForm = "минут";

    const lastDigit = minutes % 10;
    const lastTwoDigits = minutes % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      wordForm = "минута";
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      (lastTwoDigits < 12 || lastTwoDigits > 14)
    ) {
      wordForm = "минуты";
    }

    return `${minutes} ${wordForm}`;
  }

  const isGraded = lastAttempt?.status === "graded";
  const scoreText =
    lastAttempt?.status === "graded" ? lastAttempt?.score : null;
  // console.log("lastAttempt", lastAttempt?.status);
  // console.log("lastAttempt_score", lastAttempt?.score);

  const buttonStatus = actionBtn().status;
  // console.log("buttonStatus", buttonStatus);

  const shouldShowScore =
    (buttonStatus === "done" || buttonStatus === "retry") && scoreText;

  const deadline = formateDate(test.deadlineISO || lastAttempt?.finishedAt);
  const duration = formatMinutes(test.durationSec || null);

  function actionBtn() {
    if (isGraded && test.allowRetry)
      return { status: "retry", label: "Пройти заново" };
    if (isGraded && !test.allowRetry)
      return { status: "done", label: "Выполнено" };
    return { status: "start", label: "Пройти" };
  }

  const hasTimeLimit = !!test.durationSec && test.durationSec > 0;
  const oneTestAttempt = test.attemptsAllowed === 1;

  function startTest() {
    setIsOpenModal(false);
    navigate(`/student/test/${test.id}`, {
      state: { durationSec: test.durationSec },
    });
  }
  function handleClick() {
    if (actionBtn().status === "done") return;

    if (!hasTimeLimit && !confirmText) {
      startTest();
      return;
    }
    if (oneTestAttempt) {
      setConfirmText("У вас осталось 1 попытка. Будьте осторожны!");
    } else if (hasTimeLimit) {
      setConfirmText(
        `У вас есть ограничения по времени (${duration}). Вы уверены, что хотите начать?`,
      );
    } else {
      setConfirmText("Вы уверены, что хотите начать тест?");
    }

    setIsOpenModal(true);
  }

  console.log(actionBtn());
  return (
    <Card>
      <TitleCard>{test.title}</TitleCard>
      <CardText>{test.shortDescription}</CardText>

      <Tags>
        {test.tags?.map((tag, i) => (
          <Tag key={String(i)}>{tag}</Tag>
        ))}
      </Tags>
      <Times>
        {!!deadline && (
          <Calendar>
            <CalendarIcon />
            {deadline}
          </Calendar>
        )}
        {!!duration && (
          <Time>
            <TimeIcon />
            {duration}
          </Time>
        )}
      </Times>

      <BlockBtn>
        {actionBtn().status === "done" && (
          <DoneBtn disabled>
            {actionBtn().label} <DoneOutlineIcon />
          </DoneBtn>
        )}
        {actionBtn().status === "retry" && (
          <RetryBtn onClick={() => handleClick()}>
            {actionBtn().label} <RetryIcon />
          </RetryBtn>
        )}
        {actionBtn().status === "start" && (
          <StartBtn onClick={() => handleClick()}>{actionBtn().label}</StartBtn>
        )}
      </BlockBtn>

      {shouldShowScore && (
        <ScoreData>
          <Score>{scoreText}</Score>
          <ScoreMax>/{test.passScore}</ScoreMax>
        </ScoreData>
      )}

      <ConfirmModal
        open={isOpenModal}
        title={confirmText}
        confirmLabel="Начать"
        cancelLabel="Отменить"
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => startTest()}
      />
    </Card>
  );
}
