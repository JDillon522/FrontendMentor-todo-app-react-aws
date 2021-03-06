import { orderBy } from "lodash";
import { atom, selector } from "recoil";
import { ItemStatus } from "../yeet/Yeet";

export interface IItem {
  id?: number;
  title: string;
  description: string;
  state: number;
  positionIndex: number;
}

export interface ITodoState {
  items: IItem[];
  filteredItems: IItem[];
  activeFilter: ItemStatus;
}

export const todoState = atom({
  key: 'todoState',
  default: {
    items: [],
    filteredItems: [],
    activeFilter: 0
  } as ITodoState
});

export const todoItemsSelector = selector({
  key: 'todoTasks',
  get: ({ get }) => {
    const state = get(todoState);
    return state.filteredItems;
  }
})

export const updateFilteredItems = (items: IItem[], status: ItemStatus): IItem[] => {
  return orderBy(items.filter(i => i.state === status || status === ItemStatus.all), 'id');
}

export interface AuthState {
  isLoggedIn: boolean;
  theme: 'light'|'dark';
  currentRegisterEmail: string | null;
}

export const authState = atom({
  key: 'authState',
  default: {
    isLoggedIn: false,
    // user
    theme: localStorage.getItem('theme') || 'light'
  } as AuthState
});
