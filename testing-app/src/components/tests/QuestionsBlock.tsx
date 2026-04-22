import styled from "@emotion/styled";
import type { CheckResult, Question } from "../types/testing";
import { useState } from "react";

// const WrapperQuestions = styled.li`
//   width: 100%;
//   max-width: 792px;
//   height: 100%;
//   background: #fff;
//   border: 1px solid #dde2e4;
//   border-radius: 12px;
//   margin: 20px;
//   list-style: none;
// `;

const OptionList = styled.ul`
  display: grid;
  gap: 15px;
  padding: 10px;
  list-style: none;
`;

const ResultInfo = styled.div`
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  color: #09090b;
  margin-top: 12px;
`;

const ScoreBadge = styled.span`
  font-weight: 600;
  color: #0e73f6;
  margin-right: 8px;
`;

const OptionLabel = styled.label<{ $state?: "correct" | "warning" | "wrong" }>`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  border: 2px solid transparent;
  input {
    accent-color: #0e73f6; /* Тот самый синий цвет из вашего ScoreBadge */
  }

  ${(p) =>
    p.$state === "correct" &&
    `
    background: #e8f7f1;
    border-color: #1ec47d;
  `}
  ${(p) =>
    p.$state === "wrong" &&
    `
    background: #fde8e8;
    border-color: #ff4444;
  `}
  ${(p) =>
    p.$state === "warning" &&
    `
    background: #fff4e6;
    border-color: #ffa528;
  `}

  input:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const QuestionCard = styled.li`
  width: 100%;
  max-width: 792px;
  height: 100%;
  background: #fafafa;
  border: 1px solid #dde2e4;
  border-radius: 12px;
  margin: 20px;
  list-style: none;
`;

const ContainerQuestions = styled.div`
  padding: 34px 22px;
  // color: ${(p) => p.theme.colors.primary};
  color: #09090b;
  font-weight: 600;
  font-size: 18px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: -2.2%;
`;

const AnswerArea = styled.textarea`
  width: 100%;
  min-height: 70px;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  color: #09090b;
  outline: none;
  gap: 4px;
  &:focus {
    border: 1px solid #fafafa;
    box-shadow: 0 0 0 3px rgba(14, 115, 246, 0.08);
  }
  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

type QuestionBlockProps = {
  value: string | string[] | null;
  question: Question;
  result?: CheckResult;
  showResult?: boolean;
  onChange: (id: number, value: string | string[] | null) => void;
};

export default function QuestionBlock(props: QuestionBlockProps) {
  const { question, value, onChange, showResult, result } = props;
  const { id, options = [], type, text, correct } = question;

  // console.log('score', score)
  function getOptionState(
    option: string,
  ): "correct" | "warning" | "wrong" | undefined {
    if (type === "multiple") {
      const arr: string[] = Array.isArray(value) ? value : [];
      const cor: string[] = Array.isArray(correct) ? correct : [];

      if (arr.includes(option) && cor.includes(option)) {
        return "correct";
      } else if (arr.includes(option) && !cor.includes(option)) {
        return "wrong";
      } else if (!arr.includes(option) && cor.includes(option)) {
        return "warning";
      }
    } else if (type === "single") {
      const isSelected = value === option;
      const isCorrect = option === correct;
      console.log("option", option);
      console.log("value", value);
      console.log("isCorrect", isCorrect);
      if (isSelected && isCorrect) {
        return "correct";
      }
      if (!isSelected && isCorrect) {
        return "warning";
      }
      if (isSelected && !isCorrect) {
        return "wrong";
      }
      return undefined;
    }
  }
  return (
    // <OptionList>
    //   {questions.map(q => (
    <QuestionCard key={id}>
      <ContainerQuestions>
        <legend>{text}</legend>
      </ContainerQuestions>
      {/* <div>{showResult && result}</div> */}

      {type === "multiple" && (
        <OptionList>
          {options.map((option: string, i: number) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(option);
            const optionState = showResult ? getOptionState(option) : undefined;

            return (
              <div key={i}>
                <OptionLabel htmlFor={`q-${id}-${i}`} $state={optionState}>
                  <input
                    id={`q-${id}-${i}`}
                    type="checkbox"
                    value={option}
                    checked={checked}
                    disabled={showResult}
                    onChange={() => {
                      if (showResult) return;
                      getOptionState(option);
                      const next = checked
                        ? arr.filter((ch) => ch !== option)
                        : [...arr, option];
                      onChange(id, next);
                    }}
                  />
                  <span>{option}</span>
                </OptionLabel>
              </div>
            );
          })}
        </OptionList>
      )}

      {type === "single" && (
        <OptionList>
          {options.map((option: string, i: number) => {
            const optionState = showResult ? getOptionState(option) : undefined;

            return (
              <li key={i}>
                <OptionLabel htmlFor={`q-${id}-${i}`} $state={optionState}>
                  <input
                    id={`q-${id}-${i}`}
                    type="radio"
                    name={`q-${id}`}
                    aria-label={`Option ${i} q-${id}`}
                    checked={value === option}
                    disabled={showResult}
                    onChange={() => {
                      if (showResult) return;
                      onChange(id, option);
                    }}
                  />
                  <span>{option}</span>
                </OptionLabel>
              </li>
            );
          })}
        </OptionList>
      )}

      {type === "text" && (
        <OptionList>
          <OptionLabel htmlFor={`q-${id}`}>
            <AnswerArea
              name={`q-${id}`}
              aria-label={`Ответ на вопрос ${id}`}
              placeholder="Введите свой ответ..."
              value={typeof value === "string" ? value : ""}
              disabled={showResult}
              onChange={(e) => {
                if (showResult) return;
                onChange(id, e.target.value);
              }}
            />
          </OptionLabel>
        </OptionList>
      )}
      {/* Добавлен абсолютно новый блок!!! */}
      {showResult && result && (
        <ResultInfo>
          <ScoreBadge>
            Баллы: {result.score}/{result.max}
          </ScoreBadge>
          {/* {result.status === "correct" && <span>Правильно</span>}
          {result.status === "wrong" && (
            <span>Неправильно. Правильный ответ: {String(correct)}</span>
          )}
          {result.status === "warning" && (
            <span>Неответлено. Правильный ответ: {String(correct)}</span>
          )} */}
        </ResultInfo>
      )}
    </QuestionCard>
  );
}
