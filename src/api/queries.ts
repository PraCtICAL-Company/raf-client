import { useQuery } from "@tanstack/react-query";
import type { ShopSearchFilters } from "../routes/shop";
import type {
  PaginatedItemList,
  ServerProduct,
  Service,
  ShopItem,
} from "../types";
import { API_PREFIX, SHOP_ITEM_PAGE_SIZE } from "../config";

export const usePrivacyPolicy = (locale: string) => {
  return useQuery({
    queryKey: ["privacy-policy"],
    queryFn: async () => {
      const response = await fetch(`/locales/${locale}/privacy-policy.txt`);
      return response.text();
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["useProjects"],
    queryFn: () => {
      return [
        {
          imageUrl: "svg/projects/_1.svg",
          text: "Wir bauen ein rs6 Sedan aus einem normalen a6",
          clickUrl: "https://google.com",
        },
        {
          imageUrl: "svg/projects/_2.svg",
          text: "Lassen sitze neu beziehen",
          clickUrl: "https://google.com",
        },
        {
          imageUrl: "svg/projects/_3.svg",
          text: "Da verbreitern wir selber die kotflügeln",
          clickUrl: "https://google.com",
        },
      ];
    },
  });
};

export const useWorkers = () => {
  return useQuery({
    queryKey: ["useWorkers"],
    queryFn: () => {
      return [
        {
          imageUrl: "img/worker_1.jpg",
          description: "S. Vettel, CEO",
        },
        {
          imageUrl: "img/worker_2.jpg",
          description: "M. Schumacher, GOAT",
        },
        {
          imageUrl: "img/worker_3.jpg",
          description: "N. Rosberg, in equal machinery",
        },
      ];
    },
  });
};

export const useServices = (page: number) => {
  return useQuery({
    queryKey: ["useServices"],
    queryFn: () => {
      return {
        totalPages: 2,
        currentPage: page,
        items: [
          {
            name: "Service 1",
            description: "description 1",
            imageUrl: "img/worker_1.jpg",
          } as Service,
          {
            name: "Service 2",
            description: "description 2",
            imageUrl: "img/worker_2.jpg",
          } as Service,
          {
            name: "Service 3",
            description: "description 3",
            imageUrl: "img/worker_3.jpg",
          } as Service,
          {
            name: "Service 4",
            description: "description 4",
            imageUrl: "img/worker_3.jpg",
          } as Service,
          {
            name: "Service 5",
            description: "description 5",
            imageUrl: "img/worker_2.jpg",
          } as Service,
        ],
      } as PaginatedItemList<Service>;
    },
  });
};

export const useSearchRecommendations = () => {
  return useQuery({
    queryKey: ["useSearchRecommendations"],
    queryFn: () => {
      return [
        "Sit amet consectetur",
        "Ex sapien vitae r",
        "Sem placerat in id",
        "Tempus leo eu aenean",
      ];
    },
  });
};

export const useBrands = (filterBrands: string[]) => {
  let indexes = [];

  const brands = [
    {
      label: "Brand 1",
      value: "123",
    } as Brand,
    {
      label: "Brand 2",
      value: "113",
    } as Brand,
    {
      label: "Brand 3",
      value: "222",
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
    queryKey: ["useBrands"],
    queryFn: () => {
      return {
        activeOptionIndexes: indexes,
        options: brands,
      };
    },
  });
};

export type Brand = {
  label: string;
  value: string;
};

export const useShopSearch = (filters: ShopSearchFilters) => {
  return useQuery({
    queryKey: ["useShopSearch", filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        page_size: SHOP_ITEM_PAGE_SIZE.toString(),
        text_query: filters.textQuery || "",
        min_price: filters.minPrice.toString(),
        max_price: filters.maxPrice.toString(),
        in_stock: filters.showInStock
          ? "true"
          : filters.showOutOfStock
            ? "false"
            : "both",
        sort_by: mapSortTypeToBackend(filters.sortBy) || "",
      });

      const res = await fetch(
        `${API_PREFIX}/products/?${queryParams.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      console.log(data);


      const items: ShopItem[] = data.items.map(
        (product: ServerProduct) => {
          return {
            id: product.id.toString(),
            title: product.name,
            description: product.description ?? "",
            priceInEuro: product.price,
            imgUrl: product.image_url ?? "/img/placeholder.jpg",
            inStock: product.in_stock,
          } as ShopItem;
        });


      return {
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        items: items,
      } as PaginatedItemList<ShopItem>;
    },
  });
};

const mapSortTypeToBackend = (sortType: string): string => {
  const mapping: { [key: string]: string } = {
    ByName: "name_asc",
    ByNameDescending: "name_desc",
    ByPrice: "price_asc",
    ByPriceDescending: "price_desc",
    ByStock: "in_stock_desc",
  };
  return mapping[sortType] || "";
};

export const useShopItemRecommendation = () => {
  return useQuery({
    queryKey: ["useShopItemRecommendation"],
    queryFn: () => {
      return {
        id: "234532",
        title: "XX1",
        description: "XX1",
        priceInEuro: 299.99,
        imgUrl: "img/worker_1.jpg",
        inStock: true,
      } as ShopItem;
    },
  });
};
