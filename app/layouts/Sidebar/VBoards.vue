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
        <div class="controls">
            <button class="btn-add">
                <AddFilled />
                <span>New</span>
            </button>
            <button class="btn-filter">
                <SortDescending />
            </button>
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
    background-color: var(--slate-900);
}

.top {
    height: rem(48);
    width: 100%;
    color: black;
}

.controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: rem(48);
    padding-left: rem(20);
    padding-right: rem(16);
    border-top: 1px solid var(--resizable-border-color);
    border-bottom: 1px solid var(--resizable-border-color);
}

.btn-add {
    display: flex;
    align-items: center;
    gap: rem(8);
    padding: rem(4) rem(12);
    border-radius: rem(4);

    &:hover {
        background-color: var(--transparent-white-10);
    }

    span {
        color: var(--slate-50);
        font-size: rem(14);
    }

    svg {
        fill: var(--emerald-300);
    }
}

.btn-filter {
    display: flex;
    align-items: center;
    padding: rem(4);
    border-radius: rem(4);

    &:hover {
        background-color: var(--transparent-white-10);
    }

    svg {
        fill: var(--slate-50);
    }
}

.views {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
</style>
