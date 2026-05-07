<script setup lang="ts">
import VProgressOverview from './VProgressOverview.vue';
import VDocumentOverview from './VDocumentOverview.vue';
import type { Board } from '~/stores/boards/interfaces';

interface Props {
    board: Board;
}

const { board } = defineProps<Props>();
</script>

<template>
    <div :class="['group', { active: board.active }]">
        <div class="top">
            <div class="label">
                <Locked v-if="board.locked" />
                <span>{{ board.title }}</span>
            </div>
            <div class="flags">
                <Pinned v-if="board.pinned" />
            </div>
        </div>
        <div class="bottom">
            <VProgressOverview
                v-if="board.type === 'todo'"
                :current="board.progressCurrent"
                :total="board.progressTotal"
            />
            <VDocumentOverview
                v-if="board.type === 'document'"
                :documents="board.countDocs"
                :notes="board.countNotes"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.group {
    position: relative;
    padding: rem(16) rem(24) rem(16) rem(32);

    &.active {
        background-color: var(--transparent-white-5);

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-left: 4px solid var(--indigo-300);
        }
    }
}

.top {
    display: flex;
    justify-content: space-between;
    margin-bottom: rem(8);

    .label {
        --label-color: var(--slate-50);

        display: flex;
        align-items: center;
        gap: rem(10);

        svg {
            fill: var(--label-color);
        }

        span {
            color: var(--label-color);
            font-weight: 700;
        }
    }

    .flags {
        display: flex;
        align-items: center;

        svg {
            fill: var(--emerald-200);
        }
    }
}
</style>
