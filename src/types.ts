export type Cart = {
    items: CartItem[]
}

export type CartItem = {
    itemCount: number,
    itemType: ShopItem
}

export type Order = {
    items: CartItem[],
    timestamp: Date
    sender: User,
}

export type User = {
    username: string,
    email: string,
    phone: string,
    addresses: UserAddress[]
}

export type UserAddress = {
    id: number,
    city: string,
    street: string,
    building: number,
    floor: number,
    apartment: number,
    entrance: number,
}

export const defaultAddress = () => {
    return {} as UserAddress;
}

export type Service = {
    name: string,
    description: string,
    imageUrl: string
}

export type PaginatedItemList<T> = {
    totalPages: number,
    currentPage: number,
    items: T[]
}

export type ShopItem = {
    id: string,
    title: string,
    description: string,
    priceInEuro: number,
    imgUrl: string,
    inStock: boolean,
    hotPrice: HotPriceDetails | undefined
}

export type HotPriceDetails = {
    oldPrice: number,
    newPrice: number
}

export type ContactMessage = {
    name: string,
    email: string,
    message: string
}