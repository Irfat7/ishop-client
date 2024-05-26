import axios from "axios";
import imageCompression from "browser-image-compression";
import { ICart } from "../types";
const imageHostingToken = import.meta.env.VITE_IMGBB_KEY;

export const handleSingleImageUpload = async (imageFile: File): Promise<string | false> => {
  try {
    const compressedImages = await compressImage(imageFile)
    const response = await uploadImage(compressedImages)
    const imageUrl = response?.data?.data?.display_url;
    return imageUrl;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const handleImageUpload = async (imageFiles: File[]) => {
  const imageFilesArray = Array.from(imageFiles);
  try {
    const compressedImages = await Promise.all(
      imageFilesArray.map((image) => compressImage(image)),
    );
    const response = await Promise.all(
      compressedImages.map((image) => uploadImage(image)),
    );
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

export const calculateCreationDate = (creationDate: string) => {
  const now = new Date();
  const diff = now.getTime() - new Date(creationDate).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (years === 1) {
    return '1 year ago';
  } else if (years > 1) {
    return `${years} years ago`;
  } else {
    return 'Long time ago';
  }
}