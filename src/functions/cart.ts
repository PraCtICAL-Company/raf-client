import type { Cart, CartItem, ShopItem } from "../types";


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

export function addToCart(cart: Cart, item: ShopItem) {
    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].itemType.id == item.id) {
            cart.items[i].itemCount += 1;
            refreshCart(cart);
            return;
        }
    }

    cart.items.push({ itemType: item, itemCount: 1 });
    refreshCart(cart);
}

export function removeFromCartEntirely(cart: Cart, item: CartItem) {
    cart.items = cart.items.filter(
        (it) => it.itemType.id != item.itemType.id
    );

    refreshCart(cart);
}

export function removeFromCart(cart: Cart, item: ShopItem) {
    let tmp = cart.items.filter(
        (it) => it.itemType.id != item.id
    )[0];

    tmp.itemCount -= 1;

    refreshCart(cart);
}

export function refreshCart(cart: Cart) {
    cart.totalItems = totalItems(cart)
    cart.totalSum = totalPrice(cart);
}