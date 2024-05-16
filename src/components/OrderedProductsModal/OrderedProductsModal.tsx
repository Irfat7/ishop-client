import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface OrderedProductsModalProps {
    productInfo: {
        productId: string,
        productName: string,
        image: string[],
        quantity: number,
        reviewed: boolean
    }[]
}

const OrderedProductsModal: React.FC<OrderedProductsModalProps> = ({ productInfo }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button
                onClick={handleOpen}
                className="btn border font-medium hover:font-normal duration-200 border-dark-red hover:bg-dark-red hover:text-secondary py-1 px-2 rounded-sm">
                View
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className=''>
                            <p className='mb-2 text-center text-lg font-medium border border-light-ash text-dark-red '>Product Description</p>
                            <div className='grid grid-cols-6 bg-dark-red py-2 px-1 text-secondary'>
                                <p className='center'>Image</p>
                                <p className='col-span-4 center'>Name</p>
                                <p className='center'>Quantity</p>
                            </div>
                            {
                                productInfo.map((product, index) => <div className='odd:bg-light-ash grid gap-x-1 grid-cols-6 border border-light-ash' key={index}>
                                    <img src={product.image[0]} className='object-center' alt="product image" />
                                    <p className='col-span-4 center'>{product.productName}</p>
                                    <p className='center'>{product.quantity}</p>
                                </div>)
                            }
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default OrderedProductsModal;