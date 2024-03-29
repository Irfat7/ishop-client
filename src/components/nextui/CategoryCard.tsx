import React from "react";

interface CategoryInfo {
    categoryImage: string;
    categoryName: string;
}

const CategoryCard: React.FC<CategoryInfo> = ({ categoryImage, categoryName }) => {
    return (
        <div className="w-32 h-28 sm:w-60 sm:h-56 bg-primary flex-col overflow-hidden rounded-lg md:duration-500 md:hover:shadow-lg">
            <img
                className="flex-1 h-3/4 w-full object-cover"
                src={categoryImage} />
            <p className="base-medium md:h3-medium h-1/4 bg-primary center">{categoryName}</p>
        </div>
    );
};

export default CategoryCard;