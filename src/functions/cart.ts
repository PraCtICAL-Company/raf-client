import type { Cart } from "../state/atoms";

export function totalItems(cart: Cart) {
    let total = 0;

    cart.items.forEach(element => {
        total += element.itemCount
    });

    return total;
}

export function totalPrice(cart: Cart) {
    let total = 0;

    cart.items.forEach(element => {
        total += (element.priceInEuro * element.itemCount)
    });

    return total;
}
