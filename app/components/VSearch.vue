<script lang="ts" setup>
import { useSidebar } from '~/stores/sidebar';

interface Props {
    context?: string;
}

const { context = 'app' } = defineProps<Props>();
const sidebarStore = useSidebar();
</script>

<template>
    <div
        :class="[
            'search',
            {
                stacked: sidebarStore.config.stacked,
            },
        ]"
    >
        <Search />
        <label
            id="search-label"
            class="visually-hidden"
            for="search-input"
        >
            Search {{ context }}
        </label>
        <div></div>
        <input
            id="search-input"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-labelledby="search-label"
            autocomplete="off"
            placeholder="Search"
        />
    </div>
</template>

<style lang="scss" scoped>
.search {
    --field-color: var(--gray-500);

    display: flex;
    align-items: center;
    width: 100%;
    height: rem(48);
    padding-inline: rem(24);
    background-color: var(--slate-900);

    &.stacked {
        padding-left: rem(36);
    }

    svg {
        fill: var(--field-color);
    }

    input {
        flex: 1;
        margin-left: rem(8);
        font-size: rem(14);
        background-color: transparent;
        color: var(--white);
        outline: 0;

        &::placeholder {
            color: var(--field-color);
        }
    }
}
</style>
