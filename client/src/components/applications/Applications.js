import React from 'react';
import ApplicationsGrid from "../grids/grids/ApplicationsGrid";
import {useQuery} from "@apollo/client";
import {GET_APPLICATION_HEADERS} from "../../api-calls/queries/applications";

const Applications = () => {
  const [rowData, setRowData] = React.useState([]);
  const {loading, refetch} = useQuery(GET_APPLICATION_HEADERS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => setRowData(data.applicationSummaryWithCumulativeValues.nodes)
  });

  if (loading) return null;
  return (
    <div>
      <ApplicationsGrid rowData={rowData}/>
    </div>
  );
};

export default Applications;