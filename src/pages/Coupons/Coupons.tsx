import { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import { useGetCoupons } from '../../hooks/useGetCoupons';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import Table from '../../components/Table/Table';

const Coupons = () => {
    const {
        coupons, couponsLoading, couponsError, refetchCoupon, refetchingCoupon
    } = useGetCoupons()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        couponsError && axiosErrorToast(couponsError)
    }, [couponsError])

    return (
        <div>
            <SectionHeader title='Coupons' />
            {
                couponsLoading || refetchingCoupon ? <Loader /> :
                    <Table coupons={coupons} refetchCoupon={refetchCoupon} />
            }
        </div>
    );
};

export default Coupons;