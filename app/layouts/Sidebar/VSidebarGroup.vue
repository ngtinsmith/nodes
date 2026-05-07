<script setup lang="ts">
import type { IGroup } from '~/stores/sidebar/interfaces';

export interface SidebarGroupProps {
    heading: string;
    sections: IGroup[];
    generic?: boolean;
}

defineProps<SidebarGroupProps>();
</script>

<template>
    <section>
        <h3 :class="{ generic }">
            <ListAlt /><span class="heading-name">{{ heading }}</span>
        </h3>
        <div class="sections">
            <button
                v-for="section in sections"
                :key="section.id"
                :class="[
                    'section',
                    {
                        active: section.active,
                    },
                ]"
            >
                {{ section.label }}
            </button>
        </div>
    </section>
</template>

<style lang="scss" scoped>
h3 {
    --default-color: var(--indigo-200);
    --generic-color: var(--white);

    display: flex;
    align-items: center;
    padding-inline: rem(12);
    margin-bottom: rem(12);
    gap: rem(8);

    &.generic {
        svg {
            fill: var(--generic-color);
        }

        .heading-name {
            color: var(--generic-color);
        }
    }

    svg {
        fill: var(--default-color);
    }

    .heading-name {
        font-weight: 700;
        color: var(--default-color);
    }
}

.sections {
    display: flex;
    flex-direction: column;
    gap: rem(4);
}

.section {
    padding: rem(4) rem(12);
    border-radius: rem(4);
    color: var(--slate-100);
    font-size: rem(14);
    line-height: 1.2;

    &:hover {
        background-color: var(--transparent-white-5);
    }

    &.active {
        color: var(--slate-50);
        font-weight: 700;
        background-color: var(--transparent-white-5);
        border-radius: 0 rem(4) rem(4) 0;
    }
}

button {
    width: 100%;
    height: 100%;
    text-align: left;
}
</style>
