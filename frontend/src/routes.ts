import {createBrowserRouter} from "react-router"
import Home from './pages/Home';
import LoginPage from './pages/Sign-in';
import SignupPage from './pages/Sign-up';
import Property from "./pages/Property";
import Upload from "./pages/Upload";
import EditProperty from "./pages/Edit";

export  const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,   
  },
    {path:"login",
        Component:LoginPage
      },
            {path:"register",Component:SignupPage},
            {path:"property",Component:Property},
            {path:"upload",Component:Upload},
          { path: "/properties/:id/edit", Component: EditProperty }

]);