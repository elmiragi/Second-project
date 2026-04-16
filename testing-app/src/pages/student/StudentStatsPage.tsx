import { observer } from "mobx-react-lite";
import { useStores } from "../../store/useStore";
import { useEffect, useMemo } from "react";
import { TestRunPageVM } from "../../store/tests/TestRunPageVM";

export const StudentStatsPage = observer(() => {
    const root = useStores();
    const testRunStore = useMemo(() => new TestRunPageVM(root), [root]);
    // const title = useStores().testRunStore;
    const {init} = testRunStore;
    useEffect(() => {
        testRunStore.store.loadData();
    }, [testRunStore]);
      useEffect(() => {
    init();
  }, [init]);

    console.log(testRunStore.store.filteredQuestions);
    
    return (
        <>
        
        <h2>student statistics</h2></>
    )
});