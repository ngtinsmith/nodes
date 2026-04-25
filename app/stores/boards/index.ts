import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Board } from './interfaces';
import { boards as boardEntries } from '../_data/boards';

export const useBoards = defineStore('boards', () => {
    const boards = ref<Board[]>([]);

    async function fetchBoards(projectId: string) {
        boards.value = boardEntries.filter(
            (board) => board.project_id === projectId,
        );
    }

    return { boards, fetchBoards };
});
