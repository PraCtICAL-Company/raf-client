import { useQuery } from "@tanstack/react-query"
import type { ShopSearchFilters } from "../routes/shop";

export const usePrivacyPolicy = (locale: string) => {
    return useQuery({
        queryKey: ['privacy-policy'],
        queryFn: async () => {
            const response = await fetch(`/locales/${locale}/privacy-policy.txt`)
            return response.text();
        }
    });
}

export const useProjects = () => {
    return useQuery({
        queryKey: ['useProjects'],
        queryFn: () => {
            return [
                {
                    imageUrl: 'svg/projects/_1.svg',
                    text: 'Wir bauen ein rs6 Sedan aus einem normalen a6',
                    clickUrl: 'https://google.com'
                },
                {
                    imageUrl: 'svg/projects/_2.svg',
                    text: 'Lassen sitze neu beziehen',
                    clickUrl: 'https://google.com'
                },
                {
                    imageUrl: 'svg/projects/_3.svg',
                    text: 'Da verbreitern wir selber die kotflügeln',
                    clickUrl: 'https://google.com'
                },
            ]
        }
    })
}

export const useWorkers = () => {
    return useQuery({
        queryKey: ['useWorkers'],
        queryFn: () => {
            return [
                {
                    imageUrl: 'img/worker_1.jpg',
                    description: 'S. Vettel, CEO',
                },
                {
                    imageUrl: 'img/worker_2.jpg',
                    description: 'M. Schumacher, GOAT',
                },
                {
                    imageUrl: 'img/worker_3.jpg',
                    description: 'N. Rosberg, in equal machinery',
                },
            ]
        }
    })
}

export interface User {
    username: string,
    email: string,
    phone: string,
    addresses: UserAddress[]
}



export interface UserAddress {
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

export const useServices = (page: number) => {
    return useQuery({
        queryKey: ['useServices'],
        queryFn: () => {
            return {
                totalPages: 2,
                currentPage: page,
                items: [
                    {
                        name: "Service 1",
                        description: "description 1",
                        imageUrl: "img/worker_1.jpg"
                    } as Service,
                    {
                        name: "Service 2",
                        description: "description 2",
                        imageUrl: "img/worker_2.jpg"
                    } as Service,
                    {
                        name: "Service 3",
                        description: "description 3",
                        imageUrl: "img/worker_3.jpg"
                    } as Service,
                    {
                        name: "Service 4",
                        description: "description 4",
                        imageUrl: "img/worker_3.jpg"
                    } as Service,
                    {
                        name: "Service 5",
                        description: "description 5",
                        imageUrl: "img/worker_2.jpg"
                    } as Service,
                ]
            } as PaginatedItemList<Service>;
        }
    })
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

export const useSearchRecommendations = () => {
    return useQuery({
        queryKey: ['useSearchRecommendations'],
        queryFn: () => {
            return [
                "Sit amet consectetur",
                "Ex sapien vitae r",
                "Sem placerat in id",
                "Tempus leo eu aenean",
            ];
        }
    })
}

export const useBrands = (filterBrands: string[]) => {
    console.log(filterBrands);

    let indexes = [];

    const brands = [
        {
            label: "Brand 1",
            value: "123"
        } as Brand,
        {
            label: "Brand 2",
            value: "113"
        } as Brand,
        {
            label: "Brand 3",
            value: "222"
        } as Brand,
    ];

    for (let i = 0; i < brands.length; i++) {
        for (let j = 0; j < filterBrands.length; j++) {
            if (brands[i].value == filterBrands[j]) {
                indexes.push(i);
            }
        }
    }

    return useQuery({
        queryKey: ['useBrands'],
        queryFn: () => {
            return {
                activeOptionIndexes: indexes,
                options: brands
            }
        }
    })
}

export type Brand = {
    label: string,
    value: string
}

export const useShopSearch = (filters: ShopSearchFilters) => {
    return useQuery({
        queryKey: ['useShopSearch'],
        queryFn: () => {
            return {
                totalPages: 2,
                currentPage: 1,
                items: [
                    {
                        id: "234532",
                        title: "XX1",
                        description: "XX1",
                        priceInEuro: 299.99,
                        imgUrl: "img/worker_1.jpg",
                        inStock: false,
                    } as ShopItem,
                    {
                        id: "234532",
                        title: "XX1",
                        description: "XX1",
                        priceInEuro: 299.99,
                        imgUrl: "img/worker_1.jpg",
                        inStock: true,
                        hotPrice: {
                            oldPrice: 299.99,
                            newPrice: 100.02
                        } as HotPriceDetails
                    } as ShopItem,
                    {
                        id: "234532",
                        title: "XX1",
                        description: "XX1",
                        priceInEuro: 299.99,
                        imgUrl: "img/worker_1.jpg",
                        inStock: false,
                    } as ShopItem,
                    {
                        id: "234532",
                        title: "XX1",
                        description: "XX1",
                        priceInEuro: 299.99,
                        imgUrl: "img/worker_1.jpg",
                        inStock: true,
                    } as ShopItem,
                    {
                        id: "234532",
                        title: "XX1",
                        description: "XX1",
                        priceInEuro: 299.99,
                        imgUrl: "img/worker_1.jpg",
                        inStock: true,
                        hotPrice: {
                            oldPrice: 299.99,
                            newPrice: 100.02
                        } as HotPriceDetails
                    } as ShopItem,
                ]
            } as PaginatedItemList<ShopItem>
        }
    })
}

export const useShopItemRecommendation = () => {
    return useQuery({
        queryKey: ['useShopItemRecommendation'],
        queryFn: () => {
            return {
                id: "234532",
                title: "XX1",
                description: "XX1",
                priceInEuro: 299.99,
                imgUrl: "img/worker_1.jpg",
                inStock: true,
            } as ShopItem
        }
    })
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