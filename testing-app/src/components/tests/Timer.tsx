import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Timer = styled.aside<{ danger: boolean }>`
  background-color: ${(p) => (p.danger ?  "#ffe9e9" : "#fcfeff")};
  border: 1px solid ${(p) => (p.danger ?  "#ffd7d7" : "#8ecaff")};
  color: ${(p) => (p.danger ? "#ff0000" : "#1e7eff" )};
  border-radius: 10px;
  padding: 20px 62px;
  height: 132px;
  max-width: 321px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
.timer-title {
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
  }
.time {
    font-size: 60px;
    font-weight: 700;
    line-height: 1;
`;

type TimerProps = { 
    duration: number; 
    onFinished?: () => void 
};

export default function TimerBox(props: TimerProps) {
    const {duration, onFinished} = props;
  const [time, setTime] = useState<number>(duration || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => { 
        if (t <= 1) {
            clearInterval(interval);
            return 0;
        }
        return t - 1;});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!onFinished) return;
    onFinished()
    // if (time === 0 && typeof onFinished === "function") {
    //   onFinished();
    // }
  }, [time, onFinished]);

  function formatedTime(t: number): string {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const danger = time <= duration / 4;
  return (
    <Timer danger={danger}>
      <h4 className="timer-title">Осталось времени</h4>
      <div className="time">{formatedTime(time)}</div>
    </Timer>
  );
}
