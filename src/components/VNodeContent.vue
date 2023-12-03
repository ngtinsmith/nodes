<script lang="ts" setup>
import { ref } from 'vue';
import Close from '/public/assets/icons/close.svg?component';
import Locked from '/public/assets/icons/locked.svg?component';
import ChevronDownOutline from '/public/assets/icons/chevron-down-outline.svg?component';
import EllipsisHorizontal from '/public/assets/icons/ellipsis-horizontal.svg?component';
import ExpandContent from '/public/assets/icons/expand-content.svg?component';
import CollapseContent from '/public/assets/icons/collapse-content.svg?component';

defineProps<{
    fullscreen?: boolean;
}>();

defineEmits<{
    close: [];
    fullscreen: [];
    'exit-fullscreen': [];
}>();

const saving = ref(false);
</script>

<template>
    <div
        :class="[
            'node-content',
            {
                fullscreen: fullscreen,
            },
        ]"
    >
        <div class="header">
            <div class="left">
                <button class="btn-labelled">
                    <Locked class="icon-locked" />
                    <span>Locked</span>
                </button>
            </div>
            <div class="right">
                <button>
                    <EllipsisHorizontal />
                </button>
                <button
                    v-if="fullscreen"
                    @click="$emit('exit-fullscreen')"
                >
                    <CollapseContent />
                </button>
                <button
                    v-else
                    @click="$emit('fullscreen')"
                >
                    <ExpandContent />
                </button>
                <button @click="$emit('close')">
                    <Close />
                </button>
            </div>
        </div>
        <div class="content">
            <h2>Ratio enim nostra consentit pugnat loratio.</h2>
            <textarea
                name=""
                id=""
            >
## Sub Headiing
---

Dici enim nihil potest verius. Utilitatis causa amicitia est quaesita. Laboro autem non sine causa; Sed in rebus apertissimis nimium longi sumus. Id Sextilius factum negabat. Nunc agendum est subtilius. 

Quo tandem modo? Ex rebus enim timiditas, non ex vocabulis nascitur. Sedulo, inquam, faciam. Sed ille, ut dixi, vitiose.

## Sub heading
---

Memini vero, inquam; Non est igitur summum malum dolor. Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Eaedem enim utilitates poterunt eas labefactare atque pervertere. 

Non risu potius quam oratione eiciendum? Quis istum dolorem timet? Sed residamus, inquit, si placet. Nemo nostrum istius generis asotos iucunde putat vivere. Egone quaeris, inquit, quid sentiam?

Quo tandem modo? Ex rebus enim timiditas, non ex vocabulis nascitur. Sedulo, inquam, faciam. Sed ille, ut dixi, vitiose.
            </textarea>
        </div>
        <div class="footer">
            <div class="left">
                <span v-if="saving">Saving changes...</span>
                <span v-else>Changes saved...</span>
            </div>
            <div class="right">
                <button class="f-dropdown">
                    <span>Markdown</span>
                    <ChevronDownOutline />
                </button>
                <button class="f-dropdown">16px</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.node-content {
    --border-color: var(--v-gray-100);
    --locked-color: var(--v-indigo-500);

    display: flex;
    flex-direction: column;
    width: 600px;
    height: 100%;
    background-color: var(--v-white);
    color: black;

    &.fullscreen {
        width: 100vw;
    }
}

.header {
    display: flex;
    justify-content: space-between;
    padding: rem(12) rem(16);
    border-bottom: 1px solid var(--border-color);

    .left {
        display: flex;
    }

    .right {
        display: flex;
        gap: rem(12);

        svg {
            fill: var(--v-slate-800);
        }
    }
}

.content {
    display: flex;
    flex-direction: column;
    gap: rem(40);
    flex: 1;
    padding: rem(32) rem(40);

    h2 {
        font-size: rem(40);
        font-weight: 700;
        color: var(--v-slate-900);
    }

    textarea {
        flex: 1;
        width: 100%;
        font-size: rem(18);
        color: var(--v-slate-900);
        resize: none;
    }
}

.footer {
    display: flex;
    justify-content: space-between;
    padding: rem(12) rem(16);
    border-top: 1px solid var(--border-color);
    color: var(--v-slate-700);
    font-size: rem(14);

    .left {
        display: flex;
    }

    .right {
        display: flex;
        gap: rem(12);

        .f-dropdown {
            display: flex;
            align-items: center;

            svg {
                fill: var(--v-slate-500);
                margin-left: rem(4);
            }
        }
    }
}

.btn-labelled {
    display: flex;
    align-items: center;
    gap: rem(4);

    svg {
        fill: var(--locked-color);
    }

    span {
        color: var(--locked-color);
        font-weight: 700;
    }
}
</style>
