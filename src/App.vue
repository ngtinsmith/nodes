<script setup lang="ts">
import VCard from './components/VCard.vue';
import VCanvas from './layouts/VCanvas.vue';
</script>

<template>
    <header class="header">header</header>
    <main>
        <div class="content">
            <VCanvas>
                <VCard title="header" />
                <VCard title="header 2" />
            </VCanvas>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.header {
    margin-inline: auto;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: auto;
}
</style>
