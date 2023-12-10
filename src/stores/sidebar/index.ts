import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IGroup } from './interfaces';
import { bottomGroup as bottom, primaryGroup as primary } from './data/groups';

interface SidebarConfig {
    stacked: boolean;
}

export const useSidebar = defineStore('sidebar', () => {
    const config: SidebarConfig = {
        stacked: true,
    };
    const primaryGroup = ref<IGroup[]>([]);
    const bottomGroup = ref<IGroup[]>([]);

    async function fetchGroups() {
        primaryGroup.value = primary;
        bottomGroup.value = bottom;
    }

    return { config, primaryGroup, bottomGroup, fetchGroups };
});
