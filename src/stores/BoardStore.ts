import { defineStore } from "pinia";

import boardData from '../data/board.json'

export const useBoardStore = defineStore('boardStore', () => {
    const board = boardData

    function addTask({taskName, columnIndex} : {taskName: string, columnIndex: number}){
        const UUID = Math.random().toString(16).slice(2);
        board.columns[columnIndex].tasks.push({
            name: taskName,
            id: UUID,
            description: ''
        })
    }

    function removeTask({taskName, columnIndex} : {taskName: string, columnIndex: number}){
        board.columns[columnIndex].tasks.splice(taskName, 1)
    }

    return {
        // State
        board,
        // Actions
        addTask,
        removeTask
    }
})