import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Board } from './interfaces';
import { boards as boardEntries } from '../_data/boards';

export type BoardWithState = Board & {
    focused: boolean;
    modified: boolean;
};

export const useBoards = defineStore('boards', () => {
    const boards = ref<Board[]>([]);

    const activeBoards = ref<BoardWithState[]>([]);

    async function fetchBoards(projectId: string) {
        const filteredBoards = boardEntries.filter(
            (board) => board.project_id === projectId,
        );

        boards.value = filteredBoards;

        // TODO: get board panel state from DB
        activeBoards.value = filteredBoards
            .map((b, i) => {
                return {
                    ...b,
                    focused: i === 1,
                    modified: [1, 3].includes(i),
                };
            })
            .filter((_, i) => i < 4);
    }

    function addBoard(board: BoardWithState) {
        activeBoards.value.push(board);
    }

    function removeBoard(board: BoardWithState) {
        activeBoards.value = activeBoards.value.filter(
            (b) => b.id !== board.id,
        );
    }

    function updateBoard(updatedBoard: BoardWithState) {
        activeBoards.value = activeBoards.value.map((b) => {
            return b.id === updatedBoard.id ? updatedBoard : b;
        });
    }

    return {
        boards,
        fetchBoards,
        activeBoards,
        addBoard,
        removeBoard,
        updateBoard,
    };
});
