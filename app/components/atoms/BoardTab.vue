<script setup lang="ts">
import type { BoardWithState } from '~/stores/boards';

interface Props {
    board: BoardWithState;
}

defineProps<Props>();
</script>

<template>
    <div
        :class="[
            'board-tab',
            {
                focused: board.focused,
                modified: board.modified,
            },
        ]"
    >
        <div class="label">
            <DotMarkSmall
                v-if="board.modified"
                class="i-modified"
            />
            <span>
                {{ board.title }}
            </span>
        </div>
        <button class="btn-close">
            <Close class="i-close" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.board-tab {
    display: flex;
    align-items: center;
    gap: rem(8);
    border-left: 1px solid var(--resizable-border-color);
    height: 100%;
    padding-inline: rem(16) rem(12);

    &.modified.focused {
        .i-modified {
            fill: var(--yellow-100);
        }
    }

    &.focused {
        background-color: var(--slate-950);

        .label {
            color: var(--slate-50);
        }

        .i-close {
            fill: var(--slate-50);
        }
    }
}

.label {
    display: flex;
    align-items: center;
    gap: rem(4);

    span {
        /* Manually align to other icons */
        padding-bottom: rem(2);
    }
}

svg {
    fill: var(--slate-400);
}

.btn-close {
    display: flex;

    &:hover {
        background-color: var(--transparent-white-10);
    }
}
</style>
