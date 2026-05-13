<template>
    <div class="header">
        <div class="container">
            <div class="content">
                <NuxtLink
                    class="btn-home"
                    to="/"
                >
                    <ArrowLeft />
                    <span>Back to home</span>
                </NuxtLink>
            </div>
        </div>
    </div>
    <main v-bind="$attrs">
        <slot />
    </main>
    <NavFooter />
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    height: 100px;
}

.content {
    display: flex;
    align-items: center;
    height: 100%;
}

.btn-home {
    display: flex;
    align-items: center;
    gap: rem(8);
    color: var(--slate-400);
    transition: color 0.15s ease-in;

    &:hover {
        color: var(--slate-200);

        svg {
            fill: var(--slate-200);
        }
    }

    svg {
        fill: var(--slate-400);
    }
}
</style>
