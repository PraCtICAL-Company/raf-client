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

export const useUser = () => {
    return useQuery({
        queryKey: ['useUser'],
        queryFn: () => {
            const user: User = {
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
                    }
                ]
            };

            return user;
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