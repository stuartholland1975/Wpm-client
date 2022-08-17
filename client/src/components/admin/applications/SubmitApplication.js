import React from 'react';
import {useMutation, useReactiveVar} from "@apollo/client";
import {Button} from "@mui/material";
import {SUBMIT_APPLICATION} from "../../../api-calls/mutations/application-mutations";
import {gridSelectionsVar} from "../../../cache";
import {useConfirm} from "material-ui-confirm";

const SubmitApplication = ({rowData}) => {
  const selectedApplication = useReactiveVar(gridSelectionsVar).selectedApplication
  const isSelected = useReactiveVar(gridSelectionsVar).selectedApplication !== false
  const isSubmitted = useReactiveVar(gridSelectionsVar).selectedApplication[0]?.applicationSubmitted
  const isValid = rowData.filter(obj => obj.applicationNumber === selectedApplication[0]?.applicationNumber - 1)[0]?.applicationSubmitted
  const isOpen = useReactiveVar(gridSelectionsVar).selectedApplication[0]?.applicationOpen
  const confirm = useConfirm()
  const [submissionData, setSubmissionData] = React.useState()
  const [submitApp, {error}] = useMutation(SUBMIT_APPLICATION, {
    fetchPolicy: 'network-only',
    onCompleted: () => {
      gridSelectionsVar({...gridSelectionsVar(), selectedApplication: false})
    }
  })

  const handleSubmitApp = () => {
    confirm({
      title: 'Confirm Submit Application',
      titleProps: {color: 'red', fontWeight: 'bold'},
      description: `Are You Sure You Want To Submit ${selectedApplication[0].applicationReference} ?`,
      confirmationText: 'Submit Application',
      cancellationButtonProps: {color: 'secondary'},
      confirmationButtonProps: {autoFocus: true, color: 'update'},
      allowClose: false,
    }).then(() => submitApp({variables: {appNumber: selectedApplication[0].id}})).then((r) => {
      setSubmissionData(r.data.submitApplication.query.submittedApplicationByApplicationId);
      confirm({
        title: error ? 'Submission Failed' : 'Application Submitted!',
        titleProps: {color: 'red', fontWeight: 'bold'},
        cancellationButtonProps: {color: 'secondary'},
        confirmationButtonProps: {autoFocus: true, color: 'update'},
        confirmationText: 'VIEW SUBMISSION DATA',
        allowClose: false,
      }).then(r => console.log(r))
    }).catch(error => console.log(error))
  }

  return (
    <Button
      disabled={!isSelected || isSubmitted || isOpen || !isValid}
      onClick={handleSubmitApp}
      color='action'
      fullWidth={true}>
      submit application
    </Button>
  );
};

export default SubmitApplication;