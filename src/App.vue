<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import VCard from './components/VCard.vue';
import VCanvas from './layouts/VCanvas.vue';
import VSidebar from './layouts/Sidebar/VSidebar.vue';
import VSecondarySidebar from './layouts/Sidebar/VSecondarySidebar.vue';
import VModal from './components/VModal.vue';
import type { Node } from '@/stores/nodes/interfaces';
import type { NodeModal } from './interfaces/modal';
import { nodeModalKey } from './interfaces/symbols';
import VNodeContent from './components/VNodeContent.vue';
import { useSidebar } from '@/stores/sidebar';
import VResizable from '@/layouts/VResizable.vue';

provide<NodeModal>(nodeModalKey, {
    expandNodeContent,
});

const mainContentRef = ref<HTMLDivElement | null>(null);
const isOpenModal = ref(false);
const isFullscreenModal = ref(false);

const sidebarStore = useSidebar();

const sidebarConfig = computed(() => {
    return {
        attr: sidebarStore.config.stacked ? 'top' : 'left',
        value: sidebarStore.config.stacked ? 35 : 50,
    };
});

function expandNodeContent(node: Node) {
    isOpenModal.value = true;

    // TODO: fetch content by id or used node store content
    console.log(node);
}

function closeModal() {
    isOpenModal.value = false;

    exitFullscreen();
}

function enterFullscreen() {
    isFullscreenModal.value = true;
}

function exitFullscreen() {
    isFullscreenModal.value = false;
}
</script>

<template>
    <main>
        <VResizable
            direction="horizontal"
            :left="sidebarStore.config.stacked ? 25 : 50"
        >
            <template #top>
                <VResizable
                    :direction="
                        sidebarStore.config.stacked ? 'vertical' : 'horizontal'
                    "
                    :[sidebarConfig.attr]="sidebarConfig.value"
                >
                    <template #top>
                        <VSidebar />
                    </template>
                    <template #bottom>
                        <VSecondarySidebar />
                    </template>
                </VResizable>
            </template>
            <template #bottom>
                <div class="workspace">
                    <header class="main-header"></header>
                    <div
                        ref="mainContentRef"
                        class="main-content"
                    >
                        <VCanvas>
                            <VCard title="Node Tree A" />
                            <VCard title="Node Tree B" />
                        </VCanvas>
                        <VModal
                            v-if="mainContentRef"
                            :open="isOpenModal"
                            :to="mainContentRef"
                            full-height
                            align="right"
                            :fullscreen="isFullscreenModal"
                        >
                            <VNodeContent
                                :fullscreen="isFullscreenModal"
                                @close="closeModal"
                                @fullscreen="enterFullscreen"
                                @exit-fullscreen="exitFullscreen"
                            />
                        </VModal>
                    </div>
                </div>
            </template>
        </VResizable>
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

.sidebars {
    display: flex;

    &.is-stacked {
        flex-direction: column;
    }
}

.workspace {
    height: 100%;
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
