<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

interface Props {
    top?: number;
    left?: number;
    direction: 'vertical' | 'horizontal';
}

const props = defineProps<Props>();

const containerRef = ref<HTMLDivElement | null>(null);
const topRef = ref<HTMLDivElement | null>(null);
const bottomRef = ref<HTMLDivElement | null>(null);
const handleRef = ref<HTMLDivElement | null>(null);

const defaultTopHeight = props.top ?? 50;
const defaultLeftWidth = props.left ?? 50;

const dragging = ref(false);

const pointer = reactive({
    x: 0,
    y: 0,
});

const blockSize = reactive({
    width: defaultLeftWidth,
    height: defaultTopHeight,
});

const blockRect = reactive({
    top: 0,
    left: 0,
});

const pointerDownHandler = function (e: PointerEvent) {
    if (e.target instanceof HTMLElement) {
        e.target.setPointerCapture(e.pointerId);
    }

    dragging.value = true;

    pointer.x = e.clientX;
    pointer.y = e.clientY;

    const topRect = topRef.value?.getBoundingClientRect();

    blockRect.top = topRect?.height ?? 0;
    blockRect.left = topRect?.width ?? 0;
};

const pointerMoveHandler = function (e: PointerEvent) {
    if (!dragging.value) return;

    const dx = e.clientX - pointer.x;
    const dy = e.clientY - pointer.y;

    const bodyRect = containerRef.value?.getBoundingClientRect();
    const newTopHeight = ((blockRect.top + dy) * 100) / (bodyRect?.height ?? 0);
    const newLeftWidth = ((blockRect.left + dx) * 100) / (bodyRect?.width ?? 0);

    blockSize.height = newTopHeight;
    blockSize.width = newLeftWidth;
};

const pointerUpHandler = function (e: PointerEvent) {
    if (e.target instanceof HTMLElement) {
        e.target.releasePointerCapture(e.pointerId);
    }

    dragging.value = false;
};

const doubleClickHandle = () => {
    blockSize.height = defaultTopHeight;
    blockSize.width = defaultLeftWidth;
};

const blockStyle = computed(() => {
    return props.direction === 'vertical'
        ? {
              first: { height: `${blockSize.height}%` },
              second: { height: `${100 - blockSize.height}%` },
          }
        : {
              first: { width: `${blockSize.width}%` },
              second: { width: `${100 - blockSize.width}%` },
          };
});
</script>

<template>
    <div
        ref="containerRef"
        :class="['resizable', { 'is-stacked': direction === 'vertical' }]"
    >
        <div
            ref="topRef"
            class="top"
            :style="blockStyle.first"
        >
            <slot name="top" />
        </div>
        <div
            ref="handleRef"
            :class="[
                'handle-container',
                direction === 'vertical' ? 'row' : 'col',
            ]"
            @pointerdown="pointerDownHandler"
            @pointerup="pointerUpHandler"
            @pointermove="pointerMoveHandler"
        >
            <button
                class="handle"
                @dblclick="doubleClickHandle"
            />
        </div>
        <div
            ref="bottomRef"
            class="bottom"
            :style="blockStyle.second"
        >
            <slot name="bottom" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.resizable {
    display: flex;
    width: 100%;
    height: 100%;

    &.is-stacked {
        flex-direction: column;
    }
}

.top {
    border-bottom: 1px solid #555;
}

.handle-container {
    position: relative;

    &.row {
        width: 100%;

        .handle {
            --height: 12px;

            top: calc((var(--height) / 2) * -1);
            width: 100%;
            height: var(--height);
            cursor: row-resize;
        }
    }

    &.col {
        height: 100%;

        .handle {
            --width: 12px;

            left: calc((var(--width) / 2) * -1);
            width: var(--width);
            height: 100%;
            cursor: col-resize;
        }
    }

    .handle {
        position: absolute;
        background-color: transparent;
        z-index: 1;

        &:hover {
            background-color: rgba($color: white, $alpha: 0.1);
        }

        &:active {
            background-color: rgba($color: white, $alpha: 0.08);
        }
    }
}
</style>
