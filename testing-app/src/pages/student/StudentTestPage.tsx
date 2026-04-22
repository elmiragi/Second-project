import styled from "@emotion/styled";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TestCard } from "../../components/tests/TestCard";
import type { TestItem, Attempt } from "../../components/types/testing";
import { TestHeader } from "../../components/tests/TestHeader";
import { useStores } from "../../store/useStore";
import { observer } from "mobx-react-lite";
import { StudentTestPageVM } from "../../store/tests/studentTestPageVM";

// const Upload = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 60vh;
//   font-size: 16px;
//   color: #0f172a;
// `;

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 15px;
`;

const Cards = styled.div`
  display: grid;
  // grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: start;
`;

export const StudentTestPage = observer(() => {
  const root = useStores();
  const studentTest = useMemo(() => new StudentTestPageVM(root), [root]);
  const testCatalog = useStores().testCatalogStore;
  const { init, lastAttemptByTest } = studentTest;
  const { tests, error, loading: isLoading } = testCatalog;

  // const [searchOpen, setSearchOpen] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading) return <Upload className="custom-loader">Загрузка...</Upload>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (tests.length === 0)
    return <div>В текущий момент тесты отсутствуют...</div>;

  return (
    <section>
      <TestHeader title="Список тестов" />

      <Cards>
        {tests.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            lastAttempt={lastAttemptByTest.get(test.id)}
          />
        ))}
      </Cards>
    </section>
  );
});
