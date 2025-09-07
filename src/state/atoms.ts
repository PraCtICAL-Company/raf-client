import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

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
                id: 1,
                title: "XX1",
                description: "XX1",
                priceInEuro: 299.99,
                imgUrl: "img/worker_1.jpg"
            },
            {
                itemCount: 2,
                id: 2,
                title: "XX2",
                description: "XX2",
                priceInEuro: 399.99,
                imgUrl: "img/worker_2.jpg"
            },
            {
                itemCount: 3,
                id: 3,
                title: "XX3",
                description: "XX3",
                priceInEuro: 99.99,
                imgUrl: "img/worker_3.jpg"
            }
        ],
    },
    undefined,
    { getOnInit: true }
);

export type Cart = {
    items: CartItem[]
}

export type CartItem = {
    itemCount: number,
    id: number,
    title: string,
    description: string,
    priceInEuro: number,
    imgUrl: string
}