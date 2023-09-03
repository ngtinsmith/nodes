<script setup lang="ts">
import { computed } from 'vue';
import VCard from './components/VCard.vue';
import VCanvas from './layouts/VCanvas.vue';
</script>

<template>
    <header class="container mx-auto border border-indigo-50">header</header>
    <main>
        <div :class="styles.content">
            <VCanvas>
                <VCard title="header" />
                <VCard title="header 2" />
            </VCanvas>
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
}));
</script>
