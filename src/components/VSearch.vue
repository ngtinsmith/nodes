<script lang="ts" setup>
import Search from '/public/assets/icons/search.svg?component';

interface Props {
    context?: string;
}

const { context = 'app' } = defineProps<Props>();
</script>

<template>
    <div class="search">
        <Search />
        <label id="search-label" class="visually-hidden" for="search-input">
            Search {{ context }}
        </label>
        <input id="search-input" type="search" role="combobox" aria-autocomplete="list" aria-labelledby="search-label"
            autocomplete="off" placeholder="Search" />
    </div>
</template>

<style lang="scss" scoped>
.search {
    --field-color: var(--v-gray-500);

    display: flex;
    align-items: center;
    width: 100%;
    height: rem(48);
    padding-inline: rem(24);
    background-color: var(--v-gray-900);

    svg {
        fill: var(--field-color);
    }

    input {
        flex: 1;
        margin-left: rem(8);
        font-size: rem(14);
        background-color: transparent;
        color: var(--v-white);
        outline: 0;

        &::placeholder {
            color: var(--field-color);
        }
    }
}
</style>
