/** @format */

import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {gridSelectionsVar} from '../../../cache';

export const GridButton = (props) => {
  const {data, path, gridType} = props;
  const navigate = useNavigate();

	const buttonClicked = () => {
		navigate({pathname: path})
	};

	function onButtonMouseOver() {
		gridSelectionsVar({...gridSelectionsVar(), selectedOrder: data});
	}

	return (
		<Button
			sx={{borderRadius: 0, border: 0, m: 0}}
			color='navigation'
			onClick={() => buttonClicked(path)}
		//	onMouseOver={onButtonMouseOver}
				>
			details
		</Button>
	);
};
