<template>
    <NavHeader />
    <main v-bind="$attrs">
        <slot />
    </main>
    <NavFooter />
</template>
