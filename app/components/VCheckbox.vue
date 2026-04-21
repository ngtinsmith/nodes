<script lang="ts" setup>
defineProps<{ checked: boolean }>();
defineEmits<{ click: [] }>();
</script>

<template>
    <input
        class="v-checkbox"
        type="checkbox"
        :checked="checked"
        @click.prevent="$emit('click')"
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
    color: var(--emerald-300);
    background-color: transparent;
    border-width: 2px;
    border-style: solid;
    border-color: var(--slate-600);
    border-radius: 2px;
    cursor: pointer;

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
