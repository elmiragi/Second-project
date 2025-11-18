import  styled from '@emotion/styled';
import { Login } from './pages/Login/login';
import { Admin } from './pages/Admin/admin';
import { Student } from './pages/student/student';

const Heading = styled.h1`
  color: purple;
`
function App() {

  return (
    <>
      <Heading>App</Heading>
      <Login />
      <Admin />
      <Student />
    </>
  )
}

export default App
