<script lang="ts" setup>
import type { IProgress } from '@/interfaces/summary/progress';
import VProgressBar from './atoms/VProgressBar.vue';
import VProgressNumbers from './atoms/VProgressNumbers.vue';

const { current, total } = defineProps<IProgress>();
</script>

<template>
    <div class="progress-overview">
        <div class="left">
            <VProgressNumbers
                :current="current"
                :total="total"
            />
        </div>
        <div class="right">
            <VProgressBar
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
