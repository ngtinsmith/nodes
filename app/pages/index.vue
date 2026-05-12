<template>
    <NavHeader />
    <main v-bind="$attrs">
        <HeroHomepage />
        <BannerTrial />
    </main>
    <NavFooter />
</template>

<style lang="scss" scoped>
main {
    flex: 1;
}
</style>
