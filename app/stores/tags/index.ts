import { tags as tagEntries } from '~/stores/_data/tags';
import { useSections } from '../sections';

export interface Tag {
    id: string;
    title: string;
}

export const useTags = defineStore('tags', () => {
    const tags = ref<Tag[]>([]);

    const tagsMap = computed(() =>
        tags.value.reduce<Record<string, Tag>>(
            (acc, tag) => ({
                ...acc,
                [tag.id]: tag,
            }),
            {},
        ),
    );

    async function fetchSectionTags() {
        const sectionStore = useSections();

        tags.value = tagEntries.filter((tag) =>
            sectionStore.sectionTagIds.includes(tag.id),
        );
    }

    return { tags, tagsMap, fetchSectionTags };
});
