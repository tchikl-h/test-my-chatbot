import React from "react";
import SettingsPower from "material-ui/svg-icons/action/settings-power";
import VpnKey from "material-ui/svg-icons/communication/vpn-key";
import { cyan600, pink600, purple600 } from "material-ui/styles/colors";
import ExpandLess from "material-ui/svg-icons/navigation/expand-less";
import ExpandMore from "material-ui/svg-icons/navigation/expand-more";
import ChevronRight from "material-ui/svg-icons/navigation/chevron-right";

const data = {
  menus: [
    // { text: "Dashboard", icon: <img src={require("./assets/menu-logo/dashboard-logo.svg")} svgStyle={{ width: 25, height: 25 }} />, link: "/dashboard" },
    { text: "Chatbots", icon: <img src={require("./assets/menu-logo/robot-logo.svg")} svgStyle={{ width: 27, height: 27 }} />, link: "/chatbots" },
    { text: "Team", icon: <img src={require("./assets/menu-logo/team-logo.svg")} svgStyle={{ width: 27, height: 27 }} />, link: "/users" },
    { text: "History", icon: <img src={require("./assets/menu-logo/history-logo.svg")} svgStyle={{ width: 25, height: 25 }} />, link: "/history" },
    { text: "About us", icon: <img src={require("./assets/menu-logo/about-us-logo.svg")} svgStyle={{ width: 25, height: 25 }} />, link: "/about" }
  ],
  signOutMenus: [
    { text: "Sign out", icon: <SettingsPower />, link: "/login" },
    { text: "Change password", icon: <VpnKey />, link: "/password" }
  ],
  tablePage: {
    items: [
      { id: 1, name: "Product 1", price: "$50.00", category: "Category 1" },
      { id: 2, name: "Product 2", price: "$150.00", category: "Category 2" },
      { id: 3, name: "Product 3", price: "$250.00", category: "Category 3" },
      { id: 4, name: "Product 4", price: "$70.00", category: "Category 4" },
      { id: 5, name: "Product 5", price: "$450.00", category: "Category 5" },
      { id: 6, name: "Product 6", price: "$950.00", category: "Category 6" },
      { id: 7, name: "Product 7", price: "$550.00", category: "Category 7" },
      { id: 8, name: "Product 8", price: "$750.00", category: "Category 8" },
      { id: 9, name: "Product 6", price: "$950.00", category: "Category 6" },
      { id: 10, name: "Product 7", price: "$550.00", category: "Category 7" },
      { id: 11, name: "Product 8", price: "$750.00", category: "Category 8" }
    ]
  },
  dashBoardPage: {
    recentProducts: [
      {
        id: 1,
        title: "Samsung TV",
        text: "Samsung 32 1080p 60Hz LED Smart HDTV."
      },
      { id: 2, title: "Playstation 4", text: "PlayStation 3 500 GB System" },
      {
        id: 3,
        title: "Apple iPhone 6",
        text: "Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G "
      },
      {
        id: 4,
        title: "Apple MacBook",
        text: "Apple MacBook Pro MD101LL/A 13.3-Inch Laptop"
      }
    ],
    monthlySales: [
      { name: "Jan", uv: 3700 },
      { name: "Feb", uv: 3000 },
      { name: "Mar", uv: 2000 },
      { name: "Apr", uv: 2780 },
      { name: "May", uv: 2000 },
      { name: "Jun", uv: 1800 },
      { name: "Jul", uv: 2600 },
      { name: "Aug", uv: 2900 },
      { name: "Sep", uv: 3500 },
      { name: "Oct", uv: 3000 },
      { name: "Nov", uv: 2400 },
      { name: "Dec", uv: 2780 }
    ],
    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
    browserUsage: [
      { name: "Toto", value: 800, color: cyan600, icon: <ExpandMore /> },
      { name: "Titi", value: 300, color: pink600, icon: <ChevronRight /> },
      { name: "Lala", value: 300, color: purple600, icon: <ExpandLess /> }
    ],
    lineBarChart: [
      { name: "Page A", uv: 590, pv: 800, amt: 1400 },
      { name: "Page B", uv: 868, pv: 967, amt: 1506 },
      { name: "Page C", uv: 1397, pv: 1098, amt: 989 },
      { name: "Page D", uv: 1480, pv: 1200, amt: 1228 },
      { name: "Page E", uv: 1520, pv: 1108, amt: 1100 },
      { name: "Page F", uv: 1400, pv: 680, amt: 1700 }
    ]
  }
};

export default data;
