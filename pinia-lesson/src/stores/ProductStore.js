import { defineStore } from "pinia";
import products from '@/data/products.json'
export const useProductStore = defineStore("ProductStore", { // necessary but needs to be unique
    state: () => { // state central part of the store
        return {
            products, // something that we are storing in state
        }
    }
    // actions
    // getters
}) 

