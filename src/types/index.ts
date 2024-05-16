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
  _id: string,
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string,
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

export type IReview = {
  _id: string,
  orderId: string,
  userId: string,
  productId: string,
  starCount: number,
  message: string
}

export type IAdminOrder = {
  _id: string,
  address: string,
  customerName: string,
  payment: number,
  status: string,
  productInfo: {
    productId: string,
    productName: string,
    image: string[],
    quantity: number,
    reviewed: boolean
  }[]
}