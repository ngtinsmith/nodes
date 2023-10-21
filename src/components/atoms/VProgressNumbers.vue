<script lang="ts" setup>
import type { IProgress } from '@/interfaces/summary/progress';
import Check from '/public/assets/icons/check.svg?component';

defineProps<IProgress>();
</script>

<template>
    <div class="progress-numbers">
        <Check />
        <span>{{ current }} / {{ total }}</span>
    </div>
</template>

<style lang="scss" scoped>
.progress-numbers {
    display: flex;
    align-items: center;
    gap: rem(4);

    svg {
        fill: var(--v-emerald-200);
    }

    span {
        font-size: rem(12);
        color: var(--v-gray-400);
    }
}
</style>
