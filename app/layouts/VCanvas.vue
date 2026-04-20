<template>
    <div class="canvas">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.canvas {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: rem(8);
    padding: rem(8);
    width: 100%;
    height: 100%;
    background-color: var(--v-indigo-200);
    overflow-x: auto;
}
</style>
