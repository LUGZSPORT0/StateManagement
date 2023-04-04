import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy, sumBy, sum } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";
export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
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
        grouped: (state) => {
            const grouped = groupBy(state.items, (item) => item.name)
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach((key => inOrder[key] = grouped[key]));
            return inOrder;
        },
        groupCount: (state) => (name) => state.grouped[name].length,
    },
    actions: { // actions are about mutating global states not getting them
        checkout() {
            const authUserStore = useAuthUserStore();
            alert(
                `${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`)
        },
        addItems(count, item) {
            count = parseInt(count);
            for(let index= 0;index < count;index++){
                this.items.push({...item}) // spread item into its own object,effectively cloning it
            }
        }, 
        removeItem(itemName) {
            this.items = this.items.filter((item) => item.name != itemName)
        },
        setItemCount(item, count){
            this.removeItem(item.name)
            this.addItems(count, item)
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}