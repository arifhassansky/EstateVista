import {
    createBrowserRouter
  } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import AllProperties from "../Pages/AllProperties";
import ViewDetails from "../Pages/ViewDetails";
import AddProperty from "../Pages/Dashboard/Agent/AddProperty";

import Wishlist from "../Pages/Dashboard/User/Wishlist";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import MakeOffer from "../Pages/Dashboard/User/MakeOffer";
import MyAddedProperties from "../Pages/Dashboard/Agent/MyAddedProperties";
import UpdateProperties from "../Pages/Dashboard/Agent/UpdateProperties";
import Profile from "../Pages/Dashboard/Profile";
import PropertyBought from "../Pages/Dashboard/User/PropertyBought";
import RequestedProperties from "../Pages/Dashboard/Agent/RequestedProperties";
import ManageProperties from "../Pages/Dashboard/Admin/ManageProperties";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import MySoldProperties from "../Pages/Dashboard/Agent/MySoldProperties";
import ManageReviews from "../Pages/Dashboard/Admin/ManageReviews";
import Advertise from "../Pages/Dashboard/Admin/Advertise";
import PrivateRoute from "./PrivateRoute";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Pages/Errorpage";
import Contact from "../Pages/Contact";
import AboutUs from "../Pages/Home/AboutUs";
import Login from "../Pages/Home/Authentication/Login";
import Register from "../Pages/Home/Authentication/Register";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement: <ErrorPage/>,
      children :[
        {
            path: '/',
            element : <Home/>
        },
        {
         path : '/all-properties',
         element : <AllProperties></AllProperties>
        },
        {
          path : '/property/:id',
          element : <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>
        },
        {
        path : '/contact',
        element : <Contact/>
        },
        {
          path : '/aboutUs',
        element : <AboutUs/>
          },
        {
            path : '/login',
            element : <Login/>
        },
        {
          path : '/register',
          element : <Register/>
      }
      ]
    },
    {
      path : '/dashboard',
      element :<Dashboard></Dashboard>,
      children : [
        
         {  
          path : '/dashboard/add-property',
          element : <AgentRoute><AddProperty/></AgentRoute>
         },
         {
          path: '/dashboard',
          element : <Profile></Profile>
         },
         {
           path : '/dashboard/payment/:id',
           element: <PrivateRoute><Payment></Payment></PrivateRoute>
         },
         {
          path: '/dashboard/paymentHistory',
          element : <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
         },
         {
          path: '/dashboard/my-sold-properties',
          element : <AgentRoute><MySoldProperties></MySoldProperties></AgentRoute>
         },
         {
          path: '/dashboard/advertise',
          element :<AdminRoute><Advertise></Advertise></AdminRoute>
         },
         {
          path: '/dashboard/manageReviews',
          element : <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
         },
         {
           path: '/dashboard/makeOffer/:id',
           element : <PrivateRoute><MakeOffer></MakeOffer></PrivateRoute>,
         },
         {
          path: '/dashboard/property-bought',
          element : <PrivateRoute><PropertyBought></PropertyBought></PrivateRoute>,
        },
        {
          path : '/dashboard/requested-properties',
          element : <AgentRoute><RequestedProperties></RequestedProperties></AgentRoute>
        },
        {
          path : '/dashboard/manageProperties',
          element : <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
        },
         {
          path: '/dashboard/my-added-properties',
          element : <AgentRoute><MyAddedProperties></MyAddedProperties></AgentRoute>
         },
         {
          path : "/dashboard/manageUsers",
          element : <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
         },
         {
           path: '/dashboard/updateProperty/:id',
           element: <AgentRoute><UpdateProperties></UpdateProperties></AgentRoute>,
           loader : ({params})=> fetch(`https://estatevista-server.vercel.app/property/${params.id}`)
         },
         {
          path: '/dashboard/wishlist',
          element : <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
         },
         {
          path: '/dashboard/myReviews',
          element : <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
         },
      ]
    }
  ]);


  export default  router;