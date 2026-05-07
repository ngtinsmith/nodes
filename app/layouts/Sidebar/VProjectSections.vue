<script setup lang="ts">
import type { IGroup } from '~/stores/sidebar/interfaces';
import VSidebarGroup, { type SidebarGroupProps } from './VSidebarGroup.vue';
import { useSections } from '~/stores/sections';

const sectionsStore = useSections();

const sidebarGroups = computed(() =>
    sectionsStore.sectionGroups.map<SidebarGroupProps>((group, i) => {
        return {
            id: group.tag?.id || i,
            heading: group.tag?.title || 'Section Group',
            sections: group.sections.map<IGroup>((section) => ({
                id: section.id,
                active: section.active,
                label: section.title,
            })),
        };
    }),
);
</script>

<template>
    <aside class="v-sidebar">
        <div class="top">
            <div class="sidebar-controls">
                <button class="dropdown-toggle">
                    <span>Cosmic Project</span>
                    <ChevronDown />
                </button>
                <button class="thumb-bar">
                    <ThumbnailBar />
                </button>
            </div>
        </div>
        <div class="content">
            <VSidebarGroup
                v-for="(group, i) in sidebarGroups"
                :key="i"
                :heading="group.heading"
                :sections="group.sections"
            />
        </div>
    </aside>
</template>

<style lang="scss" scoped>
.v-sidebar {
    min-width: 280px;
    height: 100%;
    background-color: var(--slate-900);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--resizable-border-color);
}

.top {
    height: rem(48);
    width: 100%;
    color: black;
}

.sidebar-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: rem(48);
    padding-inline: rem(24);
}

.dropdown-toggle {
    display: flex;
    align-items: center;
    gap: rem(8);
    padding: rem(4) rem(12);
    border-radius: rem(8);

    &:hover {
        background-color: var(--transparent-white-5);
    }

    span {
        flex: 1;
        font-size: rem(14);
        font-weight: 700;
        text-align: left;
        color: var(--gray-200);
    }

    svg {
        fill: var(--slate-50);
    }
}

.thumb-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(4) rem(4);

    &:hover {
        background-color: var(--transparent-white-10);
    }
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: rem(24);
    padding: rem(16) rem(24);
    overflow-y: auto;
}
</style>
