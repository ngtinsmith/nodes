<script lang="ts" setup>
import VDocumentCount from './atoms/VDocumentCount.vue';
import Notes from '/public/assets/icons/notes.svg?component';

interface Props {
    documents: number;
    notes: number;
}

defineProps<Props>();
</script>

<template>
    <div class="document-overview">
        <VDocumentCount
            label="documents"
            :count="documents"
        />
        <VDocumentCount
            label="notes"
            :count="notes"
        >
            <Notes />
        </VDocumentCount>
    </div>
</template>

<style lang="scss" scoped>
.document-overview {
    display: flex;
    gap: rem(16);
    align-items: center;

    svg {
        fill: var(--v-indigo-300);
    }

    span {
        font-size: rem(12);
        color: var(--v-gray-400);
        margin-left: rem(6);
    }

    .documents {
        display: flex;
        align-items: center;
    }

    .notes {
        display: flex;
        align-items: center;
    }
}
</style>
