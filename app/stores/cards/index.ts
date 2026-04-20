import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Card } from './interfaces';

export const useCards = defineStore('cards', () => {
    // State
    const cards = ref<Card[]>([]);

    // Getters

    // Actions
    function setCards(cardEntries: Card[]) {
        cards.value = cardEntries;
    }

    return { cards, setCards };
});
