import { defineStore } from "pinia";
export const useProductStore = defineStore("ProductStore", { // necessary but needs to be unique
    state: () => { // state central part of the store
        return {
            products: [], // something that we are storing in state in an empty global state
        }
    },
    actions: { // actions
        async fill() {
            this.products = (await import("@/data/products.json")).default; // fills the global state
        },
    },
    // getters
}) 

