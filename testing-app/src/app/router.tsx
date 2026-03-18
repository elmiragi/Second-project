import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminPage } from "../pages/Admin/AdminPage";
// import { StudentPage } from "../pages/student/StudentPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { StudentLayout } from "../layout/StudentLayout";
import { AppLayout } from "../layout/AppLayout";
import { NotFound } from "../pages/Errors/NotFound";
import { AdminLayout } from "../layout/AdminLayout";
import StudentTestPage from "../pages/student/StudentTestPage";
import StudentRunTest from "../pages/student/StudentRunTest";
import { StudentProfilePage } from "../pages/student/StudentProfilePage";
import { StudentStatsPage } from "../pages/student/StudentStatsPage";
import {StudentTestResultPage} from "../pages/student/StudentTestResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,

    children: [
      { path: "login", element: <LoginPage /> },

      {
        path: "student",
        element: <StudentLayout />,
        children: [
          { index: true, element: <Navigate to={"tests"} /> },
          // {path: 'test', element: <StudentLayout/>},
          { path: `tests`, element: <StudentTestPage /> },
          // { path: `test/:id`, element: <QuestionBlock /> },
          { path: `test/:id`, element: <StudentRunTest /> },
          { path: `profile`, element: <StudentProfilePage /> },
          { path: `statistics`, element: <StudentStatsPage /> },
          {
            path: `test/:id/result`,
            element: <StudentTestResultPage/>,
          },
        ],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPage /> },
          { path: `profile`, element: <h2>Admin profile</h2> },
          { path: `settings`, element: <h2>Admin settings</h2> },
        ],
      },
      //{path:"*", element: <NotFound/>,},
    ],
  },
]);
