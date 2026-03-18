import styled from "@emotion/styled";

const Result = styled.div`
  background-color: #edffee;
  border: 1px solid #00c63f;
  padding: 20px 62px;
  border-radius: 10px;
  height: 132px;
  max-width: 321px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;
const TitleRes = styled.h4`
  color: #00c63f;
  line-height: 1;
  font-size: 16px;
  font-weight: 400; 
  `;
  const Value = styled.h4`
  color: #00c63f;
  line-height: 1;
  font-size: 66px;
  font-weight: 700; 
  letter-spacing: 0;
  `;

    
type ResultScoreProps = {
    score: number;
    max: number;
}
export function ResultScore(props: ResultScoreProps) {
    const { score, max } = props;
    return (
        <Result>
            <TitleRes>Баллы</TitleRes>
            <Value>{score}/{max}</Value>
        </Result>
    )
}
