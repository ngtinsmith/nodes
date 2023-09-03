import type { RawNode } from '../interfaces';

export const nodes: RawNode[] = [
    {
        id: '1',
        parent_id: null,
        title: 'Style Card',
        children: ['2', '3', '01'],
    },
    {
        id: '01',
        parent_id: '1',
        title: 'Node 01',
        children: ['011'],
    },
    {
        id: '011',
        parent_id: '01',
        title: 'Node 011',
        children: [],
    },
    {
        id: '2',
        parent_id: '1',
        title: 'Node 2',
        children: ['22', '222'],
    },
    {
        id: '22',
        parent_id: '2',
        title: 'Node 22',
        // children: ['4']
        children: [],
    },
    {
        id: '222',
        parent_id: '2',
        title: 'Node 222',
        // children: ['4']
        children: [],
    },
    {
        id: '3',
        parent_id: '1',
        title: 'Node 3',
        children: ['333'],
    },
    // {
    //     id: '33',
    //     title: 'Node 33',
    //     children: [],
    // },
    {
        id: '333',
        parent_id: '3',
        title: 'Node 333',
        children: ['3333'],
    },
    {
        id: '3333',
        parent_id: '333',
        title: 'Node 3333',
        children: [],
    },
    // {
    //     id: '4',
    //     title: 'Node 4',
    //     children: []
    // },
    {
        id: '5',
        parent_id: null,
        title: 'Node 5',
        children: ['6', '8'],
    },
    {
        id: '6',
        parent_id: '5',
        title: 'Node 6',
        children: ['7'],
    },
    {
        id: '7',
        parent_id: '6',
        title: 'Node 7',
        children: [],
    },
    // {
    //     id: '77',
    //     title: 'Node 77',
    //     children: ['777']
    // },
    // {
    //     id: '777',
    //     title: 'Node 777',
    //     children: []
    // },
    {
        id: '8',
        parent_id: '5',
        title: 'Node 8',
        children: [],
    },
    // {
    //     id: '9',
    //     title: 'Node 9090',
    //     children: [],
    // },
    // {
    //     id: '10',
    //     title: 'Node 10',
    //     children: [],
    // },
    // {
    //     id: '11',
    //     title: 'Node 11',
    //     children: ['111', '1111'],
    // },
    // {
    //     id: '111',
    //     title: 'Node 11',
    //     children: []
    // },
    // {
    //     id: '1111',
    //     title: 'Node 11',
    //     children: []
    // }
];
