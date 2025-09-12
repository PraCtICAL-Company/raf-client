import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";
import type {
  Cart,
  HotPriceDetails,
  ShopItem,
  User,
  UserAddress,
} from "../types";
import axios from "axios";

export const errorAtom = atom<string | null>(null);

export const userAtom = atomWithQuery(() => ({
  queryKey: ["userWithAddresses"],
  queryFn: async (): Promise<{
    user: User | null;
    addresses: UserAddress[];
  }> => {
    try {
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        return { user: null, addresses: [] };
      }

      const userResponse = await axios.get<User>(
        `http://127.0.0.1:8000/api/users/${user_id}`,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const addressesResponse = await axios.get<UserAddress[]>(
        `http://127.0.0.1:8000/api/addresses/user/${user_id}`,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      console.log(addressesResponse.data);

      return {
        user: userResponse.data,
        addresses: addressesResponse.data,
      };
    } catch (error) {
      console.error("Failed to fetch user or addresses:", error);
      return { user: null, addresses: [] };
    }
  },
}));

export const localeAtom = atomWithStorage("locale", "de", undefined, {
  getOnInit: true,
});

export const supportedLocalesAtom = atom([
  {
    name: "en",
    iconFilename: "png/uk_flag.png",
  },
  {
    name: "de",
    iconFilename: "svg/flags/germany.svg",
  },
]);

export const cartAtom = atomWithStorage<Cart>(
  "cart",
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
        } as ShopItem,
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
        } as ShopItem,
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
            newPrice: 100.02,
          } as HotPriceDetails,
        } as ShopItem,
      },
    ],
  },
  undefined,
  { getOnInit: true }
);
