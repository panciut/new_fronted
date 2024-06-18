// src/redux/slices/cardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Input {
    _id: string;
    prompt: string;
    context: string;
}

interface Output {
    _id: string;
    generatedText: string;
    evaluationMetrics: {
        _id: string;
        type: string;
        evaluationDescription: string;
        evaluationResult: number;
    }[];
}

interface Card {
    _id: string;
    title: string;
    objective: string;
    generativeModel: string;
    previousCards: string[];
    nextCards: string[];
    inputs: Input[];
    output: Output | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    executed: boolean;
    evaluated: boolean; // Add this line to include the evaluated property
}

interface CardState {
    cards: Card[];
}

const initialState: CardState = {
    cards: [],
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards(state, action: PayloadAction<Card[]>) {
            state.cards = action.payload;
        },
    },
});

export const { setCards } = cardSlice.actions;
export default cardSlice.reducer;
