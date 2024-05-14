<template>
  <div class="bg-slate-50 rounded-md px-4 py-3 w-96 text-slate-600">
    <h1 class="font-bold">{{ columnTitle }}</h1>
    <hr class="my-4">
    <ul class="flex flex-col gap-y-2">
      <li v-for="(item, taskIndex) in tasks" class="flex justify-between bg-slate-300 rounded-md py-3 px-4 cursor-grab group hover:ring-1 ring-slate-600" draggable="true">
        {{ item.name }}
        <div class="flex gap-x-2 items-center">
          <i @click="removeTask" class="hidden group-hover:block cursor-pointer text-slate-600 hover:text-slate-700 size-5 transition-colors duration-200"><editIcon /></i>
          <i @click="removeTask(taskIndex, item.name)" class="hidden group-hover:block cursor-pointer text-slate-600 hover:text-red-600 size-5 transition-colors duration-200"><removeIcon /></i>
        </div>
      </li>
      <li>
        <div v-if="!addNewTask" @click.self="addNewTask = true" class="bg-slate-200/75 text-slate-400 flex items-center gap-x-2 py-3 px-4 rounded-md transition-colors cursor-pointer w-full hover:bg-slate-300/75"> 
          <i class="inline size-5"><plusIcon /></i>Create New Task
        </div>
        <input v-else @keyup.enter="addTask()" type="text" autofocus="true" @blur.self="addNewTask = false" v-model="newTaskName" :class="newTaskValidation.class" class="taskVal rounded-md border py-3 px-3 w-full" :placeholder="newTaskValidation.text">
      </li>
    </ul>
  </div>

</template>

<script setup>

import {useBoardStore} from '../stores/BoardStore'
import {ref} from 'vue'
//Icons
import plusIcon from '../icons/PlusIcon.vue'
import editIcon from '../icons/EditIcon.vue'
import RemoveIcon from '../icons/RemoveIcon.vue'

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
function addTask(event) {
  if(newTaskName.value != '') {
    boardStore.addTask({
      taskName: newTaskName.value,
      columnIndex: props.columnIndex
    })
    addNewTask.value = false;
    newTaskName.value ='';
  }
}

function removeTask (name) {
  boardStore.removeTask({
    columnIndex: props.columnIndex,
    taskName: name
  })
}


</script>

<style scoped></style>