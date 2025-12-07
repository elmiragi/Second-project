import { createBrowserRouter } from "react-router-dom";
import { AdminPage } from "../pages/Admin/AdminPage";
import { StudentPage } from "../pages/student/StudentPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { AppLayout } from "../layout/AppLayout";
import { NotFound } from "../pages/Errors/NotFound";
// import { StudentLayout } from "../layout/StudentLayout";
import { AdminLayout } from "../layout/AdminLayout";
import StudentTestPage from "../pages/student/StudentTestPage";
import StudentsTest from "../pages/student/StudentsTest";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        errorElement: <NotFound />,
        
        children: [ {path: "login", element: <LoginPage/>},
        
        {path: "student", element: <StudentPage/>, children:[
            {index: true, element: <StudentsTest/>},
            // {path: 'test', element: <StudentLayout/>},
            {path: `test/:id`, element: <StudentTestPage/>},
            {path: `test`, element: <StudentsTest/>},
        ]},


        {path: "admin", element: <AdminPage/>, children:[
            {index: true, element: <AdminPage/>},
            {path: 'test', element: <AdminLayout/>}
        ]},
        //{path:"*", element: <NotFound/>,},
    ],
    },
    
    
]);