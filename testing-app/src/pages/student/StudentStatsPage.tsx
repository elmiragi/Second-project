import { observer } from "mobx-react-lite";
import { useStores } from "../../store/useStore";

// const counter = new Counter();
// const data = new testRunStore();
export const StudentStatsPage = observer(() => {
    const counter = useStores().counter;
    const testRunStore = useStores().testRunStore;

    const {increment, decrement, reset, value} = counter;
    
    return (
        <>
        <p>{testRunStore.title}</p>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => reset()}>Reset</button>
        <p>{value}</p>
        <h2>student statistics</h2></>
    )
});