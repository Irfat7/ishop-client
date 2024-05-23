import { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import { useGetCoupons } from '../../hooks/useGetCoupons';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import Table from '../../components/Table/Table';
import NewCoupon from './NewCoupon';

const Coupons = () => {
    const {
        coupons, couponsLoading, couponsError, refetchCoupon, refetchingCoupon
    } = useGetCoupons()
    const axiosErrorToast = useAxiosErrorToast()
    const [newCouponVisible, setNewCouponVisible] = useState<boolean>(false)

    useEffect(() => {
        couponsError && axiosErrorToast(couponsError)
    }, [couponsError])

    return (
        <div className='overflow-hidden'>
            <SectionHeader title='Coupons' />
            <button
                onClick={() => setNewCouponVisible(!newCouponVisible)}
                className='bg-dark-red py-1 px-2 rounded text-secondary mb-5'>
                {
                    newCouponVisible ? 'Back' : ' Create New Coupon'
                }
            </button>
            <div className={`flex transition duration-300 ${newCouponVisible ? '-translate-x-full' : 'translate-x-0'}`}>
                <div className='w-full flex-shrink-0'>
                    {
                        couponsLoading || refetchingCoupon ? <Loader /> :
                            <Table coupons={coupons} refetchCoupon={refetchCoupon} />
                    }
                </div>
                <div className='w-full flex-shrink-0'>
                    <NewCoupon setNewCouponVisible={setNewCouponVisible} refetchCoupon={refetchCoupon} />
                </div>
            </div>
        </div>
    );
};

export default Coupons;