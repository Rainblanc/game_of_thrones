import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from 'interfaces/pagination';
import { BookItem, CharacterItem, HouseItem } from 'store/types/resource';

export interface resourceState {
  root: { name: string; identifier: string; url: string }[];
  books: {
    list: Pagination<BookItem>;
    detail?: BookItem;
  };
  characters: {
    list: Pagination<CharacterItem>;
    detail?: CharacterItem;
  };
  houses: {
    list: Pagination<HouseItem>;
    detail?: HouseItem;
  };
}

const initialState: resourceState = {
  root: [],
  books: {
    list: {
      page: 1,
      pageSize: 10,
      totalPage: 0,
      data: [],
    },
  },
  characters: {
    list: {
      page: 1,
      pageSize: 10,
      totalPage: 0,
      data: [],
    },
  },
  houses: {
    list: {
      page: 1,
      pageSize: 10,
      totalPage: 0,
      data: [],
    },
  },
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setRootResources(state, { payload }: PayloadAction<{ name: string; identifier: string; url: string }[]>) {
      state.root = payload;
    },
    setBookResources(state, { payload }: PayloadAction<Pagination<BookItem>>) {
      state.books.list = payload;
    },
    setHouseResources(state, { payload }: PayloadAction<Pagination<HouseItem>>) {
      state.houses.list = payload;
    },
    setCharacterResources(state, { payload }: PayloadAction<Pagination<CharacterItem>>) {
      state.characters.list = payload;
    },
    setBookDetail(state, { payload }: PayloadAction<BookItem>) {
      state.books.detail = payload;
    },
    setHouseDetail(state, { payload }: PayloadAction<HouseItem>) {
      state.houses.detail = payload;
    },
    setCharacterDetail(state, { payload }: PayloadAction<CharacterItem>) {
      state.characters.detail = payload;
    },
  },
});

export const resourceReducer = resourceSlice.reducer;

export const resourceActions = resourceSlice.actions;

export const { caseReducers } = resourceSlice;
