import React from "react";
import {
  cyan600,
  pink600,
  purple600,
  orange600
} from "material-ui/styles/colors";
import NewOrders from "../components/dashboard/NewOrders";
import MonthlySales from "../components/dashboard/MonthlySales";
import BrowserUsage from "../components/dashboard/BrowserUsage";
// import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import LineBarChart from "../components/dashboard/LineBarChart";
import globalStyles from "../styles";
import Data from "../data";

const DashboardPage = () => {
  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <NewOrders data={Data.dashBoardPage.newOrders} />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
          <MonthlySales data={Data.dashBoardPage.monthlySales} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          {/*<RecentlyProducts data={Data.dashBoardPage.recentProducts}/>*/}
          <LineBarChart data={Data.dashBoardPage.lineBarChart} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <BrowserUsage data={Data.dashBoardPage.browserUsage} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
