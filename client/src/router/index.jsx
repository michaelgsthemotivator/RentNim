import { createBrowserRouter, redirect } from "react-router-dom";
// pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyRentPage from "../pages/MyRentPage";
import DetailPage from "../pages/DetailPage";
// components
import Navbar from "../components/Navbar";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    // kalo pakai children, wajib menggunakan outlet di mainLayoutNya,, dalam hal ini, main layout kita adalah navbar
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/details/:id",
        element: <DetailPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/my-rent",
        element: <MyRentPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "register",
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
]);

export default router;
