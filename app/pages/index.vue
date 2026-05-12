<template>
    <AppHeader />
    <main v-bind="$attrs">
        <HomepageHero />
        <TrialBanner />
    </main>
    <AppFooter />
</template>

<style lang="scss" scoped>
main {
    flex: 1;
}
</style>
