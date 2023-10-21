import { ref } from 'vue';
import { defineStore } from 'pinia';
import { summaries as srs } from './data/summary';
import type { TSummary } from './interfaces';

export const useSummary = defineStore('summary', () => {
    const summaries = ref<TSummary[]>([]);

    async function fetchSummary() {
        summaries.value = srs;
    }

    return { summaries, fetchSummary };
});
