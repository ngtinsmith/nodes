<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useNodes } from '@/stores/nodes';
import type { Node } from '@/stores/nodes/interfaces';
import VCheckbox from '@/components/VCheckbox.vue';
import VNodeControls from './VNodeControls.vue';
import type { NodeModal } from '~/types/modal';
import { nodeModalKey } from '~/types/symbols';

export interface NodeItemProps {
    node: Node;
    root?: boolean;
    parentId?: string;
    danglingLine?: boolean;
    treeLine?: boolean; // TODO: test provide/inject
}

const props = defineProps<NodeItemProps>();
const nodeModalInject = inject<NodeModal>(nodeModalKey);

const nodeStore = useNodes();

const isFocused = ref(false);

const childrenSize = computed(() => props.node.children?.length || 0);
const hasChildren = computed(() => childrenSize.value > 0);
const hasDanglingLine = computed(() => (childNode: Node, idx: number) => {
    const children = childNode.children;

    const isFirstWithChildren =
        idx === 0 &&
        childNode.children.length === 1 &&
        childrenSize.value === 1;

    const isLast = idx === props.node.children.length - 1;
    const hasSiblingsAndIsLast = idx > 0 && isLast;
    const hasManyChildren = children.length > 0;

    return (
        (hasSiblingsAndIsLast && hasManyChildren) ||
        isFirstWithChildren ||
        (isLast && hasManyChildren)
    );
});
const canHover = computed(() => {
    if (nodeStore.focusedNode === '') return true;

    return nodeStore.focusedNode === props.node.id;
});

function addInto() {
    nodeStore.addIntoNode({
        parentId: props.node.id,
        title: `Node ${Math.round(Math.random() * 10000)}`,
    });
}

function addAbove() {
    if (!props.node.parent_id) return;

    const title = `Node {above} ${Math.round(Math.random() * 10000)}`;
    nodeStore.addNode({
        node: props.node,
        title,
        pos: 'above',
    });
}

function addBelow() {
    if (!props.node.parent_id) return;

    const title = `Node {below} ${Math.round(Math.random() * 10000)}`;
    nodeStore.addNode({
        node: props.node,
        title,
        pos: 'below',
    });
}

function duplicate() {
    nodeStore.duplicateNode(props.node.id, props.node.parent_id);
}

function deleteNode() {
    nodeStore.deleteNode(props.node);
}

function toggleCheck() {
    nodeStore.toggleNodeCheck(props.node.id);
}

function toggleSubControl() {
    isFocused.value = !isFocused.value;
    nodeStore.setFocusedNode(props.node.id);
}

function expandNode() {
    // expand
    nodeModalInject?.expandNodeContent(props.node);
}
</script>

<template>
    <div class="node">
        <div
            v-if="
                danglingLine &&
                treeLine &&
                !nodeStore.nodeStateMap?.[node.id]?.primary
            "
            class="group-line-cover"
        />
        <div
            v-show="!root"
            :class="[
                'row',
                {
                    'is-focused': isFocused,
                    'no-children': node.children.length === 0,
                },
            ]"
            :data-hover="canHover"
        >
            <div class="content">
                <div class="details">
                    <button
                        v-if="node.children.length > 0"
                        class="sign-toggle"
                        @click="nodeStore.toggleNode(node.id)"
                    >
                        <ChevronDown
                            v-if="node.expanded"
                            class="sign-icon"
                        />
                        <ChevronRight
                            v-else
                            class="sign-icon"
                        />
                    </button>
                    <div class="checkbox-wrapper">
                        <VCheckbox
                            :checked="node.complete"
                            @click="toggleCheck"
                        />
                    </div>
                    <div
                        :class="[
                            'title',
                            {
                                'is-checked': node.complete,
                            },
                        ]"
                    >
                        {{ node.title }}
                    </div>
                </div>
                <div class="controls">
                    <VNodeControls
                        :focused="isFocused"
                        @toggle="toggleSubControl"
                        @add-into="addInto"
                        @delete-node="deleteNode"
                        @add-above="addAbove"
                        @add-below="addBelow"
                        @duplicate="duplicate"
                        @expand="expandNode"
                    />
                </div>
            </div>
        </div>

        <div
            v-show="node.expanded"
            :class="[
                'children',
                {
                    'no-gutter': root,
                },
            ]"
        >
            <div
                v-if="treeLine && !root"
                :class="[
                    'group-line',
                    {
                        'bottom-line': hasChildren,
                    },
                ]"
            />
            <VNode
                v-for="(childNode, idx) in node.children"
                :key="childNode.id"
                :node="childNode"
                :dangling-line="hasDanglingLine(childNode, idx)"
                :parent-id="node.id"
                :tree-line="treeLine"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.node {
    --hover-bg: color-mix(in srgb, var(--slate-900) 95%, var(--white));
    /*
    --tree-line-color: color-mix(in srgb, var(--slate-700) 100%, transparent);
    */
    --tree-line-color: color-mix(in srgb, var(--emerald-500) 100%, transparent);
    $icon-size: 20;

    width: 100%;
    background-color: transparent;

    .row {
        display: flex;
        margin-inline: rem(2) rem(4);
        background-color: transparent;
        padding-right: rem(4);

        &.is-focused,
        &[data-hover='true']:hover {
            background-color: rgb(50, 57, 73);
            /*
               background-color: var(--transparent-white-15);
            */

            .sign-toggle {
                background-color: unset;
                background-color: var(--slate-900);
            }

            .sign-icon {
                fill: var(--slate-500);
            }

            :deep(.checkbox:not(.checked)) {
                border-color: var(--slate-500);
            }

            .controls {
                opacity: 1;
                pointer-events: all;
            }
        }

        &.no-children {
            margin-left: rem(22);
            padding-left: rem(8);
        }
    }

    .details {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .controls {
        flex: 1;
        opacity: 0;
        pointer-events: none;
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        height: rem(28);
    }

    .title {
        line-height: rem(16);
        font-size: rem(14);
        color: var(--slate-100);
        white-space: pre;

        &.is-checked {
            color: var(--slate-500);
        }
    }

    .children {
        padding-left: rem(24);

        &.no-gutter {
            padding-left: 0;
        }
    }

    .group-line {
        position: absolute;
        top: rem(2);
        bottom: rem(10);
        left: rem(36);
        width: rem(8);
        border-left: 1px solid var(--tree-line-color);

        &.bottom-line {
            border-bottom: 1px solid var(--tree-line-color);
        }
    }

    .group-line-cover {
        position: absolute;
        top: rem(12);
        bottom: 0;
        left: rem(12);
        width: rem(10);
        border-top: 1px solid var(--tree-line-color);
        background-color: var(--slate-900);
    }

    .checkbox-wrapper {
        display: flex;
        margin-right: rem(8);
    }

    .sign-toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--slate-900);
        height: 100%;
        margin-right: rem(8);

        &:hover {
            background-color: var(--hover-bg);
        }
    }

    .sign-icon {
        width: rem($icon-size);
        height: rem($icon-size);
        fill: var(--slate-600);
    }
}
</style>
