<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue';
import VCard from '~/components/VCard.vue';
import VCanvas from '~/layouts/VCanvas.vue';
import VProjectSections from '~/layouts/Sidebar/VProjectSections.vue';
import VBoards from '~/layouts/Sidebar/VBoards.vue';
import VModal from '~/components/VModal.vue';
import type { Node } from '~/stores/nodes/interfaces';
import type { NodeModal } from '~/types/modal';
import { nodeModalKey } from '~/types/symbols';
import VNodeContent from '~/components/VNodeContent.vue';
import { useSidebar } from '~/stores/sidebar';
import VResizable from '~/layouts/VResizable.vue';
import { useCards } from '~/stores/cards';
import { useProjects } from '~/stores/projects';
import BoardTab from '~/components/atoms/BoardTab.vue';
import { useBoards } from '~/stores/boards';

provide<NodeModal>(nodeModalKey, {
    expandNodeContent,
});

const mainContentRef = ref<HTMLDivElement | null>(null);
const isOpenModal = ref(false);
const isFullscreenModal = ref(false);

const sidebarStore = useSidebar();
const projectsStore = useProjects();
const cardsStore = useCards();
const boardsStore = useBoards();

const sidebarConfig = computed(() => {
    return {
        attr: sidebarStore.config.stacked ? 'top' : 'left',
        value: sidebarStore.config.stacked ? 0 : 50,
    };
});

onMounted(async () => {
    await projectsStore.loadProjects();
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
            :left="sidebarStore.config.stacked ? 25 : 40"
            root
            :stacked="sidebarStore.config.stacked"
        >
            <template
                v-if="sidebarStore.config.enabled"
                #top
            >
                <VResizable
                    :direction="
                        sidebarStore.config.stacked ? 'vertical' : 'horizontal'
                    "
                    :[sidebarConfig.attr]="sidebarConfig.value"
                >
                    <template #top>
                        <VProjectSections />
                    </template>
                    <template #bottom>
                        <VBoards />
                    </template>
                </VResizable>
            </template>
            <template #bottom>
                <div class="workspace">
                    <div class="workspace-header">
                        <div class="board-tabs">
                            <template
                                v-for="(board, i) in boardsStore.activeBoards"
                                :key="board.id"
                            >
                                <BoardTab :board="board" />
                                <div
                                    v-if="
                                        i ===
                                        boardsStore.activeBoards.length - 1
                                    "
                                    class="board-divider"
                                />
                            </template>
                        </div>
                        <div class="board-header-controls">
                            <button>
                                <ViewColumn2 />
                            </button>
                            <button>
                                <EllipsisHorizontal />
                            </button>
                        </div>
                    </div>
                    <div
                        ref="mainContentRef"
                        class="main-content"
                    >
                        <VCanvas>
                            <VCard
                                v-for="(card, i) in cardsStore.mappedCards"
                                :id="card.id"
                                :key="card.id ?? i"
                                :title="card.title"
                                :node="card.tree"
                            />
                            <button class="btn-new-card">
                                <AddFilled />
                                <span> Add new card </span>
                            </button>
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

<style lang="scss" scoped>
main {
    height: 100vh;
}

.workspace {
    height: 100%;
    overflow: hidden;
}

.workspace-header {
    display: flex;
    justify-content: space-between;
    height: rem(48);
    background-color: var(--slate-900);
}

.board-tabs {
    display: flex;
    align-items: center;
    height: 100%;
}

.board-divider {
    height: 100%;
    border-left: 1px solid var(--resizable-border-color);
}

.main-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: auto;
    height: calc(100% - rem(48));
}

.btn-new-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(4);
    height: rem(48);
    border-radius: rem(8);
    color: var(--black);
    padding: 8px 16px;
    border: 1px solid var(--slate-700);
    width: 300px;
    flex-shrink: 0;

    svg {
        fill: var(--slate-700);
    }

    span {
        font-weight: 700;
        font-size: rem(14);
        white-space: pre;
    }
}

.board-header-controls {
    display: flex;
    align-items: center;
    gap: rem(4);
    padding-right: rem(12);

    button {
        display: flex;
        padding: rem(4);
        border-radius: rem(4);

        &:hover {
            background-color: var(--transparent-white-10);
        }
    }
}
</style>
