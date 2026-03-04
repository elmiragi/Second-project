import styled from "@emotion/styled";
import type { Question } from "../types/testing";
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

const OptionLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
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

const Answerarea = styled.textarea`
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
`;

type CheckResult = {
  max: number;
  answer: number;
  status?: "correct" | "warning" | "in_correct";
};

type QuestionBlockProps = {
  value: string | string[] | null;
  question: Question;
  result?: CheckResult;
  showResult?: boolean;
  onChange: (id: number, value: string | string[] | null) => void;
};

export default function QuestionBlock(props: QuestionBlockProps) {
  const { question, value, onChange, showResult } = props;
  const { id, options = [], type, text, correct, score, shuffle } = question;

  console.log('score', score)
  function getOptionState(
    option: string,
  ): "correct" | "warning" | "in_correct" | undefined {
    if (type === "multiple") {
      // const arr = Array.isArray(value) ? value : [];
      // const cor = Array.isArray(correct) ? correct : [];
      const arr: string[] = Array.isArray(value) ? value : [];
      const cor: string[] = Array.isArray(correct) ? correct : [];

      if (arr.includes(option) && cor.includes(option)) {
        return "correct";
      } else if (arr.includes(option) && !cor.includes(option)) {
        return "in_correct";
      } else if (!arr.includes(option) && cor.includes(option)) {
        return "warning";
      }
    } else if (type === "single") {
      const isSelected = value === option;
      const isCorrect = option === correct;
      if (isSelected && isCorrect) {
        return "correct";
      }
      if (!isSelected && isCorrect) {
        return "warning";
      }
      if (isSelected && !isCorrect) {
        return "in_correct";
      }
      return undefined;
    }
  }
  console.log(getOptionState);

  return (
    // <OptionList>
    //   {questions.map(q => (
    <QuestionCard key={id}>
      <ContainerQuestions>
        <legend>{text}</legend>
      </ContainerQuestions>

      {type === "multiple" && (
        <OptionList>
          {options.map((option: string, i: number) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(option);

            return (
              <div key={i}>
                <OptionLabel htmlFor={`q-${id}-${i}`}>
                  <input
                    id={`q-${id}-${i}`}
                    type="checkbox"
                    value={option}
                    checked={checked}
                    onChange={() => {
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
          {options.map((option: string, i: number) => (
            <li key={i}>
              <OptionLabel htmlFor={`q-${id}-${i}`}>
                <input
                  id={`q-${id}-${i}`}
                  type="radio"
                  name={`q-${id}`}
                  aria-label={`Option ${i} q-${id}`}
                  checked={value === option}
                  onChange={() => onChange(id, option)}
                />
                <span>{option}</span>
              </OptionLabel>
            </li>
          ))}
        </OptionList>
      )}

      {type === "text" && (
        <OptionList>
          <OptionLabel htmlFor={`q-${id}`}>
            <Answerarea
              name={`q-${id}`}
              aria-label={`Ответ на вопрос ${id}`}
              placeholder="Введите свой ответ..."
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(id, e.target.value)}
            />
          </OptionLabel>
        </OptionList>
      )}
    </QuestionCard>

    // </OptionList>
  );
}
