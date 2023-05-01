<script setup lang="ts">
/*
    TODO

    fix vue script comments
    tw classes on specific style helper / syntax
    tw class order
    tw order prettier
    fix catpuccin TODO colorscheme


          (idx > 0 && idx === node.children.length - 1 && childNode.children.length > 0) ||
          (idx === 0 && childNode.children.length === 1 && childrenSize === 1)
*/

import { computed } from 'vue'
import NodeItem from './NodeItem.vue'
import type { Node } from './nodes'
import { rootIds, buildTree } from './nodes'

export interface NodeCollectionProps {
  title: string
}

interface Tree {
  id: string
  title: string
  children: Node[]
}

const props = defineProps<NodeCollectionProps>()

const tree = computed<Tree>(() => ({
  id: '0',
  title: 'Root',
  children: buildTree(rootIds)
}))
</script>

<template>
  <div :class="styles.collection">
    <div :class="styles.content">
      <div class="border border-slate-50 p-6">{{ props.title }}</div>
      <div :class="styles.inner">
        <NodeItem root :node="tree" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const styles = computed(() => ({
  collection: ['container', 'h-full', 'min-h-[80vh]', 'md:py-2', 'border'],
  content: ['w-96', 'mx-auto'],
  inner: ['px-2', 'py-3', 'border']
}))
</script>
