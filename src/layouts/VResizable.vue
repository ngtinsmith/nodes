<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface Props {
    top?: number;
}

const props = defineProps<Props>();

const containerRef = ref<HTMLDivElement | null>(null);
const topRef = ref<HTMLDivElement | null>(null);
const bottomRef = ref<HTMLDivElement | null>(null);
const handleRef = ref<HTMLDivElement | null>(null);

const x = ref(0);
const y = ref(0);

const dragging = ref(false);
const defaultTopHeight = props.top ?? 40;
const topHeight = ref(defaultTopHeight);
const topHeightRect = ref(0);

const pointerDownHandler = function (e: PointerEvent) {
    if (e.target instanceof HTMLElement) {
        e.target.setPointerCapture(e.pointerId);
    }

    dragging.value = true;

    x.value = e.clientX;
    y.value = e.clientY;

    topHeightRect.value = topRef.value?.getBoundingClientRect().height ?? 0;
};

const pointerMoveHandler = function (e: PointerEvent) {
    if (!dragging.value) return;

    const dy = e.clientY - y.value;
    const bodyHeight = containerRef.value?.getBoundingClientRect().height ?? 0;
    const newTopHeight = ((topHeightRect.value + dy) * 100) / bodyHeight;

    topHeight.value = newTopHeight;
};

const pointerUpHandler = function (e: PointerEvent) {
    if (e.target instanceof HTMLElement) {
        e.target.releasePointerCapture(e.pointerId);
    }

    dragging.value = false;
};

const boudleClickHandle = () => {
    topHeight.value = defaultTopHeight;
};

onMounted(() => {
    if (handleRef.value) {
        handleRef.value.addEventListener('pointermove', pointerMoveHandler);
        handleRef.value.addEventListener('pointerup', pointerUpHandler);
    }
});

onBeforeUnmount(() => {
    if (handleRef.value) {
        handleRef.value.removeEventListener('pointermove', pointerMoveHandler);
        handleRef.value.removeEventListener('pointerup', pointerUpHandler);
    }
});
</script>

<template>
    <div
        ref="containerRef"
        class="resizable"
    >
        <div
            ref="topRef"
            class="top"
            :style="{ height: `${topHeight}%` }"
        >
            <slot name="top" />
        </div>
        <div
            ref="handleRef"
            class="handle-container"
            @pointerdown="pointerDownHandler"
        >
            <button
                class="handle"
                @dblclick="boudleClickHandle"
            />
        </div>
        <div
            ref="bottomRef"
            class="bottom"
            :style="{ height: `${100 - topHeight}%` }"
        >
            <slot name="bottom" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.resizable {
    height: 100%;
}

.top {
    border-bottom: 1px solid #555;
}

.handle-container {
    position: relative;
    width: 100%;
}

.handle {
    --height: 12px;

    position: absolute;
    top: calc((var(--height) / 2) * -1);
    width: 100%;
    height: var(--height);
    background-color: transparent;
    cursor: row-resize;
    z-index: 1;

    &:hover {
        background-color: rgba($color: white, $alpha: 0.1);
    }

    &:active {
        background-color: rgba($color: white, $alpha: 0.08);
    }
}
</style>
