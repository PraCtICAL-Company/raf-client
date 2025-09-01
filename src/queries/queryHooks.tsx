import { useQuery } from "@tanstack/react-query"

const fetchCart = async () => {
    return {
        total: 0,
        itemCount: 0
    }
}

export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart
    });
}