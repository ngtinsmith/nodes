import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IGroup } from './interfaces';

interface SidebarConfig {
    stacked: boolean;
    enabled: boolean;
}

export const useSidebar = defineStore('sidebar', () => {
    const config: SidebarConfig = {
        stacked: false,
        enabled: true,
    };
    const primaryGroup = ref<IGroup[]>([]);
    const bottomGroup = ref<IGroup[]>([]);

    return { config, primaryGroup, bottomGroup };
});
