<script setup lang="ts">
import { computed } from 'vue';
import NodeCollection from './components/NodeCollection/NodeCollection.vue';
</script>

<template>
    <header class="container mx-auto border border-indigo-50">header</header>
    <main>
        <div :class="styles.content">
            <div :class="styles.nodeCollection">
                <NodeCollection title="node collections" />
            </div>
        </div>
    </main>
    <footer class="container mx-auto border border-indigo-50">
        <div class="container">footer</div>
    </footer>
</template>

<script lang="ts">
const styles = computed(() => ({
    content: [
        'flex',
        'border',
        'mx-auto',
        'container',
        'items-center',
        'justify-between',
    ],
    nodeCollection: ['h-full'],
}));
</script>
