import  styled from '@emotion/styled';
import { LoginPage } from './pages/Login/LoginPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { StudentPage } from './pages/student/StudentPage';

const Heading = styled.h1`
  color: purple;
`
function App() {

  return (
    <>
      <Heading>App</Heading>
      <LoginPage />
      <AdminPage />
      <StudentPage />
    </>
  )
}

export default App
