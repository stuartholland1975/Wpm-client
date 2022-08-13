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
            query {
                applicationSummaryWithCumulativeValues {
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
                    }
                }
            }
        }
    }
`;

