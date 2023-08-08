<script setup lang="ts">
import { computed } from 'vue';
import { useNodes } from '@/stores/nodes';
import ChevronRight from '/public/assets/icons/chevron-right.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';
import NodeItem from './NodeItem.vue';

export interface NodeCollectionProps {
    title: string;
}

const props = defineProps<NodeCollectionProps>();

const nodeStore = useNodes();

nodeStore.fetchNodes();
</script>

<template>
    <div :class="styles.collection">
        <div :class="styles.content">
            <div class="border border-slate-50 p-6">{{ props.title }}</div>
            <div :class="styles.inner">
                <div :class="styles.lineColumn">
                    <div v-for="(node, i) in nodeStore.treeRows" :key="i" :class="styles.lineColRow">
                        <button class="flex justify-center w-full" v-if="node.children.length > 0"
                            @click="nodeStore.toggleNode(node.id)">
                            <ChevronDown v-if="node.isExpanded" :class="styles.icon" />
                            <ChevronRight v-else :class="styles.icon" />
                        </button>
                        <span :class="styles.lineColumnEmpty" v-else>
                        </span>
                    </div>
                </div>
                <div class="flex-1 py-3">
                    <NodeItem root :node="nodeStore.tree" :tree-line="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
const styles = computed(() => ({
    collection: ['container', 'h-full', 'min-h-[80vh]', 'md:py-2', 'border'],
    content: ['w-96', 'mx-auto'],
    inner: ['relative', 'flex', 'border'],
    lineColumn: ['py-3'],
    lineColRow: ['px-2', 'leading-6', 'text-center', 'h-6'],
    icon: ['w-6', 'h-6', 'fill-gray-500'],
    lineColumnEmpty: ['h-6', 'w-full', 'bg-red-700'],
}));
</script>
