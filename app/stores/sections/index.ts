import { sections as sectionEntries } from '~/stores/_data/sections';
import { useTags } from '../tags';

export interface Section {
    id: string;
    title: string;
    project_id: string;
    tag_id: string;
}

export type SectionWithState = Section & { active: boolean };

export const useSections = defineStore('sections', () => {
    const tagsStore = useTags();
    const sections = ref<Section[]>([]);

    const sectionTagIds = computed(() =>
        sections.value.map((section) => section.tag_id),
    );

    const sectionGroups = computed(() => {
        const sectionMap = sections.value.reduce<
            Record<string, SectionWithState[]>
        >((acc, section, i) => {
            const entry = acc[section.tag_id];
            const sectionWithState: SectionWithState = {
                ...section,
                // TODO: get from db states
                active: i === 2,
            };

            return {
                ...acc,
                [section.tag_id]:
                    entry && Array.isArray(entry)
                        ? [...entry, sectionWithState]
                        : [sectionWithState],
            };
        }, {});

        return Object.entries(sectionMap)
            .map(([tagId, sectionGroup]) => {
                return {
                    tag: tagsStore.tagsMap[tagId],
                    sections: sectionGroup,
                };
            })
            .filter((group) => group.tag !== undefined);
    });

    async function fetchSections(projectId: string) {
        sections.value = sectionEntries.filter(
            (section) => section.project_id === projectId,
        );
    }

    return { sections, sectionTagIds, sectionGroups, fetchSections };
});
