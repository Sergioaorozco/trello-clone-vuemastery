<script setup lang="ts">
import Column from './components/Column.vue';
import { onUpdated , ref, nextTick } from 'vue';
import { useBoardStore } from '../src/stores/BoardStore.ts'
import { createSwapy } from 'swapy';

const boardStore = useBoardStore();
const swapyContainer = ref()

onUpdated (() => {
  nextTick(()=>{
    if (swapyContainer) {
      createSwapy(swapyContainer.value, {
        animation: 'dynamic',
      });
    }
  });
})

</script>

<template>
  <div class="bg-stone-900 h-14 mb-3"></div>
  <main ref="swapyContainer" class="flex gap-x-4 px-4 swapyContainer">
    <Column v-for="(column, columnIdx) in boardStore.board?.columns" :key="Column.id" :columnInfo="column"
      :columnInd="Number(columnIdx)" :data-swapy-slot="column.name" class="cursor-grab select-none bg-black/40 h-fit rounded-lg" />
  </main>
</template>

<style scoped>

</style>
