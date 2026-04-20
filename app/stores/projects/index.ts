import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './interfaces';

export const useProjects = defineStore('projects', () => {
    // State
    const projects = ref<Project[]>([]);

    // Getters

    // Actions
    function setProjects() {
        // projects.value = _projects;
    }

    return { projects, setProjects };
});
