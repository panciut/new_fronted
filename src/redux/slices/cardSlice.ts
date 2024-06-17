import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  cards: any[];
}

const initialState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<any>) {
      state.cards.push(action.payload);
    },
    setCards(state, action: PayloadAction<any[]>) {
      state.cards = action.payload;
    },
  },
});

export const { addCard, setCards } = cardSlice.actions;

export default cardSlice.reducer;
