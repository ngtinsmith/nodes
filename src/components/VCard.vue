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
            <div class="line-column">
                <div
                    v-for="node in nodeStore.treeRows"
                    :key="node.id"
                    :class="['sign', !isAncestorVisible(node.id) && 'hidden']"
                >
                    <button
                        v-if="node.children.length > 0"
                        class="sign-toggle"
                        @click="nodeStore.toggleNode(node.id)"
                    >
                        <ChevronDown
                            v-if="nodeStore.getState(node.id, 'expanded')"
                            class="sign-icon"
                        />
                        <ChevronRight
                            v-else
                            class="sign-icon"
                        />
                    </button>
                    <div
                        v-else
                        class="sign-empty"
                    />
                </div>
            </div>
            <div class="tree">
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
    padding: rem(8);
    border-radius: rem(8);

    $card: &;

    .header {
        padding: 0;
    }

    .content {
        display: flex;
        padding-block: rem(16);
        position: relative;
        flex: 1;
        background-color: var(--v-slate-900);
        border-radius: rem(4);
    }

    .sign {
        padding-inline: rem(4);
        height: rem(24);
        line-height: rem(24);
        text-align: center;

        &.hidden {
            display: none;
        }
    }

    .sign-empty {
        height: rem(24);
        width: 100%;
    }

    .sign-toggle {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .sign-icon {
        width: rem(24);
        height: rem(24);
        fill: var(--v-slate-600);
    }

    .tree {
        display: flex;
        justify-content: flex-start;
        flex: 1;
    }

    .footer {
        padding: 0;
    }
}
</style>
