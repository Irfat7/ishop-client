export type ICategory = {
    _id: string;
    name: string;
    products: [string];
}
export type IProduct = {
    _id: string;
    name: string;
    features: [string];
    category: ICategory;
    imageUrl: [string];
    quantity: number,
    averageRating: number,
    reviews: [string],
    price: number,
    discount: number
}

export type IUser = {
    name: string
    email: string
    imageUrl: string
    role: string
}