export type ICategory = {
    _id: string;
    name: string;
    products: [string];
}
export type IProduct = {
    _id: string;
    name: string;
    features: [string];
    category: string;
    imageUrl: [string];
    quantity: number,
    averageRating: number,
    reviews: [string],
    price: number,
    discount: number
}