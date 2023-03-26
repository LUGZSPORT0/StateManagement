import { defineStore } from "pinia";
export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        }
    },
    getters: {
        count: (state) => state.items.length,
        // count() {
        //     return this.items.length
        // },
        isEmpty: (state) => state.count === 0,
        // isEmpty(){
        //     return this.count === 0
        // }
    },
    actions: {
        addItems(count, item) {
            count = parseInt(count);
            for(let index= 0;index < count;index++){
                this.items.push({...item}) // spread item into its own object,effectively cloning it
            }
        }
    }
});