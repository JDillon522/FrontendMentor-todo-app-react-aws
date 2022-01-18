import { atom, selector } from "recoil";

export const todoState = atom({
    key: 'todoState',
    default: {
        tasks: []
    }
});

export const todoTasks = selector({
    key: 'todoTasks',
    get: ({get}) => {
        const todo = get(todoState);
        return todo.tasks;
    }
})
