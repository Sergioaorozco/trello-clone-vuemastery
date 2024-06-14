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

const boardData: Ref<Board | null> = vueRef(null);

const db = getDatabase();
const boardRef = ref(db);
onValue(boardRef, (snapshot => {
    let data = snapshot.val();
    boardData.value = data || {columns: []}
}))

export const useBoardStore = defineStore('boardStore', () => {

    let board = boardData || null


    function updateBoard(updatedInfo:object) {
        return update(ref(db), updatedInfo)
    }

    async function addTask({taskName, columnIndex} : {taskName: string, columnIndex: number}){
        const UUID = Math.random().toString(16).slice(2);
        let tasks = board.value?.columns[columnIndex].tasks ?? [];

        tasks.push({
        name: taskName,
        id: UUID,
        description: ''
        })

        const updatedData:any = {}
        updatedData[`columns/${columnIndex}/tasks`] = tasks;

        return await updateBoard(updatedData)
        .then(() => console.log('Succesfully Added'))
        .catch((e) => console.error(`The error is: ${e}`))
    }

    async function deleteTask({taskId, columnIndex} : {taskId: string, columnIndex: number}){
        if( board.value) {
            let tasks = board.value.columns[columnIndex].tasks;
            let taskFind = tasks.findIndex(item => item.id === taskId)
            const updatedData:any= {}
            if(taskFind !== -1) {
                tasks.splice(taskFind, 1)
                updatedData[`columns/${columnIndex}/tasks`] = tasks
                return await updateBoard(updatedData)
                .then(()=> console.log('Succesfully Deleted!'))
                .catch(() => console.log('Could not be found'))
            }
        }   
    }

    function updateValue({taskTitle, taskDescription, taskId, columnIndex} : {taskTitle: string, taskDescription: string, taskId: string, columnIndex: number}) {
        console.log(taskTitle, taskDescription, taskId, columnIndex)
    }

    return {
        // State
        board,
        // Actions
        addTask,
        deleteTask,
        updateValue
    }
})