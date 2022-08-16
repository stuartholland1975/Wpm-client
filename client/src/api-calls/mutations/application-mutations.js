import {gql} from '@apollo/client'

export const CLOSE_CURRENT_APPLICATION = gql`
    mutation CloseCurrentApplication($id: Int!, $ref: String!, $dt: Datetime!) {
        updateApplication(
            input: {
                patch: {
                    applicationCurrent: false
                    applicationOpen: false
                    finalisationReference: $ref
                    dateFinalised: $dt
                }
                id: $id
            }
        ) {
            clientMutationId
        }
    }
`;

export const AUTO_INCREMENT_APPLICATION = gql`
    mutation AutoIncrementApplication($current_app:Int!) {
        autoCloseCurrentApplication(input: {}) {
            application {
                applicationSummaryWithCumulativeValuesById(
                    filter: {id: {equalTo: $current_app}, or: {applicationCurrent: {equalTo: true}}}
                ) {
                    nodes {
                        id
                        applicationNumber
                        applicationReference
                        applicationDate
                        applicationCurrent
                        applicationOpen
                        applicationSubmitted
                        prevCumulativeApplicationValue
                        thisApplicationValue
                        cumulativeApplicationValue
                        itemCount
                        locationCount
                        imageCount
                        orderCount
                        areaCount
                    }
                }
            }
        }
    }

`

export const REMOVE_APPLICATION_SUBMISSION_FLAG = gql`
    mutation RemoveApplicationSubmissionFlag($id: Int!) {
        updateApplication(
            input: { patch: { applicationSubmitted: false }, id: $id }
        ) {
            clientMutationId
        }
    }
`;