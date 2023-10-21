<script setup lang="ts">
import VCard from './components/VCard.vue';
import VCanvas from './layouts/VCanvas.vue';
import VSidebar from './layouts/Sidebar/VSidebar.vue';
import VSecondarySidebar from './layouts/Sidebar/VSecondarySidebar.vue';
</script>

<template>
    <main>
        <div class="inner">
            <VSidebar />
            <VSecondarySidebar />
            <div class="workspace">
                <header class="main-header"></header>
                <div class="main-content">
                    <VCanvas>
                        <VCard title="Node Tree A" />
                        <VCard title="Node Tree B" />
                    </VCanvas>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
main {
    height: 100vh;
}

.inner {
    display: flex;
    height: 100%;
    overflow: hidden;
}

.workspace {
    flex: 1;
    overflow: hidden;
}

.main-header {
    height: rem(48);
    margin-inline: auto;
    background-color: var(--v-gray-900);
}

.main-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: auto;
    height: calc(100% - rem(48));
}

svg {
    width: rem(20);
    height: rem(20);
    fill: var(--v-gray-300);
}

.visually-hidden {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
</style>
