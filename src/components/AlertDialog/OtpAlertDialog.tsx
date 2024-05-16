import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const OtpAlertDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < inputRefs.current.length - 1 && value !== '') {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatusUpdate = () => {
        console.log(otp);
    }

    const clearOtp = () => {
        setOtp(['', '', '', '', '', ''])
    }

    return (
        <React.Fragment>
            <button
                onClick={handleClickOpen}
                className="btn font-medium hover:font-normal border duration-200 border-dark-red hover:bg-dark-red hover:text-secondary py-1 px-2 rounded-sm">
                Update Order
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p>Delivery Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    <p>Enter the code provided to the user</p>
                                </div>
                            </div>
                            <div>
                                <form>
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex gap-1 flex-row items-center justify-between mx-auto w-full max-w-xs">
                                            {otp.map((value, index) => (
                                                <div key={index} className="w-16 h-16">
                                                    <input
                                                        ref={(el) => (inputRefs.current[index] = el)}
                                                        className="appearance-none w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-light-ash text-lg"
                                                        type="number"
                                                        onInput={(e) => {
                                                            const target = e.target as HTMLInputElement
                                                            if (target.value.length > 1) {
                                                                target.value = target.value.slice(0, 1);
                                                            }
                                                        }}
                                                        value={value}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                                <div className='flex justify-end mt-2'>
                                    <button onClick={clearOtp} className='underline text-sm duration-200 hover:text-dark-red'>Clear OTP</button>
                                </div>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleStatusUpdate} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default OtpAlertDialog;