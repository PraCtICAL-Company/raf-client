import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import type { CartItem } from "../types";

export default function CartItemQuantityInput({ onChange, cartItem, min, max }:
    { onChange: (newValue: number) => void; cartItem: CartItem; min: number; max: number }
) {
    const [value, setValue] = useState(cartItem)
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(value.itemCount)
    }, [])

    const mutateValue = (extent: number) => {

        const oldValue = value;

        oldValue.itemCount += extent;

        if (oldValue.itemCount < min
        ) {
            oldValue.itemCount = min;
        } else if (oldValue.itemCount > max) {
            oldValue.itemCount = max;
        }

        setValue(oldValue);
        setCount(oldValue.itemCount);

        if (extent < 0) {
            onChange(-1);
        } else {
            onChange(1);
        }


    }

    return (
        <div className="flex items-center gap-x-2 w-fit">
            <div className="cursor-pointer" onClick={() => mutateValue(-1)}>
                <MinusIcon className="size-5" />
            </div>
            <div className="h-[40px] w-[55px] flex items-center justify-center border-[2px] border-(--foreground) rounded-xl">
                {
                    count
                }
            </div>
            <div className="cursor-pointer" onClick={() => mutateValue(1)}>
                <PlusIcon className="size-5" />
            </div>
        </div>
    );
}