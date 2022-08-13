import React, {useId} from 'react';
import {Button} from "@mui/material";
import {confirmAlert} from "react-confirm-alert";
import {useMutation, useApolloClient, gql, useQuery} from "@apollo/client";
import {GET_CURRENT_APPLICATION,GET_APPLICATION_HEADERS} from "../../../api-calls/queries/applications";
import {CLOSE_CURRENT_APPLICATION} from "../../../api-calls/mutations/application-mutations";
import {useConfirm} from "material-ui-confirm";

const CloseCurrentApplication = () => {
  const client = useApolloClient()
  const finalisationId = useId()
  const confirm = useConfirm()
  const [closeApp] = useMutation(CLOSE_CURRENT_APPLICATION);

  const {data} = useQuery(GET_CURRENT_APPLICATION);


  console.log(data)

  const handleCloseApplication = () => {
    confirm({
      title: 'Confirm Close Application',
      titleProps: {color: 'red', fontWeight: 'bold'},

     description: `Are You Sure You Want To Close ${data.applications.nodes[0].applicationReference} ?`,
      confirmationText: 'Update Application',
      cancellationButtonProps: {color: 'secondary'},
      confirmationButtonProps: {autoFocus: true, color: 'update'},
      allowClose: false,
    }).then(() => closeApp({
      variables: {
        ref: finalisationId,
        dt: new Date(),
        id:data.applications.nodes[0].id
      }
    }))
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