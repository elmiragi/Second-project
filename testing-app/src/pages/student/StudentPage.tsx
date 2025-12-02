import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import StudentsTest from "./StudentsTest";


const StudentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export function StudentPage() {
    let navigate = useNavigate();
    function handleOpenTest() {
        return navigate('/student/test');
    }
    return (
        <>
        <StudentContainer>
        <StudentsTest/>
        {/* <Outlet/> */}
        <button onClick={() => handleOpenTest()}>Go tests</button>
        <button onClick={() => navigate(-1)}>Go back</button>
        
        </StudentContainer>
        </>
    )
}