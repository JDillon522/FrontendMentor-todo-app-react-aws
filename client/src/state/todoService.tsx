import { SetterOrUpdater, useRecoilState } from "recoil";
import { ItemStatus } from "../yeet/Yeet";
import { IItem, ITodoState, todoState, updateFilteredItems } from "./atoms";

export const todoService = {
  getTasks: async (): Promise<IItem[]> => {
    const res = await fetch('/api/items');

    if (!res.ok) {
      throw new Error(`ERROR: Fetch items. ${res.status}`);
    }
    const data = await res.json();
    return data;
  },

  createTask: async (item: IItem): Promise<IItem[]> => {
    const res = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`ERROR: Create item. ${res.status}`);
    }
    const data = await res.json();
    return data;
  },

  updateTask: async (item: IItem): Promise<IItem[]> => {
    const res = await fetch('/api/items', {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`ERROR: Update items. ${res.status}`);
    }
    const data = await res.json();
    return data;
  },

  deleteTask: async (item: IItem): Promise<IItem[]> => {
    const res = await fetch(`/api/items/${item.id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`ERROR: Delete items. ${res.status}`);
    }
    const data = await res.json();
    return data;
  },
}

export async function getAllAndUpdate(state: ITodoState, setItems: SetterOrUpdater<ITodoState>): Promise<void> {
  const items = await todoService.getTasks();
  const filtered = updateFilteredItems(items, ItemStatus.all);

  setItems({
    ...state,
    items: items,
    filteredItems: filtered
  });
}

export async function updateAndGetAll(item: IItem, state: ITodoState, setItems: SetterOrUpdater<ITodoState>): Promise<void> {
  const items = await todoService.updateTask(item);
  const filtered = updateFilteredItems(items, ItemStatus.all);

  setItems({
    ...state,
    items: items,
    filteredItems: filtered
  });
}

export async function createAndGetAll(item: IItem, state: ITodoState, setItems: SetterOrUpdater<ITodoState>): Promise<void> {
  const items = await todoService.createTask(item);
  const filtered = updateFilteredItems(items, ItemStatus.all);

  setItems({
    ...state,
    items: items,
    filteredItems: filtered
  });
}

export async function deleteAndGetAll(item: IItem, state: ITodoState, setItems: SetterOrUpdater<ITodoState>): Promise<void> {
  const items = await todoService.deleteTask(item);
  const filtered = updateFilteredItems(items, ItemStatus.all);

  setItems({
    ...state,
    items: items,
    filteredItems: filtered
  });
}
