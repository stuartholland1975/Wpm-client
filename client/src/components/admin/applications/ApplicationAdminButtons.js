import React from 'react';
import {Grid, Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CloseCurrentApplication from "./CloseCurrentApplication";
import {ref} from "yup";

const ApplicationAdminButtons = ({rowData, refetch, setRowData}) => {

  return (
    <Grid container spacing={2} mb={2} mt={1} columns={4}>
      <Grid item={true} xs={1}>
        <CloseCurrentApplication rowData={rowData} refetch={refetch} setRowData={setRowData}/>
      </Grid>
      <Grid item={true} xs={1}>
        <Button
          disabled={true}
          // onClick={handleSubmitApplication}
          /* disabled={
             selectedApplication === false ||
             selectedApplication?.applicationSubmitted ||
             selectedApplication?.applicationOpen
           }*/
          color='action'
          fullWidth={true}>
          submit application
        </Button>
      </Grid>
      <Grid item={true} xs={1}>
        <Button
          disabled={true}
          /*disabled={
            selectedApplication === false ||
            selectedApplication?.applicationSubmitted === false
          }
          onClick={handleReverseSubmitApplication}*/
          fullWidth={true}
          color='action'>
          remove submission flag
        </Button>
      </Grid>
      <Grid item={true} xs={1}>
        <Button
          startIcon={<DownloadIcon/>}
          disabled={true}
          /* disabled={
             selectedApplication === false ||
             selectedApplication?.applicationSubmitted === false
           }
           onClick={handleExportDetail}*/
          fullWidth={true}
          color='action'>
          download submission data
        </Button>
      </Grid>
    </Grid>
  );
};

export default ApplicationAdminButtons;