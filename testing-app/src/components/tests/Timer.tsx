import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Timer = styled.aside<{ danger: boolean; finished: boolean }>`
  background-color: ${(p) => {
    if (p.finished) return "#fff";
    return p.danger ? "#ffe9e9" : "#fcfeff";
  }};
  border: 1px solid ${(p) => {
    if (p.finished) return "#e5e7eb";
    return p.danger ? "#ffb3b3" : "#cfe0ff";
  }};
  color: ${(p) => {
    if (p.finished) return "#babcbd";
    return p.danger ? "#e00000" : "#1b5de0";
  }};
  box-shadow: inset 0 0 20px 0 ${(p) => {
    if (p.finished) return "#dde2e4";
    return p.danger ? "#ffb3b3" : "#cfe0ff";
  }};
  // box-shadow: inset 0 0 20px 0 #dde2e4;
  // background: #fff;
  // color: #dde2e4;
  // border: 1px solid #dde2e4;
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
  onTick?: (v: number) => void;
  onFinished?: () => void;
  finished?: boolean;
  // setSeconds?: (seconds: number) => void;
};

export default function TimerBox(props: TimerProps) {
  const { duration, onFinished, finished, onTick } = props;
  const [timeIsOver, setTimeIsOver] = useState<number>(duration || 0);
  // const [timeIsOver, setTimeIsOver] = useState(false);

  const [time, setTime] = useState(duration)

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          // setTimeIsOver(true);
          return 0;
        }
        if (setTime) setTime(t);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [finished, timeIsOver]);

  useEffect(() => {
    if (finished) return;
    onTick?.(time);
    // if (time === 0 && typeof onFinished === "function") {
    //   onFinished();
    // }
  }, [finished, time, onTick]);

  useEffect(() => {
    if (timeIsOver === 0 && onFinished) {
      onFinished();
    }
if (timeIsOver) setTimeIsOver(time);
    if (setTime) setTime(time);
  }, [timeIsOver, onFinished]);

  function formatedTime(t: number): string {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const danger = timeIsOver <= duration / 4;

  const userTime = finished ? "Время решения" : "Осталось времени";
  return (
    <Timer danger={danger} finished={finished ?? false}>
      <h4 className="timer-title">{userTime}</h4>
      <div className="time">{formatedTime(timeIsOver)}</div>
    </Timer>
  );
}
