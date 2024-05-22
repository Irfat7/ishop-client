import { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import { useGetCoupons } from '../../hooks/useGetCoupons';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import Table from '../../components/Table/Table';

const Coupons = () => {
    const {
        coupons, couponsLoading, couponsError
    } = useGetCoupons()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        couponsError && axiosErrorToast(couponsError)
    }, [couponsError])

    return (
        <div>
            <SectionHeader title='Coupons' />
            {
                couponsLoading ? <Loader /> :
                    <Table coupons={coupons} />
            }
        </div>
    );
};

export default Coupons;

/*
coupons look like this
[
    {
        "_id": "65e48524103e045e8c702e41",
        "code": "12345678",
        "quantity": 100,
        "amount": 123,
        "__v": 0
    },
    {
        "_id": "65e48524103e045e8c123e41",
        "code": "12321",
        "quantity": 40,
        "amount": 23,
        "__v": 0
    }
] 
how to make a reusable table component i have done the header part but how can i do the array of object part
since object key will be different
*/