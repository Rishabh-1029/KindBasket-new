import React from "react";

import MonthlySpending from "../components/MonthlySpending";
import MonthlyQuantity from "../components/MonthlyQuantity";
import MonthlyDonation from "../components/MonthlyDonation";
import MonthlyWaste from "../components/MonthlyWaste";

const ECOProgress = () => {
  
  return (
    <div>
      <MonthlySpending/>
      <MonthlyQuantity/>
      <MonthlyWaste/>
    </div>
  );
};

export default ECOProgress;
