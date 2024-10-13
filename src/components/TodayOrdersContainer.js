import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import OrderForm from './OrderForm';
import OrderCard from './OrderCard';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function OrderFormDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>Nuevo Pedido</DialogTitle>
      <OrderForm/>
    </Dialog>
  );
}

OrderFormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function TodayOrdersContainer() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <React.Fragment>
        <Box m={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Nuevo Pedido
            </Button>
        </Box>
      
        <Box m={2} sx={{ display: 'flex', flexWrap: 'wrap-reverse' }}>
            {
                [1,2,3,4,5,6,7].map((card) => {
                    return <Box m={1}>
                        <OrderCard/>
                    </Box>
                })
            }
        </Box>

        <OrderFormDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
        />
    </React.Fragment>
  );
}
