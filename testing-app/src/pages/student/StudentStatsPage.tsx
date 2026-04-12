import { observer } from "mobx-react-lite";
import { useStores } from "../../store/useStore";

export const StudentStatsPage = observer(() => {
    const testRunStore = useStores().testRunStore;

    
    return (
        <>
        
        <h2>student statistics</h2></>
    )
});