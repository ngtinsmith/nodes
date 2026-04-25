<script setup lang="ts">
import VBoard from '~/components/VBoard.vue';
import VSearch from '~/components/VSearch.vue';
import { useBoards } from '~/stores/boards';

const boardStore = useBoards();
</script>

<template>
    <div class="board">
        <div class="top">
            <VSearch context="group" />
        </div>
        <div class="views">
            <VBoard
                v-for="board in boardStore.boards"
                :key="board.id"
                :board="board"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.board {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--gray-900);
}

.top {
    height: rem(48);
    width: 100%;
    color: black;
}

.views {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
</style>
