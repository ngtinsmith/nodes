import type { NodeState } from "../interfaces";

export const nodeStates: NodeState[] = [
    {
        id: '1',
        primary: true,
        expanded: true,
        complete: false,
    },
    {
        id: '01',
        primary: false,
        expanded: true,
        complete: true,
    },
    {
        id: '011',
        primary: false,
        expanded: false,
        complete: true,
    },
    {
        id: '2',
        primary: false,
        expanded: true,
        complete: false,
    },
    {
        id: '22',
        primary: false,
        expanded: false,
        complete: true,
    },
    {
        id: '222',
        primary: false,
        expanded: false,
        complete: false,
    },
    {
        id: '3',
        primary: false,
        expanded: true,
        complete: false,
    },
    // {
    //     id: '33',
    // },
    {
        id: '333',
        primary: false,
        expanded: true,
        complete: false,
    },
    {
        id: '3333',
        primary: false,
        expanded: false,
        complete: false,
    },
    // {
    //     id: '4',
    // },
    {
        id: '5',
        primary: true,
        expanded: true,
        complete: false,
    },
    {
        id: '6',
        primary: false,
        expanded: true,
        complete: false,
    },
    {
        id: '7',
        primary: false,
        expanded: false,
        complete: true,
    },
    // {
    //     id: '77',
    // },
    // {
    //     id: '777',
    // },
    {
        id: '8',
        primary: false,
        expanded: false,
        complete: true,
    },
    // {
    //     id: '9',
    // },
    // {
    //     id: '10',
    // },
    // {
    //     id: '11',
    // },
    // {
    //     id: '111',
    // },
    // {
    //     id: '1111',
    // }
];
