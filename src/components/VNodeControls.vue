<script lang="ts" setup>
import Network from '/public/assets/icons/network.svg?component';
import AddOutlineBox from '/public/assets/icons/add-outline-box.svg?component';
import Trash from '/public/assets/icons/trash.svg?component';
import AddAbove from '/public/assets/icons/add-above.svg?component';
import AddBelow from '/public/assets/icons/add-below.svg?component';
import Duplicate from '/public/assets/icons/duplicate.svg?component';
import UnfoldMore from '/public/assets/icons/unfold-more.svg?component';

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
    <div class="row-controls">
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

.row-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: rem($control-gap);
    flex: 1;
    margin-left: rem(8);
    opacity: 0;
    pointer-events: none;

    svg {
        width: rem($icon-size);
        height: rem($icon-size);
        fill: var(--v-slate-500);
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
    background-color: #1e293b;
    bottom: rem(-48);
    padding: rem(8) rem(12);
    border-radius: rem(8);
    z-index: 1;
}

.btn-expand {
    svg {
        fill: var(--v-indigo-200);
    }
}
</style>
