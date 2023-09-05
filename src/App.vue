<script setup lang="ts">
import VCard from './components/VCard.vue';
import VCanvas from './layouts/VCanvas.vue';
</script>

<template>
    <header class="header"></header>
    <main>
        <div class="content">
            <VCanvas>
                <VCard title="Node Tree A" />
                <VCard title="Node Tree B" />
            </VCanvas>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.header {
    height: rem(48);
    margin-inline: auto;
    background-color: var(--v-gray-900);
}

main {
    height: calc(100vh - rem(48));
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: auto;
    height: 100%;
}
</style>
