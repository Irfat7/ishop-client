import { useEffect } from 'react';
import { useGetAllCategory } from '../../../hooks/useGetAllCategory';
import { useAxiosErrorToast } from '../../../hooks/useAxiosErrorToast';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import Loader from '../../../components/universe/Loader/Loader';
import { ICategory } from '../../../types';
import CategoryCard from '../../../components/nextui/CategoryCard';

const CategoryHome = () => {
    const [categories, isCategoryLoading, isCategoryError] = useGetAllCategory();
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        isCategoryError && axiosErrorToast(isCategoryError)
    }, [isCategoryError])

    return (
        <>
            <SectionHeader title="Shop By Category" />
            <div className="grid grid-cols-2 place-items-center gap-y-4 xl:grid-cols-3">
                {isCategoryLoading && <Loader />}
                {categories.map((category: ICategory) => (
                    <CategoryCard
                        key={category._id}
                        categoryImage={category.imageUrl}
                        categoryName={category.name}
                    />
                ))}
            </div>
        </>
    );
};

export default CategoryHome;