/** @format */

import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {useQuery} from '@apollo/client';
import {GET_APPLICATION_HEADERS} from '../../../api-calls/queries/applications';
import {formatDate, formatNumberGridNoDecimals} from '../../../functions/formattingFunctions';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import {GridButton} from "../components/CellRenderers";

const ApplicationsGrid = () => {

  const [rowData, setRowData] = React.useState();
  const {loading} = useQuery(GET_APPLICATION_HEADERS, {
fetchPolicy:'network-only',
    onCompleted: (data) =>
      setRowData(data.applicationSummaryWithCumulativeValues.nodes),
  });

  const columnDefs = React.useMemo(
    () => [
      {
        field: 'applicationNumber',
        sort: 'desc',
      },
      {
        field: 'applicationReference',
      },
      {
        field: 'applicationDate',
        valueFormatter: params => formatDate(params.value)
      },
      {
        field: 'prevCumulativeApplicationValue',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'thisApplicationValue',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        cellStyle: {fontWeight: 'bold'},
      },
      {
        field: 'cumulativeApplicationValue',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'orderCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },{
        field: 'locationCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'itemCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {field: 'applicationSubmitted',
        headerClass: 'text-center',
        cellRenderer: params => {
          return params.data.applicationSubmitted === true ? <div style={{textAlign:"center", marginTop:5}}><DoneIcon color='submit'/></div> :<div style={{textAlign:"center",marginTop:5}}><ClearIcon color='error'/></div>
        }
      },
      {field: 'applicationOpen',
        headerClass: 'text-center',
        cellRenderer: params => {
          return params.data.applicationSubmitted === true ? <div style={{textAlign:"center", marginTop:5}}><DoneIcon color='submit'/></div> :<div style={{textAlign:"center",marginTop:5}}><ClearIcon color='error'/></div>
        }
      },
      {
        colId: 'selectButton', cellRenderer: GridButton, flex: 1.5, cellRendererParams: params => ( {
          path: params.data.id.toString()
        })

      },
    ],
    [],
  );

  const defaultColDef = React.useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    [],
  );
  const rowClassRules = React.useMemo(() => {
    return {
      'application-current': (params) => {
        return params.data.applicationCurrent;
      },
    };
  }, []);
  if (loading) return null;
  return (
    <AgGridReact
      className='ag-theme-alpine'
      animateRows='true'
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={rowData}
      domLayout='autoHeight'
      pagination={false}
      paginationPageSize={10}
      suppressRowClickSelection={true}
      rowClassRules={rowClassRules}
    />
  );
};

export default ApplicationsGrid;
