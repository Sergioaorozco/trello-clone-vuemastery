import { defineStore } from "pinia";
import { ref as vueRef, Ref } from "vue";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDfOWhsyYBTYqj0dkqlkQnUYc_ImfnMwmY",
    authDomain: "trellvue.firebaseapp.com",
    projectId: "trellvue",
    storageBucket: "trellvue.appspot.com",
    messagingSenderId: "539740201723",
    appId: "1:539740201723:web:f79ae1b28271dc0488065e",
    measurementId: "G-XF95R53X33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

interface Board {
    columns: Column[];
}

interface Column {
    id: string,
    name: string,
    tasks: Task[];
}

interface Task {
    name: string,
    id: string,
    description?: string
}


const boardData: Ref<Board|null> = vueRef(null);

const db = getDatabase();
const boardRef = ref(db);
onValue(boardRef, (snapshot => {
    let data = snapshot.val();
    boardData.value = data
}))

export const useBoardStore = defineStore('boardStore', () => {

    let board = (boardData)

    function addTask({taskName, columnIndex} : {taskName: string, columnIndex: number}){
        const UUID = Math.random().toString(16).slice(2);
        board.value?.columns[columnIndex].tasks.push({
            name: taskName,
            id: UUID,
            description: ''
        })
    }

    function deleteTask({taskId} : {taskId: string}){
        if( board.value) {
            for (const column of board.value.columns) {
                const taskIndex = column.tasks.findIndex(task => task.id === taskId)
                if (taskIndex !== -1) {
                    column.tasks.splice(taskIndex, 1)
                    return
                }
            }
        }
    }

    return {
        // State
        board,
        // Actions
        addTask,
        deleteTask
    }
})