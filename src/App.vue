<script setup lang="ts">
import { useBoardStore } from '../src/stores/BoardStore.ts'
import TaskCard from './components/TaskCard.vue';
import Column from './components/Column.vue';

const boardStore = useBoardStore();

</script>

<template>
<main>
  <div class="bg-stone-900 h-14 mb-3"></div>
  <section class="flex gap-x-4 px-4">
    <div v-for="(column, columnIdx) in boardStore.board.columns">
        <Column :key="column.id" :columnInfo="column" :columnIndex="columnIdx" />
    </div>
  </section>
</main>

</template>

<style scoped>

</style>
