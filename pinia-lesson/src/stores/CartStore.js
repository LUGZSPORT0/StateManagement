import { defineStore } from "pinia";
import { groupBy, sumBy, sum } from "lodash";
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
        // https://lodash.com/docs/4.17.15#sumBy    
        total_3: (state) => sumBy(state.items, 'price'),
        total_2: (state) => sumBy(state.items, function(sum) {return sum.price;}),
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        total: state => state.items.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0),
        isEmpty: (state) => state.count === 0,
        // isEmpty(){
        //     return this.count === 0
        // }
        grouped: (state) => groupBy(state.items, item => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        cartSum: (state) => (price) => state.items[price]
    },
    actions: { // actions are about mutating global states not getting them
        addItems(count, item) {
            let totalPrice = 0
            count = parseInt(count);
            for(let index= 0;index < count;index++){
                this.items.push({...item}) // spread item into its own object,effectively cloning it
            }
        }, 
        removeItem(itemName) {
            this.items = this.items.filter((item) => item.name != itemName)
        }
    }
});