// state/errorHandler.ts
import { getDefaultStore } from "jotai";
import { errorAtom } from "./state/atoms";

const store = getDefaultStore();

export const handleGlobalError = (error: unknown) => {
    const message =
        error instanceof Error
            ? error.message
            : typeof error === "string"
                ? error
                : "Unknown error";

    console.error("Global error caught:", message);

    store.set(errorAtom, (error as Error).message);
};
