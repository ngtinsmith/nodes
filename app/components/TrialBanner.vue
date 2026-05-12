<template>
    <div class="trial-banner">
        <div class="container">
            <div class="content">
                <button class="btn-demo">Try Demo</button>
                <button class="btn-learn">Learn More</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.trial-banner {
    padding-block: rem(80);
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(16);
}

button {
    font-size: rem(16);
    font-weight: 700;
    padding: rem(16) rem(40);
    border-radius: rem(12);
}

.btn-demo {
    background-color: var(--emerald-300);
    color: var(--slate-900);
}

.btn-learn {
    color: var(--slate-50);
    border: 1px solid var(--slate-700);
}
</style>
