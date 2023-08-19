<script setup lang="ts">
import { computed } from 'vue';
import { useNodes } from '@/stores/nodes';
import type { Node } from '@/stores/nodes/interfaces';
import Add from '/public/assets/icons/add-line.svg?component';
import Close from '/public/assets/icons/close-line.svg?component';

export interface NodeItemProps {
    node: Node;
    root?: boolean;
    parentId?: string;
    danglingLine?: boolean;
    treeLine?: boolean;
}

const props = defineProps<NodeItemProps>();
const nodeStore = useNodes();

const childrenSize = computed(() => props.node.children.length);
const hasChildren = computed(() => childrenSize.value > 0);

const hasDanglingLine = computed(() => (childNode: Node, idx: number) => {
    // last
    const isLast = idx > 0 && idx === props.node.children.length - 1;
    const hasManyChildren = childNode.children.length > 0;

    // first
    const isFirstWithChildren =
        idx === 0 &&
        childNode.children.length === 1 &&
        childrenSize.value === 1;

    return (isLast && hasManyChildren) || isFirstWithChildren;
});

const add = () => {
    nodeStore.addIntoNode({
        parentId: props.node.id,
        title: `Node ${Math.round(Math.random() * 10000)}`,
    });
};

const deleteNode = () => {
    nodeStore.deleteNode(props.node.id, props.parentId);
};

const toggleCheck = () => nodeStore.toggleNodeCheck(props.node.id);

const isChecked = computed(() => nodeStore.getState(props.node.id, 'complete'));
const isExpanded = computed(() =>
    nodeStore.getState(props.node.id, 'expanded'),
);
</script>

<template>
    <div :class="styles.node" :data-root="root">
        <div v-if="danglingLine && treeLine" :class="styles.groupLineCover" data-cover="true" />
        <div v-show="!root" :class="styles.row" data-content="true">
            <div :class="styles.content">
                <div :class="styles.rowContent">
                    <input type="checkbox" :class="styles.checkbox" :checked="isChecked" @click="toggleCheck" />
                    <div :class="styles.title(!!isChecked)">
                        {{ node.title }}
                    </div>
                </div>
                <div :class="styles.rowControls">
                    <button @click="add">
                        <Add :class="styles.ctrlIcon" />
                    </button>
                    <button @click="deleteNode">
                        <Close :class="styles.ctrlIcon" />
                    </button>
                </div>
            </div>
        </div>

        <div v-show="isExpanded" :class="styles.children(!root)" data-children="true" :data-id="node.id">
            <div v-if="treeLine" :class="styles.groupLine(hasChildren)" />
            <NodeItem v-for="(childNode, idx) in node.children" :key="childNode.id" :node="childNode"
                :dangling-line="hasDanglingLine(childNode, idx)" :parent-id="node.id" :tree-line="treeLine" />
        </div>
    </div>
</template>

<script lang="ts">
const styles = computed(() => ({
    node: [],
    row: ['flex', 'px-2', 'hover:bg-neutral-800'],
    rowContent: ['flex'],
    rowControls: [
        'flex',
        'justify-end',
        'flex-1',
        'opacity-0',
        'hover:opacity-100',
    ],

    content: ['flex', 'flex-1', 'items-center', 'justify-between'],
    title: (isChecked: boolean) => [
        'leading-4',
        'text-sm',
        isChecked ? 'text-gray-500' : 'text-white',
    ],
    children: (leftGutter: boolean) => [leftGutter && 'ml-7'],
    groupLine: (withChildren: boolean) => [
        'absolute',
        'top-1',
        'bottom-3',
        'left-[19px]',
        'w-2',
        'border-l',
        'border-l-gray-500',
        ...[withChildren && ['border-b', 'border-b-gray-500']],
    ],
    groupLineCover: [
        'absolute',
        'top-4',
        'bottom-2',
        'left-3',
        'w-4',
        'border-t',
        'border-t-gray-500',
        'bg-neutral-900',
    ],
    icon: ['w-6', 'h-6', 'fill-gray-500'],
    toggleBtn: (show: boolean) => [
        'bg-neutral-900',
        'mr-1',
        show ? 'visible' : 'invisible',
    ],
    ctrlIcon: ['w-6', 'h-6', 'fill-gray-500'],
    checkbox: [
        'mr-3',
        'w-4',
        'h-4',
        'rounded-full',
        'border',
        'border-gray-600',
        'leading-[.5rem]',
        'text-[10px]',
    ],
}));
</script>
