import axios from "axios";
import type { ShopItem } from "../types";

export const addToCart_Service = async (item: ShopItem): Promise<void> => {
  try {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("access_token");

    if (!user_id) {
      throw new Error("User ID not found in localStorage");
    }

    const response = await axios.post(
      `http://127.0.0.1:8000/api/cart/${user_id}/add?product_id=${item.id}&quantity=1`,
      {}, // Пустое тело запроса
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    console.log("Item added to cart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};
