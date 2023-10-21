<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebar } from '@/stores/sidebar';
import Network from '/public/assets/icons/network.svg?component';
import ChevronDown from '/public/assets/icons/chevron-down.svg?component';
import VSidebarGroup from './VSidebarGroup.vue';

const sidebarStore = useSidebar();

onMounted(() => {
    sidebarStore.fetchGroups();
});
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
                heading="Section Groups A"
                :sections="
                    sidebarStore.primaryGroup.map((s, i) => ({
                        ...s,
                        active: i === 2,
                    }))
                "
            />
            <VSidebarGroup
                heading="Section Groups B"
                :sections="sidebarStore.primaryGroup"
            />
        </div>
        <div class="bottom">
            <VSidebarGroup
                heading="Help"
                :sections="sidebarStore.bottomGroup"
                generic
            />
        </div>
    </aside>
</template>

<style lang="scss" scoped>
.v-sidebar {
    min-width: 280px;
    height: 100%;
    background-color: var(--v-gray-900);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--v-gray-800);
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
        color: var(--v-gray-200);
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

.bottom {
    padding: rem(16) rem(24);
}
</style>
