import { useMemo, useState } from "react";
import type { Attempt, TestItem } from "../types/testing";
import styled from "@emotion/styled";
import { CalendarIcon, TimeIcon } from "../../icons/icons";

const Card = styled.article`
  border: 1px solid #dde2e4;
  border-radius: 12px;
  padding: 34px 16px 15px 22px;
  position: relative;
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
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  color: #0e73f6;
  padding: 7px 12px;
  margin: 5px;
  border: 1px solid #0e73f680;
  border-radius: 10px;
`;

const Tags = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  color: #0e73f6;
  padding: 7px; 12px;
  // border: 1px solid #0e73f680;
  flex-flow: row nowrap;
  border-radius: 10px;
  justify-content: flex-start;
`;

const Times = styled.span`
  display: flex;
  gap: 5px;
  margin-bottom: center;
`;

const Calendar = styled.span`
display: flex;
align-items: center;
gap: 5px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  color: #ffffffff;
  padding: 7px; 12px;
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
  padding: 7px; 12px;
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

type TestCardProps = {
  test: TestItem;
  lastAttempt?: Attempt | null;
};
export function TestCard(props: TestCardProps) {
  //   const [count, setCount] = useState(0);
  const { test, lastAttempt } = props;

  // const numbers = useMemo(() => [22,33,44], []);
  //   const res = useMemo{() => {
  //     console.log('count');
  //     return numbers.reduce((acc, cur) => acc+cur);
  //   }, [numbers]};
  //   console.log(res)
  console.log(lastAttempt);
  console.log(test.tags);

  function formateDate(date?: string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString("ru-Ru");
  }
  function formateMinutes(seconds?: number | null): string | null {
    if (!seconds) return null;
    const m = Math.round(seconds / 60);
    return `${m} минут`;
  }

  const isGraded = lastAttempt?.status === 'graded'
  // if(isGraded)

  const scoreText =
    lastAttempt?.status === "graded" ? lastAttempt?.score / 10 : null;

  const deadline = formateDate(lastAttempt?.finishedAt);
  const duration = formateMinutes(lastAttempt?.timeSpent);

  return (
    <Card>
      <TitleCard>{test.title}</TitleCard>
      <CardText>{test.description}</CardText>

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

<button></button>

      {scoreText && (
        <ScoreData>
          <Score>{scoreText}</Score>
          <ScoreMax>/10</ScoreMax>
        </ScoreData>
      )}
    </Card>
  );
}
{
  /* <button onClick={() => setCount(count + 1)}>+++</button> */
}
