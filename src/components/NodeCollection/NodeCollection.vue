<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useNodes } from '@/stores/nodes';
import ChevronRight from '/public/assets/icons/chevron-right.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';
import NodeItem from './NodeItem.vue';
import type { NodeId } from '@/stores/nodes/interfaces';

export interface NodeCollectionProps {
    title: string;
}

const props = defineProps<NodeCollectionProps>();

const nodeStore = useNodes();

onMounted(() => {
    nodeStore.fetchNodes();
});

const isAncestorVisible = computed(() => (nodeId: NodeId) => {
    const ancestorIds = nodeStore.nodePath[nodeId];

    // rootNodes has no ancestor (null)
    // rootNodes are always visible
    if (ancestorIds === null) return true;

    return ancestorIds?.every((id) => nodeStore.nodeStateMap[id].expanded);
});
</script>

<template>
    <div :class="styles.module">
        <div :class="styles.content">
            <div :class="styles.header">{{ props.title }}</div>
            <div :class="styles.inner">
                <div :class="styles.lineColumn">
                    <div v-for="node in nodeStore.treeRows" :key="node.id"
                        :class="styles.lineColRow(isAncestorVisible(node.id))">
                        <button v-if="node.children.length > 0" :class="styles.btnToggle"
                            @click="nodeStore.toggleNode(node.id)">
                            <ChevronDown v-if="nodeStore.getState(node.id, 'expanded')" :class="styles.icon" />
                            <ChevronRight v-else :class="styles.icon" />
                        </button>
                        <div v-else :class="styles.lineEmpty" />
                    </div>
                </div>
                <div :class="styles.nodeTree">
                    <NodeItem root :node="nodeStore.tree" :tree-line="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
const styles = computed(() => ({
    module: ['container', 'h-full', 'min-h-[80vh]', 'md:py-2', 'border'],
    content: ['w-96', 'mx-auto'],
    header: ['border', 'border-slate-50', 'p-6'],
    inner: ['relative', 'flex', 'border', 'py-3'],

    lineColumn: [],
    nodeTree: ['flex-1'],

    lineColRow: (isVisible: boolean) => [
        'px-2',
        'h-6',
        'leading-6',
        'text-center',
        isVisible ? 'visible' : 'hidden',
    ],
    lineEmpty: ['h-6', 'w-full'],

    btnToggle: ['flex', 'justify-center', 'w-full'],
    icon: ['w-6', 'h-6', 'fill-gray-500'],
}));
</script>
