<script lang="ts" setup>
interface Props {
    checked: boolean;
    onClick: () => void;
}

defineProps<Props>();
</script>

<template>
    <input
        class="v-checkbox"
        type="checkbox"
        :checked="checked"
        @click="onClick"
    />
</template>

<style lang="scss" scoped>
$size: 14;

.v-checkbox {
    appearance: none;
    print-color-adjust: exact;
    display: inline-block;
    background-origin: border-box;
    user-select: none;
    flex-shrink: 0;
    height: rem($size);
    width: rem($size);
    color: var(--v-yellow-200);
    background-color: transparent;
    border-color: var(--v-slate-600);
    border-width: 2px;
    border-radius: 2px;

    &:checked {
        border-color: transparent;
        background-color: currentColor;
        background-image: url('assets/icons/checkmark.svg');
        background-size: 70% 70%;
        background-position: 50%;
        background-repeat: no-repeat;

        &:focus,
        &:hover {
            border-color: transparent;
            background-color: currentColor;
        }
    }
}
</style>
