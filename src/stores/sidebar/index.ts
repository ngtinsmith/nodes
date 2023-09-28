import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IGroup } from './interfaces';
import { bottomGroup as bottom, primaryGroup as primary } from './data/groups';

export const useSidebar = defineStore('sidebar', () => {
    const primaryGroup = ref<IGroup[]>([]);
    const bottomGroup = ref<IGroup[]>([]);

    async function fetchGroups() {
        primaryGroup.value = primary;
        bottomGroup.value = bottom;
    }

    return { primaryGroup, bottomGroup, fetchGroups };
});
