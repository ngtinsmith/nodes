import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Card, CardWithTree } from './interfaces';
import { cards as cardEntries } from '~/stores/_data/cards';
import { useNodes } from '../nodes';

export const useCards = defineStore('cards', () => {
    const nodesStore = useNodes();

    // State
    const cards = ref<Card[]>([]);

    const mappedCards = computed((): CardWithTree[] => {

        return cards.value.map((card) => {
            const rootNode = nodesStore.normalizedNodesMap[card.root_node_id];

            return {
                ...card,
                tree: rootNode?.children
                    ? {
                          ...rootNode,
                          expanded: true,
                          complete: false,
                          children: buildTree({
                              childIds: rootNode.children,
                              nodeMap: nodesStore.normalizedNodesMap,
                              nodeStatesMap: nodesStore.nodeStateMap,
                          }),
                      }
                    : null,
            };
        });
    });

    // Actions
    async function fetchCards(projectId: string) {
        cards.value = cardEntries.filter(
            (card) => card.project_id === projectId,
        );
    }

    return { cards, mappedCards, fetchCards };
});
