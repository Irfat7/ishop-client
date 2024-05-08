import axios from "axios";
import imageCompression from "browser-image-compression";
import { ICart } from "../types";
const imageHostingToken = import.meta.env.VITE_imgbbKey;

export const handleImageUpload = async (imageFiles: File[]) => {
  const imageFilesArray = Array.from(imageFiles);
  try {
    const compressedImages = await Promise.all(
      imageFilesArray.map((image) => compressImage(image)),
    );
    const response = await Promise.all(
      compressedImages.map((image) => uploadImage(image)),
    );
    console.log(response);
    const imageUrl = response.map((image) => image?.data?.data?.display_url);
    return imageUrl;
  } catch (error) {
    return false;
  }
};

const compressImage = async (image: File) => {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(image, options);
    return compressedFile;
  } catch (error) {
    throw new Error("Upload Failed");
  }
};

const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.set("key", imageHostingToken);
  formData.append("image", imageFile);

  return axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    data: formData,
  });
};

export const separateFeaturesByFullStop = (allFeatures: string) => {
  const featuresArray = allFeatures.split(".").map((feature) => feature.trim());
  return featuresArray;
};

export const addFeaturesByFullStop = (allFeatures: [string]) => {
  const featuresText = allFeatures.join(". ");
  return featuresText;
};

export const calculateTotal = (carts: ICart[], updateOperation: { id: string; pId: string; quantity: number }[]) => {
  const cartToCalculatePrice = carts.map(cartItem => {
    for (const { id, quantity } of updateOperation) {
      if (id === cartItem._id) {
        return { ...cartItem, quantity: quantity }
      }
    }
    return cartItem
  })
  const totalPrice = cartToCalculatePrice.reduce((acc, current) => {
    const discountedPrice = current.productId.discount === 0 ? current.productId.price : getDiscountedPrice(current.productId.price, current.productId.discount)
    return current.quantity * discountedPrice + acc
  }, 0)
  return totalPrice
}

export const getDiscountedPrice = (price: number, discount: number) => {
  return Math.floor(price * (1 - discount / 100))
}