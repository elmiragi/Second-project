import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminPage } from "../pages/Admin/AdminPage";
// import { StudentPage } from "../pages/student/StudentPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { StudentLayout } from "../layout/StudentLayout";
import { AppLayout } from "../layout/AppLayout";
import { NotFound } from "../pages/Errors/NotFound";
import { AdminLayout } from "../layout/AdminLayout";
import StudentTestPage from "../pages/student/StudentTestPage";
import StudentsTest from "../pages/student/StudentsTest";
import { StudentProfilePage } from "../pages/student/StudentProfilePage";
import { StudentStatsPage } from "../pages/student/StudentStatsPage";

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
          { path: `test/:id`, element: <StudentTestPage /> },
          { path: `tests`, element: <StudentsTest /> },
          { path: `profile`, element: <StudentProfilePage /> },
          { path: `statistics`, element: <StudentStatsPage /> },
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
