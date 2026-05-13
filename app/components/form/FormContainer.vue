<script lang="ts" setup>
defineProps<{
    title: string;
    submitText: string;
}>();
</script>

<template>
    <form class="form">
        <h4>{{ title }}</h4>
        <slot />
        <button
            class="btn-submit"
            type="submit"
        >
            {{ submitText }}
        </button>
        <p
            v-if="$slots['footnote']"
            class="footnote"
        >
            <slot name="footnote" />
        </p>
    </form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: rem(24);
    width: 360px;
}

h4 {
    font-size: rem(24);
    font-weight: 700;
    line-height: 1.2;
    color: var(--slate-50);
    text-align: center;
}

:deep(a) {
    font-weight: 500;
    color: var(--emerald-400);

    &:hover {
        text-decoration: underline;
    }
}

.btn-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    height: rem(48);
    font-size: rem(16);
    font-weight: 700;
    color: var(--dark-slate);
    background-color: var(--emerald-300);
    border-radius: rem(8);
}

.footnote {
    font-size: rem(14);
    color: var(--slate-100);
    text-align: center;
}
</style>
