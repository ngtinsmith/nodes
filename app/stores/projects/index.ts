import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './interfaces';
import { useNodes } from '../nodes';
import { useSections } from '../sections';
import { useTags } from '../tags';
import { useBoards } from '../boards';
import { useCards } from '../cards';
import { projects as projectEntries } from '~/stores/_data/projects';

export const useProjects = defineStore('projects', () => {
    // State
    const projects = ref<Project[]>([]);

    const activeProject = computed(() => projects.value.find((p) => p.active));

    const activeProjectId = computed(() => activeProject.value?.id || '0');

    // Actions
    async function loadProjects() {
        const sectionStore = useSections();
        const tagStore = useTags();
        const boardStore = useBoards();
        const cardStore = useCards();
        const nodeStore = useNodes();

        projects.value = projectEntries;
        const activeId = activeProject.value?.id;

        if (!activeId) {
            console.warn('Invalid project');
            return;
        }

        await sectionStore.fetchSections(activeId);
        await tagStore.fetchSectionTags();
        await boardStore.fetchBoards(activeId);
        await cardStore.fetchCards(activeId);
        await nodeStore.fetchNodes(activeId);
    }

    return { projects, activeProject, activeProjectId, loadProjects };
});
