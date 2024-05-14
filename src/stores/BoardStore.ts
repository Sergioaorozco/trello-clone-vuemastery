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

    function deleteTask({taskId} : {taskId: string}){
        for (const column of board.columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1)
                return
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