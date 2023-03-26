<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from '@/stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
import {storeToRefs} from 'pinia'
const productStore = useProductStore();
const cartStore = useCartStore();
// const {products} = storeToRefs(useProductStore()); //destructed version
productStore.fill();
//// the addToCart method is no longer in use since we added an action to CartStore to do this logic for us
//// with benefit of no needed patch or separate items in timeline - addItems start and addItems end 
// const addToCart = (count, product)=> {
//   count = parseInt(count)
//     for(let index= 0;index < count;index++){
//     state.items.push(product)  
//     }
//   //// patch to combine the items together
//   // cartStore.$patch(state=> {
//   //   for(let index= 0;index < count;index++){
//   //   state.items.push(product)
//   //   }
//   // })
// // }
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
<!-- @addToCart="addToCart($event, product)" when either using patch or simple for loop -->