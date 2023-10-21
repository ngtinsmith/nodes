<script lang="ts" setup>
import type { IProgress } from '@/interfaces/summary/progress';
import { computed } from 'vue';

const { current, total } = defineProps<IProgress>();
const progressPercentage = computed(() => Math.round((current / total) * 100));
const progressPercentageStyle = computed(() => `${progressPercentage.value}%`);
</script>

<template>
    <div class="progress-percentage">
        <div class="bg">
            <div class="fg" />
        </div>
        <span>{{ progressPercentage }}%</span>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';

.progress-percentage {
    display: flex;
    align-items: center;
    gap: rem(12);

    .bg {
        $bg-height: 6;

        width: rem(80);
        height: rem($bg-height);
        border-radius: rem(math.div($bg-height, 2));
        background-color: var(--v-transparent-white-8);
        overflow: hidden;
    }

    .fg {
        width: v-bind(progressPercentageStyle);
        height: 100%;
        background-color: var(--v-emerald-500);
    }

    span {
        font-size: rem(12);
        color: var(--v-gray-400);
    }
}
</style>
