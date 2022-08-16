import React from 'react';
import {Button} from "@mui/material";
import {useMutation} from "@apollo/client";
import {
  AUTO_INCREMENT_APPLICATION,
  CLOSE_CURRENT_APPLICATION
} from "../../../api-calls/mutations/application-mutations";
import {useConfirm} from "material-ui-confirm";
import { v4 as uuidv4 } from 'uuid';

function findCurrentApplication(app) {
  return app.applicationCurrent === true
}

const CloseCurrentApplication = ({rowData, refetch, setRowData}) => {

  const finalisationId = uuidv4()
  const confirm = useConfirm()
  // const [closeApp] = useMutation(CLOSE_CURRENT_APPLICATION);
  const [closeApp] = useMutation(AUTO_INCREMENT_APPLICATION);

  const currentApp = rowData.find(app => findCurrentApplication(app))

  const handleCloseApplication = () => {
    confirm({
      title: 'Confirm Close Application',
      titleProps: {color: 'red', fontWeight: 'bold'},
      description: `Are You Sure You Want To Close ${currentApp.applicationReference} ?`,
      confirmationText: 'Update Application',
      cancellationButtonProps: {color: 'secondary'},
      confirmationButtonProps: {autoFocus: true, color: 'update'},
      allowClose: false,
    }).then(() => closeApp({
      variables: {
        // ref: finalisationId,
        // dt: new Date(),
        // id: currentApp.id
        currentApp: currentApp.id
      }
    })).then(() => refetch()).then(r => setRowData(r.data.applicationSummaryWithCumulativeValues.nodes))
  };

  return (
    <Button
      onClick={handleCloseApplication}
      color='action'
      fullWidth={true}>
      close current application
    </Button>
  );
};

export default CloseCurrentApplication;