<script lang="ts" setup>

interface Props {
    label: string;
    count: number;
}

defineProps<Props>();
</script>

<template>
    <div class="document-count">
        <slot>
            <Article />
        </slot>
        <span>{{ count }} {{ label }}</span>
    </div>
</template>

<style lang="scss" scoped>
.document-count {
    display: flex;
    align-items: center;

    svg {
        fill: var(--indigo-300);
    }

    span {
        font-size: rem(12);
        color: var(--gray-400);
        margin-left: rem(6);
    }
}
</style>
