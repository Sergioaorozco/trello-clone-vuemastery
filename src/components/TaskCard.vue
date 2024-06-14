<template>
      <li class="flex justify-between bg-slate-300 rounded-md py-3 px-4 cursor-grab group hover:ring-1 ring-slate-600" draggable="true">
        <p class="truncate">{{ taskInfo.name }}</p>
        <div class="flex gap-x-2 taskInfos-center">
          <i @click="editModal" class="hidden group-hover:block cursor-pointer text-slate-600 hover:text-slate-700 size-5 transition-colors duration-200"><editIcon /></i>
          <i @click="deleteTask" class="hidden group-hover:block cursor-pointer text-slate-600 hover:text-red-600 size-5 transition-colors duration-200"><removeIcon /></i>
        </div>
      </li>
      <Dialog v-if="openModal" v-model:visible="openModal" class="w-1/3"modal :closable="true" :key="taskId" :draggable="false" >
        <template #header>
          <div class="w-full">
              <input required v-if="isEditingTask" @change="updateValue" @blur="isEditingTask = false" :value="taskInfo.name" type="text" class="w-full border-2 border-slate-500 rounded-md h-8 focus:bg-slate-100">
              <h3 v-else @click="isEditingTask = true" class="truncate">{{taskInfo.name}}</h3>
          </div>
        </template>
      </Dialog>
</template>

<script setup >
import {useBoardStore} from '../stores/BoardStore'
import { ref } from 'vue';
//Icons
import editIcon from '../icons/EditIcon.vue'
import RemoveIcon from '../icons/RemoveIcon.vue'

let openModal = ref(false);
let isEditingTask = ref(false);
let updatedTitle = ref("");
const boardStore = useBoardStore();

//Props
const props = defineProps({
  taskInfo: {
    required: true,
    type: Object
  },
  taskId: {
    required: true,
    type: String
  },
  columnIdx: {
    required : true,
    type: Number
  }
})

// Functions

function deleteTask () {
  boardStore.deleteTask({
    taskId: props.taskId,
    columnIndex: Number(props.columnIdx)
  })
}

function changeName () {
  
}

function updateValue() {
  boardStore.updateValue({
    taskTitle: updatedTitle.value,
    taskDescription: updatedDescription.value || "",
    taskId: props.taskId,
    columnIndex: Number(props.columnIdx)
  })
}

function editModal() {
  openModal.value = true
}


</script>

<style scoped></style>