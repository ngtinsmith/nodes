<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useNodes } from '@/stores/nodes';
import ChevronRight from '/public/assets/icons/chevron-right.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';
import VNode from './VNode.vue';
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
    <div class="card">
        <div class="header">{{ props.title }}</div>
        <div class="content">
            <div :class="styles.lineColumn">
                <div
                    v-for="node in nodeStore.treeRows"
                    :key="node.id"
                    :class="styles.lineColRow(isAncestorVisible(node.id))"
                >
                    <button
                        v-if="node.children.length > 0"
                        :class="styles.btnToggle"
                        @click="nodeStore.toggleNode(node.id)"
                    >
                        <ChevronDown
                            v-if="nodeStore.getState(node.id, 'expanded')"
                            :class="styles.icon"
                        />
                        <ChevronRight
                            v-else
                            :class="styles.icon"
                        />
                    </button>
                    <div
                        v-else
                        :class="styles.lineEmpty"
                    />
                </div>
            </div>
            <div :class="styles.nodeTree">
                <VNode
                    root
                    :node="nodeStore.tree"
                    :tree-line="false"
                />
            </div>
        </div>
        <div class="footer">footer</div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 80vh;
    background-color: var(--v-slate-800);
    padding: 0.5rem;
    border-radius: 0.5rem;

    $card: &;

    .header {
        padding: 0;
    }

    .content {
        display: flex;
        padding-block: 1rem;
        position: relative;
        flex: 1;
        background-color: var(--v-slate-900);
        border-radius: 0.25rem;
    }

    .footer {
        padding: 0;
    }
}
</style>

<script lang="ts">
const styles = computed(() => ({
    lineColumn: [],
    nodeTree: ['flex-1', 'flex', 'justify-start'],

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
