import { useMutation } from "@tanstack/react-query";
import type { ContactMessage, Order, User, UserAddress } from "../types";
import { API_PREFIX, DEFAULT_JSON_HEADERS } from "../config";

export const useOrderFromCart = () => {
    return useMutation({
        mutationKey: ["orderFromCart"],
        mutationFn: async ({ order }: {
            order: Order;
        }) => {
            const res: Response = await fetch(`${API_PREFIX}/...`, {
                method: 'POST',
                headers: DEFAULT_JSON_HEADERS,
                body: JSON.stringify(order)
            });

            if (!res.ok) {
                let errorMessage = "Failed to order";
                const data = await res.json();

                if (data?.message) {
                    errorMessage += `: ${data.message}`
                }

                throw new Error(errorMessage);
            }
        }
    })
}


export const useAddAddress = () => {
    return useMutation({
        mutationKey: ["addAddress"],
        mutationFn: async ({ address, user }:
            {
                address: UserAddress;
                user: User
            }) => {
            const res: Response = await fetch(`${API_PREFIX}/...`, {
                method: 'PATCH',
                headers: DEFAULT_JSON_HEADERS,
                body: JSON.stringify({ address, user })
            });

            if (!res.ok) {
                let errorMessage = "Failed to add address";
                const data = await res.json();

                if (data?.message) {
                    errorMessage += `: ${data.message}`
                }

                throw new Error(errorMessage);
            }
        }
    })
}

export const useEditAddress = () => {
    return useMutation({
        mutationKey: ["editAddress"],
        mutationFn: async ({ address, user }:
            {
                address: UserAddress;
                user: User
            }) => {
            const res: Response = await fetch(`${API_PREFIX}/...`, {
                method: 'PATCH',
                headers: DEFAULT_JSON_HEADERS,
                body: JSON.stringify({ address, user })
            });

            if (!res.ok) {
                let errorMessage = "Failed to edit address";
                const data = await res.json();

                if (data?.message) {
                    errorMessage += `: ${data.message}`
                }

                throw new Error(errorMessage);
            }
        }
    })
}

export const useDeleteAddress = () => {
    return useMutation({
        mutationKey: ["deleteAddress"],
        mutationFn: async ({ address, user }:
            {
                address: UserAddress;
                user: User
            }) => {
            const res: Response = await fetch(`${API_PREFIX}/...`, {
                method: 'DELETE',
                headers: DEFAULT_JSON_HEADERS,
                body: JSON.stringify({ address, user })
            });

            if (!res.ok) {
                let errorMessage = "Failed to delete address";
                const data = await res.json();

                if (data?.message) {
                    errorMessage += `: ${data.message}`
                }

                throw new Error(errorMessage);
            }
        }
    })
}

export const useSendMessage = () => {
    return useMutation({
        mutationKey: ["sendMessage"],
        mutationFn: async ({ message }:
            {
                message: ContactMessage
            }) => {
            const res: Response = await fetch(`${API_PREFIX}/...`, {
                method: 'POST',
                headers: DEFAULT_JSON_HEADERS,
                body: JSON.stringify({ message })
            });

            if (!res.ok) {
                let errorMessage = "Failed to send message";
                const data = await res.json();

                if (data?.message) {
                    errorMessage += `: ${data.message}`
                }

                throw new Error(errorMessage);
            }
        }
    })
}