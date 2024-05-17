import { defineStore } from "pinia";
import { ref as vueRef, Ref } from "vue";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";

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

const boardData: Ref<Board|null> = vueRef(null);

const db = getDatabase();
const boardRef = ref(db);
onValue(boardRef, (snapshot => {
    let data = snapshot.val();
    boardData.value = data
}))

export const useBoardStore = defineStore('boardStore', () => {

    let board = boardData || null

    function updateBoard(updatedInfo:Object) {
        return update(ref(db), updatedInfo)
    }

    async function addTask({taskName, columnIndex} : {taskName: string, columnIndex: number}){
        if(!board.value?.columns[columnIndex].tasks) {
            board.value.columns[columnIndex].tasks = [];
        }
        const UUID = Math.random().toString(16).slice(2);
        board.value?.columns[columnIndex].tasks.push({
            name: taskName,
            id: UUID,
            description: ''
        })
        const updatedData:any = {}
        updatedData[`columns/${columnIndex}/tasks`] = board.value?.columns[columnIndex].tasks;

        return await updateBoard(updatedData)
        .then(() => console.log('Succesfully Added'))
        .catch((e) => console.error(`The error is: ${e}`))
    }

    function deleteTask({taskId, columnIndex} : {taskId: String, columnIndex: string}){
        if( board.value) {
            for (const column of board?.value.columns) {
                const taskIndex = column.tasks.findIndex(task => task.id === taskId)
                if (taskIndex !== -1) {
                    console.log(column);
                    column.tasks.splice(taskIndex, 1);

                    const updatedData:any = {}
                    updatedData[`columns/${columnIndex}/tasks`] = board.value?.columns[columnIndex].tasks

                    return updateBoard(updatedData)
                    .then(() => {console.log('successfully Removed')})
                    .catch((e) => console.error(`The error is: ${e}`))
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