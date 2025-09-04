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