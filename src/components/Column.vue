<template>
  <div class="bg-slate-50 rounded-md px-4 py-3 w-96 text-slate-600">
    <h1 class="font-bold">{{ columnInfo.name }}</h1>
    <hr class="my-4">
    <ul class="flex flex-col gap-y-2">
      <taskCard v-for="(card) in columnInfo.tasks" :taskId="card.id" :taskInfo="card" :key="card.id"></taskCard>
      <li>
        <div v-if="!addNewTask" @click.self="addNewTask = true" class="bg-slate-200/75 text-slate-400 flex items-center gap-x-2 py-3 px-4 rounded-md transition-colors cursor-pointer w-full hover:bg-slate-300/75"> 
          <i class="inline size-5"><plusIcon /></i>Create New Task
        </div>
        <input v-else @keyup.enter="addTask()" type="text" autofocus="true" @blur.self="addNewTask = false" v-model="newTaskName" :class="newTaskValidation.class" class="taskVal rounded-md border py-3 px-3 w-full" :placeholder="newTaskValidation.text">
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useBoardStore} from '../stores/BoardStore'
import TaskCard from './TaskCard.vue';
import {ref} from 'vue'
//Icons
import plusIcon from '../icons/PlusIcon.vue'

const boardStore = useBoardStore();

//Refs
let addNewTask = ref(false);
let newTaskName = ref('');
let newTaskValidation = ref({
  class: 'bg-lime-100 border-lime-400 text-lime-800 placeholder-lime-800',
  text: 'Name this Task'
})

//Props
const props = defineProps({
  columnInfo: {
    type: Object,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  }
})

// Functions
function addTask() {
  if(newTaskName.value != '') {
    boardStore.addTask({
      taskName: newTaskName.value,
      columnIndex: props.columnIndex
    })
    addNewTask.value = false;
    newTaskName.value ='';
  }
}
</script>

<style scoped></style>