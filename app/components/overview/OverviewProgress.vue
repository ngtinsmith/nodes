<script lang="ts" setup>
import type { IProgress } from '~/types/summary/progress';
import ProgressNumbers from '../atoms/ProgressNumbers.vue';
import ProgressBar from '../atoms/ProgressBar.vue';

const { current, total } = defineProps<IProgress>();
</script>

<template>
    <div class="progress-overview">
        <div class="left">
            <ProgressNumbers
                :current="current"
                :total="total"
            />
        </div>
        <div class="right">
            <ProgressBar
                :current="current"
                :total="total"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.progress-overview {
    display: flex;
    justify-content: space-between;
}
</style>
