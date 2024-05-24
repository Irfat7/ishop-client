import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useGetProductById } from "../../hooks/useGetProductById";
import Loader from "../../components/universe/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { IProduct, IReviewProduct } from "../../types";
import { Rating } from "@mui/material";
import UpdateProductModal from "../../components/nextui/UpdateProductModal/UpdateProductModal";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAdminVerify } from "../../hooks/useAdminVerify";
import { useGetReviewProductId } from "../../hooks/useGetReviewProductId";
import ReviewCard from "../shared/ReviewCard";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import NothingFound from "../shared/NothingFound";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, isProductInfoLoading, errorInfo] = useGetProductById(
    productId || "",
  );
  const { user } = useAuthContext();
  const [admin] = useAdminVerify(user?.email || "");
  const { reviews, reviewsPending } = useGetReviewProductId(productId || '')

  if (isProductInfoLoading) {
    return <Loader />;
  }
  if (errorInfo) {
    return (
      <ErrorMessage
        code={errorInfo.response?.status}
        message={errorInfo.response.data.message}
      />
    );
  }
  const typedProduct = product as IProduct;
  return (
    <div>
      <div className="mx-auto gap-4 md:flex md:w-3/4">
        <Carousel className="md:w-1/3">
          {typedProduct.imageUrl.map((url, index) => (
            <div key={index}>
              <img className="h-52 w-full object-contain" src={url} />
            </div>
          ))}
        </Carousel>
        <div className="mb-4 space-y-2">
          <p className="text-3xl uppercase">{typedProduct.name}</p>
          <div className="flex">
            <Rating
              size="medium"
              name="half-rating-read"
              defaultValue={typedProduct.averageRating}
              precision={0.1}
              readOnly
            />
            <span className="opacity-70">
              ({typedProduct.reviews.length} ratings)
            </span>
          </div>
          <hr className="opacity-20" />
          <p className="text-2xl font-bold text-dark-red">
            ${typedProduct.price}
          </p>
          <ul className="pl-4">
            {typedProduct.features.map((feature, index) => (
              <li className="list-disc" key={index}>
                {feature}
              </li>
            ))}
          </ul>
          <div>
            <Link
              className="rounded-md bg-dark-red px-4 py-1 text-lg capitalize text-secondary"
              to={`/category/${typedProduct.category.name}`}
            >
              {typedProduct.category.name}
            </Link>
          </div>
        </div>
        {admin && <UpdateProductModal {...typedProduct} />}
      </div>
      <div className="">
        <SectionHeader title="Product reviews" />
        {
          reviews.length === 0 && !reviewsPending ? <NothingFound message="No reviews"/> :
            reviews.map((review: IReviewProduct) => <ReviewCard key={review._id} review={review} userName={review.userId.name || 'Not Available'} />)
        }
      </div>
    </div>
  );
};

export default SingleProduct;
