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
            <button class="pmenu">
                <Network />
                <span>Project Node</span>
                <ChevronDown />
            </button>
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
    background-color: var(--gray-900);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--gray-800);
}

.top {
    height: rem(48);
    width: 100%;
    color: black;
}

.pmenu {
    display: flex;
    align-items: center;
    width: 100%;
    height: rem(48);
    padding-inline: rem(24);

    span {
        flex: 1;
        margin-left: rem(8);
        font-weight: 700;
        text-align: left;
        color: var(--gray-200);
    }
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: rem(16);
    padding: rem(16) rem(24);
    overflow-y: auto;
}
</style>
