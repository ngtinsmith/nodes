<script lang="ts" setup>
defineProps<{
    open: boolean;
    to?: string | HTMLElement;
    position?: 'top' | 'center' | 'bottom';
    align?: 'left' | 'center' | 'right';
    fullHeight?: boolean;
    fullWidth?: boolean;
    fullscreen?: boolean;
}>();
</script>

<template>
    <Teleport :to="to">
        <div
            v-if="open"
            :class="[
                'modal',
                {
                    [`align-${align}`]: align,
                    [`position-${position}`]: position,
                    'fullscreen': fullscreen,
                },
            ]"
        >
            <div
                :class="[
                    'modal-inner',
                    {
                        'full-height': fullHeight,
                        'full-width': fullWidth,
                    },
                ]"
            >
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--v-transparent-black-42);
    display: flex;

    &.fullscreen {
        position: fixed;
    }

    &.position-top {
        align-items: flex-start;
    }

    &.position-center {
        align-items: center;
    }

    &.position-bottom {
        align-items: flex-end;
    }

    &.align-left {
        justify-content: flex-start;
    }

    &.align-center {
        justify-content: center;
    }

    &.align-right {
        justify-content: flex-end;
    }
}

.modal-inner {
    &.full-height {
        height: 100%;
    }

    &.full-width {
        flex: 1;
    }
}
</style>
