import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Board } from './interfaces';

export const useBoards = defineStore('boards', () => {
    // State
    const cards = ref<Board[]>([]);

    // Getters

    // Actions
    function setBoards() {
        cards.value = [];
    }

    return { cards, setBoards };
});
