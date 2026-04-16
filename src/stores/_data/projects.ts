import type { Project } from '../projects/interfaces';
import { tags } from './tags';

export const projects: Project[] = [
    {
        id: '1',
        name: 'Sector',
        tagId: tags[0].id,
    },
    {
        id: '2',
        name: 'Depth',
        tagId: tags[0].id,
    },
    {
        id: '3',
        name: 'Overflow',
        tagId: tags[0].id,
    },
    {
        id: '4',
        name: 'Immense',
        tagId: tags[1].id,
    },
    {
        id: '5',
        name: 'Centaur',
        tagId: tags[1].id,
    },
    {
        id: '6',
        name: 'Pollux',
        tagId: tags[2].id,
    },
];
