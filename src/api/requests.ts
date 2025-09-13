import { useMutation } from "@tanstack/react-query";
import type { ContactMessage, Order, UserAddress } from "../types";
import { API_PREFIX, DEFAULT_JSON_HEADERS } from "../config";
import axios from "axios";

export const useOrderFromCart = () => {
  return useMutation({
    mutationKey: ["orderFromCart"],
    mutationFn: async ({ order }: { order: Order }) => {
      const res: Response = await fetch(`${API_PREFIX}/...`, {
        method: "POST",
        headers: DEFAULT_JSON_HEADERS,
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        let errorMessage = "Failed to order";
        const data = await res.json();

        if (data?.message) {
          errorMessage += `: ${data.message}`;
        }

        throw new Error(errorMessage);
      }
    },
  });
};

export const useAddAddress = () => {
  return useMutation({
    mutationKey: ["addAddress"],
    mutationFn: async ({ address }: { address: UserAddress }) => {
      console.log(address);
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        throw new Error("User ID not found in localStorage");
      }

      try {
        await axios.post(`${API_PREFIX}/addresses/${user_id}`, address, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch (error: any) {
        let errorMessage = "Failed to add address";
        if (error.response?.data?.message) {
          errorMessage += `: ${error.response.data.message}`;
        }
        throw new Error(errorMessage);
      }
    },
  });
};

export const useEditAddress = () => {
  return useMutation({
    mutationKey: ["editAddress"],
    mutationFn: async ({ address }: { address: UserAddress }) => {
      const token = localStorage.getItem("access_token");
      console.log(address);

      try {
        await axios.put(`${API_PREFIX}/addresses/${address.id}`, address, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch (err: any) {
        let errorMessage = "Failed to edit address";
        if (err.response?.data?.message) {
          errorMessage += `: ${err.response.data.message}`;
        }
        throw new Error(errorMessage);
      }
    },
  });
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationKey: ["deleteAddress"],
    mutationFn: async ({ address }: { address: UserAddress }) => {
      const token = localStorage.getItem("access_token");

      try {
        await axios.delete(`${API_PREFIX}/addresses/${address.id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch (err: any) {
        let errorMessage = "Failed to delete address";
        if (err.response?.data?.message) {
          errorMessage += `: ${err.response.data.message}`;
        }
        throw new Error(errorMessage);
      }
    },
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async ({ message }: { message: ContactMessage }) => {
      const res: Response = await fetch(`${API_PREFIX}/...`, {
        method: "POST",
        headers: DEFAULT_JSON_HEADERS,
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        let errorMessage = "Failed to send message";
        const data = await res.json();

        if (data?.message) {
          errorMessage += `: ${data.message}`;
        }

        throw new Error(errorMessage);
      }
    },
  });
};
