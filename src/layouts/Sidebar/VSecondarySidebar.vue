<script setup lang="ts">
import VGroupItem from '@/components/VGroupItem.vue';
import VSearch from '@/components/VSearch.vue';
import { useSummary } from '@/stores/summary';
import { onMounted } from 'vue';

const summaryStore = useSummary();

onMounted(() => {
    summaryStore.fetchSummary();
});
</script>

<template>
    <div class="v-sidebar-2">
        <div class="top">
            <VSearch context="group" />
        </div>
        <div class="views">
            <VGroupItem
                v-for="summary in summaryStore.summaries"
                :key="summary.id"
                :summary="summary"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.v-sidebar-2 {
    display: flex;
    flex-direction: column;
    min-width: 320px;
    height: 100%;
    background-color: var(--v-gray-900);
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
