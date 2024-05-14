<script setup>
import { useBoardStore } from '../src/stores/BoardStore.ts'
import TaskCard from './components/TaskCard.vue';

const boardStore = useBoardStore();

</script>

<template>
<main>
  <div class="bg-stone-900 h-14 mb-3"></div>
  <section class="flex gap-x-4 px-4">
    <div v-for="(column, columnIdx) in boardStore.board.columns">
        <TaskCard :key="column.id" :columnIndex="columnIdx" :columnId="column.id" :columnTitle="column.name" :tasks="column.tasks" />
    </div>
  </section>
</main>

</template>

<style scoped>

</style>
