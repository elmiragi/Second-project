import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"



const QuestionsContainer = styled.div`
  padding: 20px;
`;

// const ErrorText = styled.h3`
//   color: red;
// `;

const QuestionNumber = styled.h4`
  background: white;
  color: black;
  border-radius: 10px;
  padding: 15px;
`;

// const QuestionBlock = styled.li` 
//   color: #272829ff;
//   margin: 10px;
// `;
const TextBlock = styled.div`
  color: #272829ff;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const OptionCard = styled.li`
  border: 1px solid #f0f0f0ff;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 8px;
  margin: 0;
`;

const OptionLabel = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  input {
    cursor: pointer;
  }
`;



export default function StudentTestPage() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    console.log('params----', params.id)
    const testId = Number(params.id);
    const filteredQuestions = questions.filter(q => q.testId===testId)
    const data = '/public/data/questions.json';
    console.log(filteredQuestions);
    useEffect(() => {
        fetch(data)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP${res.status}`);
                    return res.json()})
            .then(data => {
                setQuestions(data)})
            .finally(() => setIsLoading(false))
            .catch((err) => {
                setError(err.message);});

  }, []);
    if (Number.isNaN(testId)) return <div>Неверный ID</div>;
    if (isLoading) return <Upload className="custom-loader"></Upload>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
    if (filteredQuestions.length === 0) return <div>В текущий момент тесты отсутствуют...</div>;

    return (
        <section>
            {/* {isLoading && <Upload className="custom-loader"></Upload>}
            {error && <ErrorText>{error}</ErrorText>} */}
            {/* {!error && ( */}
            
                
            <QuestionsContainer>
                <TextBlock><h2>Информация о студенте</h2>
                <h4>Студент №{params.id}</h4></TextBlock>
 
                {filteredQuestions.map((q) => 
                    <OptionCard key={q.id}>
                        <QuestionNumber>{q.text}</QuestionNumber>
                        {q.type === "multiple" && (
                            <OptionList>
                                {(q.options ?? []).map((opt, i) => (
                                <li key={i}>
                                    <OptionLabel>
                                    <input id={i} type="checkbox"/>
                                    <span>{opt}</span>
                                    </OptionLabel>
                                </li>
                                ))}
                            </OptionList>
                            )}

                        {q.type === "single" && (
                            <OptionList>
                                {(q.options ?? []).map((opt, i) => (
                                <li key={i}>
                                    <OptionLabel>
                                    <input id={`q-${q.id}-${i}`} type="radio" name={`q-${q.id}`} aria-label={`Option ${i} q - ${q.id}`} />
                                    <span>{opt}</span>
                                    </OptionLabel>
                                </li>
                                ))}
                            </OptionList>
                            )}

                    </OptionCard>
            )}
            </QuestionsContainer>
        </section>
)};