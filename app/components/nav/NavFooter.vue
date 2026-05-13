<template>
    <footer>
        <div class="container">
            <div class="content">
                <p>© 2026 - Fractal Notes</p>
                <NuxtLink
                    class="social-link"
                    to="https://github.com/ngtinsmith/nodes"
                >
                    <Github />
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    height: rem(60);
    background-color: var(--slate-950);
    box-shadow: inset 0px 4px 8px -4px var(--black);

    .container {
        height: 100%;
    }
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.social-link {
    display: flex;

    &:hover {
        svg {
            fill: var(--white);
        }
    }
}
</style>
