<script setup lang="ts">
const routes: { title: string; url: string }[] = [
    {
        title: 'Features',
        url: '/features',
    },
    {
        title: 'Demo',
        url: '/demo-subdomain',
    },
    {
        title: 'Login',
        url: '/login',
    },
];
</script>

<template>
    <header>
        <div class="container header-inner">
            <a
                class="logo"
                href="/"
            >
                <NetworkAlt />
                <p>Fractal <span class="logo-highlight">Nodes</span></p>
            </a>

            <nav>
                <ul class="nav-links">
                    <li
                        v-for="route in routes"
                        :key="route.title"
                        class="nav-link"
                    >
                        <a :href="route.url">{{ route.title }}</a>
                    </li>
                    <li class="btn-signup">
                        <a href="/sign-in">Sign Up</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    height: 100px;
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;

    @media (width >= 768px) {
        flex-direction: row;
    }
}

.logo {
    display: flex;
    align-items: center;
    gap: rem(16);

    svg {
        --logo-size: #{rem(32)};

        fill: var(--emerald-300);
        width: var(--logo-size);
        height: var(--logo-size);
    }

    p {
        font-size: rem(20);
        font-weight: 700;
        color: var(--slate-50);
    }

    .logo-highlight {
        color: var(--emerald-300);
        font-weight: 800;
    }
}

.nav-links {
    display: flex;
    align-items: center;
    gap: rem(40);
}

.nav-link {
    display: flex;

    a {
        font-weight: 700;
        padding-block: rem(4);
        border-radius: rem(4);
        color: var(--slate-50);

        &:hover {
            &::after {
                opacity: 1;
            }
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            width: 100%;
            background-color: var(--emerald-300);
            opacity: 0;
            transition: opacity 100ms ease-in;
        }
    }
}

.btn-signup {
    a {
        padding: rem(8) rem(16);
        border-radius: rem(4);
        background-color: var(--emerald-300);
        color: var(--dark-slate);
        font-weight: 700;
    }
}
</style>
