import {
  createBrowserRouter,
} from "react-router-dom";
import { MainLayout } from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import { Home } from "../Pages/Home";
import Menu from "../Pages/Menu";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { PrivateRoute } from "./PrivateRoute";
import { Dashboard } from "../Layout/Dashboard";
import { MyCart } from "../Pages/Dashboard/MyCart";
import { AddReview } from "../Pages/Dashboard/AddReview";
import { Reservation } from "../Pages/Dashboard/Reservation";
import { UserHome } from "../Pages/Dashboard/UserHome";
import { AllUsers } from "../Pages/Dashboard/AllUsers";
import { AdminRoute } from "./AdminRoute";
import { AddMenu } from "../Pages/Dashboard/AddMenu";
import { ManageMenu } from "../Pages/Dashboard/ManageMenu";
import { UpdateMenu } from "../Pages/Dashboard/UpdateMenu";
import { Payment } from "../Pages/Dashboard/Payments/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage> ,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <PrivateRoute><Menu></Menu></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      }
    ]
  },
  {
    path:"dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path: "userHome",
        element:<UserHome></UserHome>
      },
      {
        path: "myCart",
        element:<MyCart></MyCart>
      },
      {
        path: "payment",
        element:<Payment></Payment>
      },
      {
        path: "addReview",
        element:<AddReview></AddReview>
      },
      {
        path: "reservation",
        element:<Reservation></Reservation>
      },

      // admin releted routes
      {
        path: "adminHome",
        element: <AdminRoute><h1>Admin</h1></AdminRoute>
      },
      {
        path: "addMenu",
        element: <AdminRoute><AddMenu></AddMenu></AdminRoute>
      },
      {
        path: "manageMenu",
        element: <AdminRoute><ManageMenu></ManageMenu></AdminRoute>
      },
      {
        path: "updateMenu/:id",
        element: <AdminRoute><UpdateMenu></UpdateMenu></AdminRoute>
      },
      {
        path: "bookings",
        element: <h1>Booking</h1>
      },
      {
        path: "users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }

    ]
  }
]);

export default router;