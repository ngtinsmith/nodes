<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNodes } from '@/stores/nodes';
import type { Node } from '@/stores/nodes/interfaces';
import VCheckbox from '@/components/VCheckbox.vue';
import VNodeControls from './VNodeControls.vue';
import ChevronRight from '/public/assets/icons/chevron-right.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';

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
    // first
    const isFirstWithChildren =
        idx === 0 &&
        childNode.children.length === 1 &&
        childrenSize.value === 1;

    // last
    const isLast = idx > 0 && idx === props.node.children.length - 1;
    const hasManyChildren = childNode.children.length > 0;

    return (isLast && hasManyChildren) || isFirstWithChildren;
});
const isFocused = ref(false);

const addInto = () => {
    nodeStore.addIntoNode({
        parentId: props.node.id,
        title: `Node ${Math.round(Math.random() * 10000)}`,
    });
};

const addAbove = () => {
    const title = `Node {above} ${Math.round(Math.random() * 10000)}`;
    nodeStore.addNode(props.node.parent_id, props.node.id, title, 'above');
};

const addBelow = () => {
    const title = `Node {below} ${Math.round(Math.random() * 10000)}`;
    nodeStore.addNode(props.node.parent_id, props.node.id, title, 'below');
};

const duplicate = () => {
    nodeStore.duplicateNode(props.node.id);
};

const deleteNode = () => {
    nodeStore.deleteNode(props.node.id, props.parentId);
};

const toggleCheck = () => nodeStore.toggleNodeCheck(props.node.id);
const toggleSubControl = () => {
    isFocused.value = !isFocused.value;
    nodeStore.setFocusedNode(props.node.id);
};
function expandNode() {
    // expand
}

const canHover = computed(() => {
    if (nodeStore.focusedNode === '') return true;

    return nodeStore.focusedNode === props.node.id;
});
</script>

<template>
    <div class="node">
        <div
            v-if="
                danglingLine &&
                treeLine &&
                !nodeStore.nodeStateMap[node.id].primary
            "
            class="group-line-cover"
        />
        <div
            v-show="!root"
            :class="[
                'row',
                {
                    'is-focused': isFocused,
                },
            ]"
            :data-hover="canHover"
        >
            <div class="content">
                <div class="row-content">
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
                    <div
                        v-else
                        class="sign-empty"
                    />
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
    --v-slate-700_70: #{opacify-tw(slate, 700, 0.7)};
    --v-slate-900-x-white_5: #{mix(color-tw(slate, 900), $white, 95%)};
    --tree-line-color: var(--v-slate-700_70);

    $icon-size: 20;

    width: 100%;
    background-color: transparent;

    .controls {
        flex: 1;
    }

    .row {
        display: flex;
        padding: rem(2) rem(4);
        background-color: transparent;

        &.is-focused,
        &[data-hover='true']:hover {
            background-color: var(--v-transparent-white-5);

            .sign-toggle {
                background-color: var(--v-slate-900-x-white_5);
            }

            .row-controls {
                opacity: 1;
                pointer-events: all;
            }
        }
    }

    .row-content {
        display: flex;
        align-items: center;
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
    }

    .title {
        line-height: rem(16);
        font-size: rem(14);
        color: var(--v-slate-100);
        white-space: pre;

        &.is-checked {
            color: var(--v-slate-500);
        }
    }

    .children {
        padding-left: rem(23);

        &.no-gutter {
            padding-left: 0;
        }
    }

    .group-line {
        position: absolute;
        top: 2px;
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
        background-color: var(--v-slate-900);
    }

    .checkbox-wrapper {
        display: flex;
        margin-inline: rem(6) rem(8);
    }

    .sign-empty {
        height: rem($icon-size);
        width: rem($icon-size);
    }

    .sign-toggle {
        display: flex;
        justify-content: center;
        background-color: var(--v-slate-900);

        &:hover {
            background-color: var(--v-slate-900-x-white_5);
        }
    }

    .sign-icon {
        width: rem($icon-size);
        height: rem($icon-size);
        fill: var(--v-slate-600);
    }
}
</style>
