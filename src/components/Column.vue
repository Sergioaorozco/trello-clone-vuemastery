<template>
  <div>
    <div class="bg-slate-50 rounded-md px-4 py-3 w-96 text-slate-600" :data-swapy-item="columnInd">
      <p class="font-bold">{{ columnInfo.name }}</p>
      <hr class="my-4">
      <ul class="flex flex-col gap-y-2">
        <taskCard v-for="(card) in columnInfo.tasks" :taskId="card.id" :taskInfo="card" :key="card.id" :columnIdx="columnInd"></taskCard>
        <li @click="addNewTask">
          <input v-if="isNewTask" @keyup.enter="addTask()" type="text" :autofocus="isInputVisible" @blur="isInputVisible = false" v-model="newTaskName" :class="newTaskValidation.class" class="taskVal rounded-md border py-3 px-3 w-full" :placeholder="newTaskValidation.text">
          <div v-else class=" text-slate-600 flex items-center gap-x-2 py-3 px-3 rounded-md transition-colors cursor-pointer w-full hover:bg-blue-100"> 
            <i class="inline size-5"><plusIcon /></i>Create New Task
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBoardStore} from '../stores/BoardStore'
import {ref, computed} from 'vue'

import TaskCard from './TaskCard.vue';
//Icons
import plusIcon from '../icons/PlusIcon.vue'

const boardStore = useBoardStore();

//Refs
let isInputVisible = ref(false);
let newTaskName = ref('');
let newTaskValidation = ref({
  class: 'bg-blue-100 border-blue-400 ring-blue-500 text-slate-800 placeholder-blue-800',
  text: 'Name this Task'
})

//Computed
const isNewTask = computed(() => {
  return isInputVisible.value
})

//Props
const props = defineProps({
  columnInfo: {
    type: Object,
    required: true
  },
  columnInd: {
    type:Number,
    required: true
  },
})

// Functions
function addTask() {
  if (newTaskName.value !== '') {
    try {
      boardStore.addTask({
        taskName: newTaskName.value,
        columnIndex: Number(props.columnInd)
      })
    } catch(error) {
      console.error('There was an error')
    } finally {
      newTaskName.value='';
    }
  }
}

function addNewTask() {
  setTimeout(() => {
    document.querySelector('input')?.focus();
  }, 10)

  isInputVisible.value = true;
}
</script>

<style scoped></style>