export type ICategory = {
  _id: string;
  name: string;
  products: [string];
};
export type IProduct = {
  _id: string;
  name: string;
  features: [string];
  category: ICategory;
  imageUrl: [string];
  quantity: number;
  averageRating: number;
  reviews: [string];
  price: number;
  discount: number;
};

export type IUser = {
  name: string;
  email: string;
  imageUrl: string;
  role: string;
};

export type ICart = {
  _id: string;
  userId: IUser;
  productId: IProduct;
  quantity: number;
};

export type IOrder = {
  _id: string,
  userId: string,
  paymentId: string,
  paymentInfo: {
    amount: number,
    userId: string,
    _id: string
  },
  productDescription: IProduct[],
  productInfo: {
    productId: string
    quantity: number,
    reviewed: boolean,
    _id: string
  }[],
  otp: string,
  status: string
}