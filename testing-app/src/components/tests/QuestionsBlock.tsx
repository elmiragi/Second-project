import styled from "@emotion/styled";
import type { Question } from "../types/testing";

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

type QuestionBlockProps = {
  value: string | string[] | null;
  question: Question;
  onChange: (id: number, value: string | string[] | null) => void;
};

export default function QuestionBlock(props: QuestionBlockProps) {
  const { question, value, onChange } = props;

  // const [questions, setQuestions] = useState<Question[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");
  // const params = useParams();
  // const testId = Number(params.id);

  // console.log(questions);

  // useEffect(() => {
  //   const data = "/data/questions.json";
  //   let ignore = false;

  //   fetch(data)
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       return res.json();
  //     })
  //     .then((payload) => {
  //       // if (ignore) return;
  //       // const filteredQuestions = data.questions.filter((q: any) => q.testId === testId);
  //       const list: any[] = Array.isArray(payload)
  //         ? payload
  //         : (payload?.questions ?? []);
  //       const filteredQuestions = list.filter((q: any) => q.testId === testId);
  //       setQuestions(filteredQuestions);
  //     })
  //     .catch((e) => {
  //       if (ignore) return;
  //       setError(e.message);
  //     })
  //     .finally(() => setIsLoading(false));

  //   return () => {
  //     ignore = true;
  //   };
  // }, [testId]);
  // if (Number.isNaN(testId)) return <h3>Невверный ID</h3>;
  //  if (isLoading) return <Loader/>;
  // if (error) return <h3>{error}</h3>;

  // function onChangeHandler(id: number, value: string) {
  //   console.log(id, value);
  // }

  return (
    // <OptionList>
    //   {questions.map(q => (
    <QuestionCard key={question.id}>
      <ContainerQuestions>
        <legend>{question.text}</legend>
      </ContainerQuestions>

      {question.type === "multiple" && (
        <OptionList>
          {(question.options ?? []).map((option: string, i: number) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(option);
            
              return (
                <div key={i}>
              <OptionLabel htmlFor={`q-${question.id}-${i}`}>
                <input
                  id={`q-${question.id}-${i}`}
                  type="checkbox"
                  value={option}
                  checked={checked}
                  onChange={() => { const next = checked 
                    ? arr.filter(ch => ch !==option) : [... arr, option];
                     onChange(question.id, next);
                  }}
                />
                <span>{option}</span>
              </OptionLabel>
            </div>);
})}
        </OptionList>
      )}

      {question.type === "single" && (
        <OptionList>
          {(question.options ?? []).map((option: string, i: number) => (
            <li key={i}>
              <OptionLabel htmlFor={`q-${question.id}-${i}`}>
                <input
                  id={`q-${question.id}-${i}`}
                  type="radio"
                  name={`q-${question.id}`}
                  aria-label={`Option ${i} q-${question.id}`}
                  checked={value === option}
                  onChange={() => onChange(question.id, option)}
                />
                <span>{option}</span>
              </OptionLabel>
            </li>
          ))}
        </OptionList>
      )}

      {question.type === "text" && (
        <OptionList>
          <OptionLabel htmlFor={`q-${question.id}`}>
            <Answerarea
              name={`q-${question.id}`}
              aria-label={`Ответ на вопрос ${question.id}`}
              placeholder="Введите свой ответ..."
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => onChange(question.id, e.target.value)}
            />
          </OptionLabel>
        </OptionList>
      )}
    </QuestionCard>

    // </OptionList>
  );
}
