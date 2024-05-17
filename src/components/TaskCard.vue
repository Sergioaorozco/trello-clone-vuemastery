<template>
      <li class="flex justify-between bg-slate-300 rounded-md py-3 px-4 cursor-grab group hover:ring-1 ring-slate-600" draggable="true">
        {{ taskInfo.name }}
        <div class="flex gap-x-2 taskInfos-center">
          <i class="hidden group-hover:block cursor-pointer text-slate-600 hover:text-slate-700 size-5 transition-colors duration-200"><editIcon /></i>
          <i @click="deleteTask" class="hidden group-hover:block cursor-pointer text-slate-600 hover:text-red-600 size-5 transition-colors duration-200"><removeIcon /></i>
        </div>
      </li>
</template>

<script setup >
import {useBoardStore} from '../stores/BoardStore'
//Icons
import editIcon from '../icons/EditIcon.vue'
import RemoveIcon from '../icons/RemoveIcon.vue'

const boardStore = useBoardStore();

//Props
const props = defineProps({
  taskInfo: {
    required: true,
    type: String
  },
  taskId: {
    required: true,
    type: String
  }
})

// Functions

function deleteTask () {
  boardStore.deleteTask({
    taskId: props.taskId,
  })
}


</script>

<style scoped></style>