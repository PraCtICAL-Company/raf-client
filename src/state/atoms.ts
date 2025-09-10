import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'
import { atomWithQuery } from 'jotai-tanstack-query'
import type { Cart, HotPriceDetails, ShopItem, User, UserAddress } from '../types';

export const errorAtom = atom<string | null>(null);

export const userAtom = atomWithQuery(() => ({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> => {
        return {
            username: "aboba",
            email: "raf.gmbh@raf.com",
            phone: "+49 176 29187440",
            addresses: [
                {
                    id: 12345,
                    city: "XXXX",
                    street: "XXXX",
                    building: 2,
                    floor: 3,
                    apartment: 45,
                    entrance: 1,
                } as UserAddress
            ]
        } as User
    }
}));

export const localeAtom = atomWithStorage('locale', 'de', undefined, { getOnInit: true });

export const supportedLocalesAtom = atom([
    {
        name: 'en',
        iconFilename: 'png/uk_flag.png'
    },
    {
        name: 'de',
        iconFilename: 'svg/flags/germany.svg'
    },
]);

export const cartAtom = atomWithStorage<Cart>(
    'cart',
    {
        items: [
            {
                itemCount: 1,
                itemType: {
                    id: "2346",
                    title: "XX1",
                    description: "XX1",
                    priceInEuro: 299.99,
                    imgUrl: "img/worker_1.jpg",
                    inStock: true,
                } as ShopItem

            },
            {
                itemCount: 1,
                itemType: {
                    id: "223",
                    title: "XX2",
                    description: "XX2",
                    priceInEuro: 59.99,
                    imgUrl: "img/worker_2.jpg",
                    inStock: true,
                } as ShopItem

            },
            {
                itemCount: 1,
                itemType: {
                    id: "5246",
                    title: "XX3",
                    description: "XX3",
                    priceInEuro: 99.99,
                    imgUrl: "img/worker_3.jpg",
                    inStock: false,
                    hotPrice: {
                        oldPrice: 299.99,
                        newPrice: 100.02
                    } as HotPriceDetails
                } as ShopItem

            },
        ],
    },
    undefined,
    { getOnInit: true }
);