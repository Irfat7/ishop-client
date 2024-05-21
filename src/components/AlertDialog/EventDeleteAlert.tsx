import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

interface EventDeleteAlertProps {
    closeEvent: UseMutateAsyncFunction<unknown, Error, string, unknown>,
    eventId: string
    closingEvent: boolean
}

const EventDeleteAlert: React.FC<EventDeleteAlertProps> = ({ closeEvent, eventId, closingEvent }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button
                onClick={handleClickOpen}
                disabled={closingEvent}
                className="bg-dark-red px-2 py-1 rounded text-secondary duration-300 hover:scale-105">
                {
                    closingEvent ? <CircularProgress size={20} style={{ color: 'white' }} /> : "Delete"
                }
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this event? This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            closeEvent(eventId)
                            handleClose()
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default EventDeleteAlert;