import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

interface CategoryInfo {
  categoryImage: string;
  categoryName: string;
}

const CategoryCard: React.FC<CategoryInfo> = ({
  categoryImage,
  categoryName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      viewport={{ once: true }}
      className="h-28 w-32 flex-col overflow-hidden rounded-lg bg-primary sm:h-56 sm:w-60 md:duration-500 md:hover:shadow-lg"
    >
      <Link
        to={`/category/${categoryName}`}
        
      >
        <img className="h-3/4 w-full flex-1 object-cover" src={categoryImage} />
        <p className="base-medium md:h3-medium center h-1/4 bg-primary capitalize">
          {categoryName}
        </p>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
