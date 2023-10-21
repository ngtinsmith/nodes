<script lang="ts" setup>
import Document from '/public/assets/icons/article.svg?component';

interface Props {
    label: string;
    count: number;
}

defineProps<Props>();
</script>

<template>
    <div class="document-count">
        <slot>
            <Document />
        </slot>
        <span>{{ count }} {{ label }}</span>
    </div>
</template>

<style lang="scss" scoped>
.document-count {
    display: flex;
    align-items: center;

    svg {
        fill: var(--v-indigo-300);
    }

    span {
        font-size: rem(12);
        color: var(--v-gray-400);
        margin-left: rem(6);
    }
}
</style>
