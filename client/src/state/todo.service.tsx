import axios from "axios";
import { SetterOrUpdater } from "recoil";
import { ItemStatus } from "../yeet/Yeet";
import { IItem, ITodoState, updateFilteredItems } from "./atoms";
import authHeaders from "./auth.service";

/**
 * Need to find a way to logically separate executing the request and then handling the response and state update
 */
export const todoService = {
  getTasks: async (): Promise<IItem[]> => {
    const res = await axios.get('/api/items');

    if (res.status !== 200) {
      throw new Error(`ERROR: Fetch items. ${res.status}`);
    }

    return Promise.resolve(res.data);
  },

  createTask: async (item: IItem): Promise<IItem[]> => {
    const res = await axios.post('/api/items', {
      item,
    });

    if (res.status !== 201) {
      throw new Error(`ERROR: Create item. ${res.status}`);
    }

    return Promise.resolve(res.data);
  },

  updateTask: async (item: IItem): Promise<IItem[]> => {
    const res = await axios.put('/api/items', {
      item,
    });

    if (res.status !== 200) {
      throw new Error(`ERROR: Update items. ${res.status}`);
    }

    return Promise.resolve(res.data);
  },

  deleteTask: async (item: IItem): Promise<IItem[]> => {
    const res = await axios.delete(`/api/items/${item.id}`);

    if (res.status !== 200) {
      throw new Error(`ERROR: Delete items. ${res.status}`);
    }

    return Promise.resolve(res.data);
  },

  deleteCompletedTasks: async (ids: number[]): Promise<IItem[]> => {
    const res = await axios.delete('/api/items', {
      data: ids
    });

    if (res.status !== 200) {
      throw new Error(`ERROR: Delete completed items. ${res.status}`);
    }

    return Promise.resolve(res.data);
  }
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

export async function deleteAllCompleted(state: ITodoState, setItems: SetterOrUpdater<ITodoState>): Promise<void> {
  const ids: number[] = state.items.filter(i => i.state === ItemStatus.complete).map(i => i.id) as number[];
  const items = await todoService.deleteCompletedTasks(ids);
  const filtered = updateFilteredItems(items, ItemStatus.all);

  setItems({
    ...state,
    items: items,
    filteredItems: filtered
  });
}
