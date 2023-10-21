<script setup lang="ts">
// TODO: better name
import type { TSummary } from '@/stores/summary/interfaces';
import Locked from '/public/assets/icons/locked.svg?component';
import Pinned from '/public/assets/icons/pinned.svg?component';
import VProgressOverview from './VProgressOverview.vue';
import VDocumentOverview from './VDocumentOverview.vue';

interface Props {
    summary: TSummary;
}

const { summary } = defineProps<Props>();
</script>

<template>
    <div :class="['v-group-item', { active: summary.active }]">
        <div class="top">
            <div class="label">
                <Locked v-if="summary.locked" />
                <span>{{ summary.title }}</span>
            </div>
            <div class="flags">
                <Pinned v-if="summary.pinned" />
            </div>
        </div>
        <div class="bottom">
            <VProgressOverview
                v-if="summary.type === 'todo'"
                :current="summary.progressCurrent"
                :total="summary.progressTotal"
            />
            <VDocumentOverview
                v-if="summary.type === 'document'"
                :documents="summary.countDocs"
                :notes="summary.countNotes"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.v-group-item {
    position: relative;
    padding: rem(16) rem(24) rem(16) rem(32);

    &.active {
        background-color: var(--v-transparent-white-5);

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-left: rem(6) solid var(--v-indigo-300);
        }
    }
}

.top {
    display: flex;
    justify-content: space-between;
    margin-bottom: rem(8);

    .label {
        --label-color: var(--v-slate-50);

        display: flex;
        align-items: center;
        gap: rem(10);

        svg {
            fill: var(--label-color);
        }

        span {
            color: var(--label-color);
            font-weight: 700;
        }
    }

    .flags {
        display: flex;
        align-items: center;

        svg {
            fill: var(--v-emerald-200);
        }
    }
}
</style>
