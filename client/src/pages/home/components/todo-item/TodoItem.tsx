import { cloneDeep } from 'lodash';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { IItem, todoState, updateFilteredItems } from '../../../../state/atoms';
import { updateAndGetAll, deleteAndGetAll } from '../../../../state/todo.service';
import { ItemStatus } from '../../../../yeet/Yeet';
import './TodoItem.css';


export default function TodoItem(props: { item: IItem }) {
  const [state, setItems] = useRecoilState(todoState);

  const updateItemState = (checked: boolean): void => {
    const index = state.items.findIndex(i => i.id === props.item.id);
    const items = cloneDeep(state.items);
    const newState = checked ? ItemStatus.complete : ItemStatus.pending;
    items[index].state = newState;
    const filtered = updateFilteredItems(items, state.activeFilter);
    setItems({
      ...state,
      items: items,
      filteredItems: filtered
    });
    updateAndGetAll({...props.item, state: newState}, state, setItems);
  }

  const deleteItem = () => {
    deleteAndGetAll(props.item, state, setItems);
  }

  return (
    <div className='TodoItem'>
      <p>
        <input
          type="checkbox"
          id={props.item.id + '-item'}
          checked={props.item.state === ItemStatus.complete}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateItemState(e.target.checked)}>
        </input>
        <label htmlFor={props.item.id + '-item'}>{props.item.title}</label>
        <button title="Delete item" onClick={deleteItem}>
          <img src="images/icon-cross.svg" alt="Delete" />
        </button>
      </p>
    </div>
  )
}
