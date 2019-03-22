// import Dashboard from "views/Dashboard/Dashboard";
// import UserProfile from "views/UserProfile/UserProfile";
// import TableList from "views/TableList/TableList";
import Typography from "../views/Typography/Typography";
// import Icons from "views/Icons/Icons";
// import Maps from "views/Maps/Maps";
// import Notifications from "views/Notifications/Notifications";
import Upgrade from "../views/Upgrade/Upgrade";
import Calendar from "../views/Calendar/Calendar";
import ToDo from "../views/ToDo/ToDo";
import Contacts from "../views/Contacts/Contacts";
import Login from "../views/Login/Login";
import Chat from "../layouts/Chat/Chat";
import Calendar2 from "../../src/views/Calendar/Calendar2";

const dashboardRoutes = [

  {
    path: "/calendar",
    name: "Calendar",
    icon: "pe-7s-date",
    component: Calendar
  },

  {
    path: "/to-do",
    name: "To Do",
    icon: "pe-7s-note2",
    component: ToDo
  },
  {
    path: "/messages",
    name: "Messages",
    icon: "pe-7s-users",
    component: Chat
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: "pe-7s-id",
    component: Contacts
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade
  },
  { redirect: true, path: "/", to: "/login", component: Login }

];



export default dashboardRoutes;
