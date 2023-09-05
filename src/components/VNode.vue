<script setup lang="ts">
import { computed } from 'vue';
import { useNodes } from '@/stores/nodes';
import type { Node } from '@/stores/nodes/interfaces';
import Add from '/public/assets/icons/add-line.svg?component';
import Close from '/public/assets/icons/close-line.svg?component';
import ChevronRight from '/public/assets/icons/chevron-right.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';
import VCheckbox from '@/components/atoms/VCheckbox.vue';

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
            class="row"
        >
            <div class="content">
                <div class="row-content">
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
                    <div class="checkbox-wrapper">
                        <VCheckbox
                            :checked="isChecked"
                            @click="toggleCheck"
                        />
                    </div>
                    <div :class="['title', isChecked && 'is-checked']">
                        {{ node.title }}
                    </div>
                </div>
                <div class="row-controls">
                    <button @click="add">
                        <Add class="toggle-icon" />
                    </button>
                    <button @click="deleteNode">
                        <Close class="toggle-icon" />
                    </button>
                </div>
            </div>
        </div>

        <div
            v-show="isExpanded"
            :class="['children', root && 'no-gutter']"
        >
            <div
                v-if="treeLine && !root"
                :class="['group-line', hasChildren && 'bottom-line']"
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
    --tree-line-color: var(--v-slate-600);

    width: 100%;
    background-color: transparent;

    .row {
        display: flex;
        padding-inline: 0.25rem;
        background-color: transparent;

        &:hover {
            background-color: var(--v-transparent-white-5);

            .sign-toggle {
                background-color: #1b2335;
            }
        }
    }

    .row-content {
        display: flex;
        align-items: center;
    }

    .row-controls {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        opacity: 0;

        &:hover {
            opacity: 1;
        }
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

    .toggle-icon {
        width: rem(24);
        height: rem(24);
        fill: var(--v-slate-500);
    }

    .checkbox-wrapper {
        margin-inline: rem(6) rem(8);
    }

    .sign-empty {
        height: rem(20);
        width: rem(20);
    }
    .sign-toggle {
        display: flex;
        justify-content: center;
        background-color: var(--v-slate-900);

        &:hover {
            background-color: #1b2335;
        }
    }

    .sign-icon {
        width: rem(20);
        height: rem(20);
        fill: var(--v-slate-600);
    }
}
</style>
