<template>
    <div class="canvas">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.canvas {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    height: 100%;
    background-color: var(--v-indigo-200);
}
</style>
