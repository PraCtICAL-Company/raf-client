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
        if (!element.itemType.inStock) {
            return;
        }
        const price = element.itemType.hotPrice ?
            element.itemType.hotPrice.newPrice
            :
            element.itemType.priceInEuro
        total += (price * element.itemCount)
    });

    return total;
}
