import { defineStore } from "pinia";

import boardData from '../data/board.json'

export const useBoardStore = defineStore('boardStore', () => {
    const board = boardData

    function addTask({taskName, columnIndex}){
        const UUID = Math.random().toString(16).slice(2);
        board.columns[columnIndex].tasks.push({
            name: taskName,
            id: UUID,
            description: ''
        })
    }

    return {
        // State
        board,
        // Actions
        addTask
    }
})