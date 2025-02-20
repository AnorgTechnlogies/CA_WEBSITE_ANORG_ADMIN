import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserPlusIcon,
  BuildingOfficeIcon, 
  GlobeAltIcon,
  HomeModernIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, AddTehsilBlock } from "@/pages/dashboard";
import { ForgotPassword, SignIn, SignUp } from "@/pages/auth";
import AllBlockTehsils from "./pages/dashboard/AllBlockTehsils";
import AllGrampanchayat from "./pages/dashboard/AllGrampanchayat";
import ViewDeductionRecord from "./pages/dashboard/ViewDaeductionRecord";
import ViewAgreementRecord from "./pages/dashboard/VIewAgreementRecord";
import ExportAllData from "./pages/dashboard/ExportAllData";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Add Tehsil Block",
        path: "/addTehsil",
        element: <AddTehsilBlock />,
      },

      {
        icon: <BuildingOfficeIcon{...icon} />,
        name: "All Tehsils",
        path: "/allTehsil",
        element: <AllBlockTehsils />,
      },

      
      {
        icon: <HomeModernIcon {...icon} />,
        name: "All Grampanchayat",
        path: "/allGrampanchayat",
        element: <AllGrampanchayat />,
      },

      {
        icon: <HomeModernIcon {...icon} />,
        name: "View Deduction Record",
        path: "/viewDeductionData/:gpId",
        element: <ViewDeductionRecord />,
      },

      {
        icon: <HomeModernIcon {...icon} />,
        name: "View Agreement Record",
        path: "/viewAgreementRecord/:gpId",
        element: <ViewAgreementRecord />,
      },


      {
        icon: <HomeModernIcon {...icon} />,
        name: "Export All Data",
        path: "/exportData",
        element: <ExportAllData />,
      },
      // {
      //   icon: <BuildingOfficeIcon  {...icon} />,
      //   name: "Add Gram Panchayat",
      //   path: "/addGramPanchayat",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "ForgotPassword",
        path: "/ForgotPassword",  // Change this to "/forgot-password"
        element: <ForgotPassword />,
      }
    ],
  },
];

export default routes;
