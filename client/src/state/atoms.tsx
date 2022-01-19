import { atom, selector } from "recoil";
export interface IItem {
    id: number;
    title: string;
    description: string;
    state: number;
}

export const todoState = atom({
    key: 'todoState',
    default: [] as IItem[]
});

export const todoItemsSelector = selector({
    key: 'todoTasks',
    get: ({get}) => {
        const state = get(todoState);
        return state;
    }
})
