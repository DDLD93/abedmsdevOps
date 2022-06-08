/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Payment from "./layouts/payment"
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Sheets from "layouts/sheets";
import Beneficiaries from "layouts/beneficiaries";
import UserList from "layouts/users";
import Batches from "layouts/batches"
import Biometrics from "layouts/biometrics";
import PSPList from "layouts/psp";
import PSPDashboard from "layouts/pspdashboard";
import Reports from "layouts/report";
import LiveData from "layouts/live-data";
import PaypointList from "layouts/paypoint";
import Support from "layouts/support";
const psp = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
    component: <PSPDashboard />,
  },
  {
    type: "collapse",
    name: "Paypiont",
    key: "paypiont",
    icon: <Icon fontSize="small">people_icon</Icon>,
    route: "/paypiont",
    component: <PaypointList />,

  },
  {
    type: "collapse",
    name: "Support",
    key: "Support",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Support",
    component: <Support />,
  },
  // {
  //   type: "collapse",
  //   name: "User Account",
  //   key: "Users",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/users",
  //   component: <UserList />,
  // },
  //  {
  //     type: "collapse",
  //     name: "Payments",
  //     key: "Payments",
  //     icon: <Icon fontSize="small">payments</Icon>,
  //     route: "/Payments",
  //     component: <Payment />,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Biometrics",
  //     key: "biometrics",
  //     icon: <Icon fontSize="small">fingerprint_icon</Icon>,
  //     route: "/",
  //     component: <Biometrics />,
  //   },

  //   {
  //     type: "collapse",
  //     name: "Dashboard",
  //     key: "dashboard",
  //     icon: <Icon fontSize="small">dashboard</Icon>,
  //     route: "/dashboard",
  //     component: <Dashboard />,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Batches",
  //     key: "Batches",
  //     icon: <Icon fontSize="small">receipt_long</Icon>,
  //     route: "/batches",
  //     component: <Batches />,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Scheduler",
  //     key: "scheduler",
  //     icon: <Icon fontSize="small">list_alt</Icon>,
  //     route: "/scheduler",
  //     component: <Sheets />,
  //   },
  //   {
  //     type: "collapse",
  //     name: "User Account",
  //     key: "Users",
  //     icon: <Icon fontSize="small">person</Icon>,
  //     route: "/users",
  //     component: <UserList />,
  //   }, 
  //   {
  //     type: "collapse",
  //     name: "PSP",
  //     key: "psp",
  //     icon: <Icon fontSize="small">person</Icon>,
  //     route: "/psp",
  //     component: <PSPList />,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Live-Data",
  //     key: "Live-Data",
  //     icon: <Icon fontSize="small">login</Icon>,
  //     route: "Live-Data",
  //     component: <Notifications />,
  //   },
]
const staff = [

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "List",
    key: "List",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/list",
    component: <Batches />,
  },
  {
    type: "collapse",
    name: "Scheduler",
    key: "scheduler",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/scheduler",
    component: <Sheets />,
  },
  {
    type: "collapse",
    name: "Support",
    key: "Support",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Support",
    component: <Support />,
  },

  //  {
  //     type: "collapse",
  //     name: "Beneficiaries",
  //     key: "beneficiaries",
  //     icon: <Icon fontSize="small">people_icon</Icon>,
  //     route: "/beneficiaries",
  //     component: <Beneficiaries />,
  //   }, 
  // {
  //   type: "collapse",
  //   name: "Payments",
  //   key: "Payments",
  //   icon: <Icon fontSize="small">payments</Icon>,
  //   route: "/Payments",
  //   component: <Payment />,
  // },
]
const qa = [

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Scheduler",
    key: "scheduler",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/scheduler",
    component: <Sheets />,
  },
  {
    type: "collapse",
    name: "Beneficiaries",
    key: "beneficiaries",
    icon: <Icon fontSize="small">people_icon</Icon>,
    route: "/beneficiaries",
    component: <Beneficiaries />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "Reports",
    icon: <Icon fontSize="small">login</Icon>,
    route: "reports",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Support",
    key: "Support",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Support",
    component: <Support />,
  },
]
const admin = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Paypiont",
    key: "paypiont",
    icon: <Icon fontSize="small">people_icon</Icon>,
    route: "/paypiont",
    component: <PaypointList />,

  },
  {
    type: "collapse",
    name: "List",
    key: "List",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/list",
    component: <Batches />,
  },
  {
    type: "collapse",
    name: "Scheduler",
    key: "scheduler",
    icon: <Icon fontSize="small">list_alt</Icon>,
    route: "/scheduler",
    component: <Sheets />,
  },
  {
    type: "collapse",
    name: "Beneficiaries",
    key: "beneficiaries",
    icon: <Icon fontSize="small">people_icon</Icon>,
    route: "/beneficiaries",
    component: <Beneficiaries />,
  },
  {
    type: "collapse",
    name: "User Account",
    key: "Users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <UserList />,
  },
    {
      type: "collapse",
      name: "Reports",
      key: "Reports",
      icon: <Icon fontSize="small">login</Icon>,
      route: "reports",
      component: <Reports />,
    },
  {
    type: "collapse",
    name: "PSP",
    key: "psp",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/psp",
    component: <PSPList />,
  },
  // {
  //   type: "collapse",
  //   name: "Live-Data",
  //   key: "Live-Data",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "Live-Data",
  //   component: <LiveData />,
  // },
  {
    type: "collapse",
    name: "Support",
    key: "Support",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Support",
    component: <Support />,
  },
];
const coordinator = [
  {
    type: "collapse",
    name: "Reports",
    key: "Reports",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Support",
    key: "Support",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Support",
    component: <Support />,
  },
]
const sign = [
  {
    type: "collapse",
    name: "Biometrics",
    key: "sign",
    route: "/",
    component: <SignIn />,
  },
]

export { admin, qa ,staff, psp, sign,coordinator };
