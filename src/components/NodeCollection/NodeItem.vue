<script setup lang="ts">
import type { Node } from './nodes'
import ChevronDown from '../../assets/chevron-down-bold.svg?component'
import ChevronRight from '../../assets/chevron-right-bold.svg?component'

export interface NodeItemProps {
    node: Node
    root?: boolean
    danglingLine?: boolean
}

/**
 * !!!!!!!!!!!!!!!!!!!!!! = GIT = !!!!!!!!!!!!!!!!!!!!!!
 */

const props = defineProps<NodeItemProps>()

const isExpanded = ref(true)
const childrenSize = computed(() => props.node.children.length)
const hasChildren = computed(() => childrenSize.value > 0)

const hasDanglingLine = computed(() => (childNode: Node, idx: number) => {
    // last
    const isLast = idx > 0 && idx === props.node.children.length - 1
    const hasManyChildren = childNode.children.length > 0

    // first
    const isFirstWithChildren =
        idx === 0 && childNode.children.length === 1 && childrenSize.value === 1

    return (isLast && hasManyChildren) || isFirstWithChildren
})

const toggle = () => (isExpanded.value = !isExpanded.value)
</script>

<template>
    <div :class="styles.node" data-root="true">
        <div v-if="danglingLine" :class="styles.groupLineCover" data-cover="true" />
        <div v-show="!root" :class="styles.content" data-content="true">
            <button :class="styles.toggleBtn(hasChildren)" @click="toggle">
                <ChevronDown v-if="isExpanded" :class="styles.icon" />
                <ChevronRight v-else :class="styles.icon" />
            </button>
            <input type="checkbox" :class="styles.checkBtn" />
            <div :class="styles.title">{{ node.title }}</div>
        </div>

        <div v-show="isExpanded" :class="styles.children(!root)" data-children="true">
            <div :class="styles.groupLine(hasChildren)" />
            <NodeItem v-for="(childNode, idx) in node.children" :key="childNode.id" :node="childNode"
                :dangling-line="hasDanglingLine(childNode, idx)" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'

const styles = computed(() => ({
    node: ['relative'],
    content: ['flex', 'px-2', 'py-1'],
    title: ['text-white', 'leading-4', 'text-sm'],
    children: (leftGutter: boolean) => [leftGutter && 'ml-6'],
    groupLine: (withChildren: boolean) => [
        'absolute',
        'top-1',
        'bottom-3',
        'left-[15px]',
        'w-2',
        'border-l',
        'border-l-gray-500',
        ...[withChildren && ['border-b', 'border-b-gray-500']]
    ],
    groupLineCover: [
        'absolute',
        'top-4',
        'bottom-2',
        'left-2',
        'w-4',
        'border-t',
        'border-t-gray-500',
        'bg-neutral-900'
    ],
    icon: ['w-4', 'h-4', 'text-gray-500'],
    toggleBtn: (show: boolean) => ['bg-neutral-900', 'mr-2', show ? 'visible' : 'invisible'],
    checkBtn: [
        'mr-2',
        'w-4',
        'h-4',
        'rounded-full',
        'border',
        'border-gray-600',
        'leading-[.5rem]',
        'text-[10px]',
        'text-gray-400'
    ]
}))
</script>
