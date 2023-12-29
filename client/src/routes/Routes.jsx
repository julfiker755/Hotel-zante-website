import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Roomdetails from '../pages/Roomdetailspage/Roomdetails'
import Private from '../hooks/Private'
import DashboardLayout from '../layouts/DashboardLayout'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import Mylisting from '../pages/Dashboard/Host/Mylisting'
import Mangeuser from '../pages/Dashboard/Admin/Mangeuser'
import Adminprivate from './Adminprivate'
import Hostprivate from './Hostprivate'
import MyBookings from '../pages/Dashboard/Gust/MyBookings'
import Gustprivate from './Gustprivate'
import Profile from '../pages/Dashboard/Profile/Profile'
import Mangebookings from '../pages/Dashboard/Host/Mangebookings'


export const router = createBrowserRouter([
  //  fornt-end system
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },{
        path:'/room/:id',
        element:<Private><Roomdetails></Roomdetails></Private>
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

  // backend system -dashboard
  {path:'/dashboard',element:<Private><DashboardLayout></DashboardLayout></Private>,
  children:[
    // gust route
    {path:'my-bookings',element:<Gustprivate><MyBookings></MyBookings></Gustprivate>},
    // host route
    {path:'add-room',element:<Hostprivate><AddRoom></AddRoom></Hostprivate>},
    {path:'my-listing',element:<Hostprivate><Mylisting></Mylisting></Hostprivate>},
    {path:'mange-bookings',element:<Hostprivate><Mangebookings></Mangebookings></Hostprivate>},
    // admin route
    {path:'mange-user',element:<Adminprivate><Mangeuser></Mangeuser></Adminprivate>},
    // profile
    {path:'profile',element:<Private><Profile></Profile></Private>}
  ]
}
])
