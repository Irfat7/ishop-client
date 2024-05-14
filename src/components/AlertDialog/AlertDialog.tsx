import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';

interface AlertDialogProps {
    changingRoleError: Error | null
    isChangingRole: boolean
    placeholder: string
    name: string
    roleChangeHandler: (role: string) => Promise<void>
}

const AlertDialog: React.FC<AlertDialogProps> = ({ changingRoleError, placeholder, name, roleChangeHandler, isChangingRole }) => {
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
                disabled={isChangingRole}
                className="bg-dark-red text-secondary p-1 rounded-md min-w-fit">
                {isChangingRole ?
                    <CircularProgress size={20} style={{ color: "white" }} />
                    : changingRoleError ?
                        "Failed"
                        : placeholder
                }
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {placeholder === 'Assign Admin' ? `Assign ${name} as admin` : `Remove ${name} from admin`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            placeholder === 'Assign Admin' ?
                                `Are you sure you want to assign ${name} as admin?`
                                : `Are you sure you want to remove ${name} from admin?`
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='bg-dark-red' onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        roleChangeHandler(placeholder === 'Assign Admin' ? `admin` : `user`)
                        handleClose()
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AlertDialog;