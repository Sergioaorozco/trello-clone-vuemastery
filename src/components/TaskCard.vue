<template>
  <div class="bg-slate-50 rounded-md px-4 py-3 w-96 text-slate-600">
    <h1 class="font-bold">{{ columnTitle }}</h1>
    <hr class="my-4">
    <ul class="flex flex-col gap-y-2">
      <li v-for="(item, taskIndex) in tasks" class="bg-slate-300 rounded-md py-3 px-4 cursor-grab" draggable="true">{{ item.name }}</li>
      <li v-if="addNewTask">
        <input @keyup.enter="addTask()" type="text" autofocus="true" @blur="addNewTask = false" v-model="newTaskName" :class="newTaskValidation.class" class="rounded-md border py-3 px-3 w-full" :placeholder="newTaskValidation.text">
      </li>
      <li v-else @click.prevent="writeTask($event)" class="bg-slate-200/75 text-slate-400 py-3 px-4 rounded-md transition-colors cursor-pointer hover:bg-slate-300/75">
        + Create New Task
      </li>
    </ul>
  </div>

</template>

<script setup>

import {useBoardStore} from '../stores/BoardStore'
import {ref} from 'vue'

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
  columnId: {
    required: true,
  },
  columnIndex: {
    required: true
  },
  columnTitle: {
    required: true,
  },
  tasks: {
    required: true,
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
    //Default class Validation
    newTaskValidation.value = {
      class: 'bg-lime-100 border-lime-400 text-lime-800 placeholder-lime-800',
      text: 'Name this Task'
    }
  } else {
    newTaskValidation.value = {
      class: 'bg-red-100 border-red-400 text-red-800 placeholder-red-800',
      text: 'You have not select any name'
    }
  }
}

function writeTask (event) {
  console.log(event);
  addNewTask.value = true;
  event.preventDefault();
}


</script>

<style scoped></style>