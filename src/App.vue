<script setup lang="ts">
import NodeCollection from './components/NodeCollection/NodeCollection.vue'
</script>

<template>
  <header class="container mx-auto border border-indigo-50">header</header>

  <main class="container mx-auto border border-slate-50 h-full">
    <NodeCollection title="node collections" />
  </main>

  <footer class="container mx-auto border border-indigo-50">
    <div class="container">footer</div>
  </footer>
</template>
