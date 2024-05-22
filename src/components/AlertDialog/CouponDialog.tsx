import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { CircularProgress, DialogTitle } from '@mui/material';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CouponDialogProps {
    deleteCoupon: UseMutateAsyncFunction<unknown, Error, string, unknown>
    deletingCoupon: boolean
    couponId: string
}

const CouponDialog: React.FC<CouponDialogProps> = ({ deleteCoupon, deletingCoupon, couponId }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteCoupon = async () => {
        handleClose()
        const response = await deleteCoupon(couponId)
        if (!response) {
            return
        }
        toast.success("Coupon deleted")
    }

    return (
        <React.Fragment>
            <button
                disabled={deletingCoupon}
                onClick={handleClickOpen}
                className={`btn w-20 font-medium border duration-200 border-dark-red hover:bg-dark-red hover:text-secondary py-1 px-2 rounded-sm ${deletingCoupon && 'bg-dark-red'}`}>
                {
                    deletingCoupon ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Delete'
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
                        Are you sure you want to delete this coupon?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteCoupon} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
};

export default CouponDialog;