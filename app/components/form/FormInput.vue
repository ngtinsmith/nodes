<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

defineProps<{
    id: string;
    type: InputTypeHTMLAttribute;
    name: string;
    label: string;
    required?: boolean;
    placeholder?: string;
}>();
</script>

<template>
    <div class="form-input">
        <div class="label-row">
            <label for="email">{{ label }}</label>
            <slot name="label-right" />
        </div>
        <input
            :id="id"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            :required="required"
        />
    </div>
</template>

<style lang="scss" scoped>
.form-input {
    width: 100%;
}

.label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(8);
}

label {
    font-size: rem(14);
    font-weight: 500;
    color: var(--slate-200);
}

input {
    font-size: rem(14);
    line-height: 1.4;
    width: 100%;
    height: rem(48);
    padding: rem(8) rem(16);
    border: 1px solid var(--slate-700);
    border-radius: rem(8);
    background-color: unset;
    color: var(--slate-50);

    &:focus-visible {
        outline: 1px solid var(--emerald-300);
    }
}
</style>
