<script setup lang="ts">
import type { IGroup } from '@/stores/sidebar/interfaces';
import ListAlt from '/public/assets/icons/list-alt.svg?component';

interface Props {
    heading: string;
    sections: IGroup[];
    generic?: boolean;
}

defineProps<Props>();
</script>

<template>
    <section>
        <h3 :class="{ generic }">
            <ListAlt /><span>{{ heading }}</span>
        </h3>
        <ul>
            <li
                v-for="section in sections"
                :key="section.id"
                :class="{
                    active: section.active,
                }"
            >
                <button>
                    {{ section.label }}
                </button>
            </li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
h3 {
    --default-color: var(--v-indigo-300);
    --generic-color: var(--v-white);

    display: flex;
    align-items: center;
    margin-bottom: rem(8);

    &.generic {
        svg {
            fill: var(--generic-color);
        }

        span {
            color: var(--generic-color);
        }
    }

    svg {
        fill: var(--default-color);
    }

    span {
        margin-left: rem(8);
        font-weight: 700;
        color: var(--default-color);
    }
}

ul {
    display: flex;
    flex-direction: column;
    gap: rem(2);
}

li {
    padding: rem(4) rem(12);
    border-radius: rem(4);
    color: var(--v-gray-300);

    &:hover {
        background-color: var(--v-transparent-white-5);
    }

    &.active {
        color: var(--v-gray-50);
        font-weight: 700;
        background-color: var(--v-transparent-white-5);
        border-left: 4px solid var(--v-indigo-300);
        border-radius: 0 rem(4) rem(4) 0;
    }
}

button {
    width: 100%;
    height: 100%;
    text-align: left;
}
</style>
