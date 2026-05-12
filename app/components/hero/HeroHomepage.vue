<script lang="ts" setup>
const subHeadlines = [
    {
        s1: 'For the work that keeps unfolding.',
        s2: "Depth shouldn't be a distraction.",
    },
    {
        s1: 'Because projects rarely grow in a straight line.',
        s2: 'Stay centered as the work expands.',
    },
    {
        s1: 'When the details start to have their own details.',
        s2: 'Focus on the root, even as the branches grow.',
    },
    {
        s1: "Because projects aren't checklists.",
        s2: 'Give your systems room to grow.',
    },
];

const sIdx = 0;
</script>

<template>
    <div class="hero">
        <div class="headlines">
            <h1>Some tasks need a task of their own.</h1>
            <p>
                {{ subHeadlines[sIdx]?.s1 }}
                <span>{{ subHeadlines[sIdx]?.s2 }}</span>
            </p>
        </div>
        <div class="container">
            <figure class="preview-image">
                <div class="gradient-overlay" />
                <img
                    src="~/assets/images/project-preview.png"
                    alt=""
                />
            </figure>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.hero {
    display: flex;
    flex-direction: column;
    padding-top: rem(120);
}

.headlines {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;
    width: 700px;
}

h1 {
    font-size: rem(64);
    font-weight: 900;
    line-height: 1.1;
    text-align: center;
    color: var(--slate-50);
}

p {
    font-size: rem(16);
    font-weight: 500;
    line-height: 1.4;
    color: var(--slate-200);
    text-align: center;
    margin-inline: auto;
    margin-top: rem(16);

    span {
        font-weight: 400;
        color: var(--slate-400);
    }
}

.preview-image {
    position: relative;
    overflow: hidden;
    height: 870px;
    margin-top: rem(120);

    img {
        position: absolute;
        top: 0;
        left: 0;
        border-block: 1px solid var(--slate-700);
        border-left: 1px solid var(--slate-700);
    }
}

.gradient-overlay {
    position: absolute;
    width: 1015px;
    right: 0;
    height: 100%;
    top: -1;
    bottom: -1;
    z-index: 10;

    background: linear-gradient(
        90deg,
        rgba(15, 23, 42, 0.1) 0%,
        rgba(15, 23, 42, 0.44) 38.38%,
        rgba(15, 23, 42, 0.7) 70%,
        rgb(15, 23, 42) 99%
    );
}
</style>
