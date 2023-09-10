<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useNodes } from '@/stores/nodes';
import ChevronRight from '/public/assets/icons/chevron-right.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';

import ArrowLeft from '/public/assets/icons/arrow-left.svg?component';
import ArrowRight from '/public/assets/icons/arrow-right.svg?component';
import Edit from '/public/assets/icons/edit.svg?component';
import Gear from '/public/assets/icons/gear.svg?component';
import Save from '/public/assets/icons/save.svg?component';
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
        <div class="header">
            <div class="header-left">
                <h3>
                    {{ props.title }}
                </h3>
            </div>
            <div class="header-right">
                <ArrowLeft class="sign-icon" />
                <ArrowRight class="sign-icon" />
                <Save class="sign-icon" />
                <Edit class="sign-icon" />
                <Gear class="sign-icon" />
            </div>
        </div>
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
                    :tree-line="true"
                />
            </div>
        </div>
        <!-- <div class="footer">footer</div> -->
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    max-height: 100%;
    min-width: rem(360);
    background-color: var(--v-slate-800);
    padding: rem(8);
    border-radius: rem(8);

    $card: &;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: rem(4) rem(10);

        &-left {
            display: flex;
            align-items: center;
        }

        &-right {
            display: flex;
            align-items: center;
            column-gap: rem(16);
        }

        h3 {
            font-size: rem(16);
            font-weight: 600;
            line-height: 120%;
            text-transform: capitalize;
            color: var(--v-slate-50);
        }
    }

    .content {
        display: flex;
        padding: rem(16) rem(8);
        position: relative;
        flex: 1;
        background-color: var(--v-slate-900);
        border-radius: rem(4);
        overflow: hidden;
    }

    .sign {
        padding-inline: rem(4);
        height: rem(24);
        line-height: rem(24);
        text-align: center;
        display: none;

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
        display: flex;
        width: rem(20);
        height: rem(20);
        fill: var(--v-slate-600);
    }

    .tree {
        display: flex;
        justify-content: flex-start;
        flex: 1;
        overflow-y: auto;
    }

    .footer {
        padding: 0;
    }
}
</style>
