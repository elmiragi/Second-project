import styled from "@emotion/styled";
//import { Outlet } from "react-router-dom";

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function AdminPage() {
    return (
        <>
            <AdminContainer>
            <h1>Admin page</h1>
            {/* <Outlet/> */}
            </AdminContainer>
        </>
    )
}