<script lang="ts" setup>

defineProps<{
    focused: boolean;
}>();

defineEmits<{
    toggle: [];
    addInto: [];
    deleteNode: [];
    addAbove: [];
    addBelow: [];
    duplicate: [];
    expand: [];
}>();
</script>

<template>
    <div class="node-controls">
        <div class="primary">
            <div class="left">
                <button class="btn-expand" @click="$emit('expand')">
                    <UnfoldMore />
                </button>
            </div>
            <div class="right">
                <button
                    class="sub-control"
                    @click="$emit('toggle')"
                >
                    <Network />
                </button>
                <button @click="$emit('addInto')">
                    <AddOutlineBox />
                </button>
                <button @click="$emit('deleteNode')">
                    <Trash />
                </button>
            </div>
        </div>
        <div
            v-if="focused"
            class="secondary"
        >
            <button @click="$emit('addAbove')">
                <AddAbove />
            </button>
            <button @click="$emit('addBelow')">
                <AddBelow />
            </button>
            <button @click="$emit('duplicate')">
                <Duplicate />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$control-gap: 10;
$icon-size: 20;

.node-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: rem($control-gap);
    margin-left: rem(8);

    svg {
        width: rem($icon-size);
        height: rem($icon-size);
        fill: var(--slate-500);
    }
}

.primary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(8);
    flex: 1;

    .left,
    .right {
        display: flex;
        align-items: center;
        gap: rem(8);
    }
}

.secondary {
    display: flex;
    position: absolute;
    column-gap: rem($control-gap);
    right: rem(-12);
    background-color: var(--slate-800);
    bottom: rem(-48);
    padding: rem(8) rem(12);
    border-radius: rem(8);
    z-index: 1;
}

.btn-expand {
    svg {
        fill: var(--indigo-200);
    }
}
</style>
