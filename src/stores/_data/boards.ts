import { mapUuid } from '@/utils/mapper';
import type { Board } from '../boards/interfaces';
import { projects } from './projects';

export const boards: Board[] = [
    {
        name: 'Default',
        projectId: projects[0].id,
    },
    {
        name: 'Karabiner',
        projectId: projects[0].id,
    },
    {
        name: 'Dictionary',
        projectId: projects[0].id,
    },
    {
        name: 'Group',
        projectId: projects[0].id,
    },
    {
        name: 'Alternate',
        projectId: projects[0].id,
    },
].map(mapUuid);
