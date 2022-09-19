/** @format */

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PERIODS_WITH_VALUES } from '../../../api-calls/queries/misc';
import PeriodsGrid from '../../grids/grids/PeriodsGrid';

const PeriodAdmin = () => {
	const [rowData, setRowData] = React.useState([]);
	const { loading } = useQuery(GET_PERIODS_WITH_VALUES, {
		onCompleted: (data) => setRowData(data.periodWithValues.nodes),
	});
	if (loading) return null;
	console.log(rowData);
	return (
		<div>
			<PeriodsGrid rowData={rowData} />
		</div>
	);
};

export default PeriodAdmin;
