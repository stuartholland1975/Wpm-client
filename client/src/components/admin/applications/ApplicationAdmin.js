import React from 'react';
import ApplicationAdminButtons from "./ApplicationAdminButtons";
import ApplicationsGrid from "../../grids/grids/ApplicationsGrid";

const ApplicationAdmin = () => {
  return (
    <div>
      <ApplicationAdminButtons/>
      <ApplicationsGrid/>
    </div>
  );
};

export default ApplicationAdmin;