import { PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';
import { IItem, todoState, updateFilteredItems } from '../state/atoms';
import TodoItem from '../todo-item/TodoItem';
import { ItemStatus } from '../yeet/Yeet';
import './TodoCard.css';

export default function TodoCard() {
  const [state] = useRecoilState(todoState);

  return (
    <main className='TodoCard'>
      {
        state.filteredItems.map((item: IItem) => (
          <TodoItem key={item.id} item={item} />
        ))
      }
      <div className='footer'>
        <label>
          {state.filteredItems.length} items left
        </label>

        <div className="status">
          <FilterButton buttonStatus={ItemStatus.all}>All</FilterButton>
          <FilterButton buttonStatus={ItemStatus.pending}>Active</FilterButton>
          <FilterButton buttonStatus={ItemStatus.complete}>Completed</FilterButton>
        </div>

        <button>Clear Completed</button>
      </div>
    </main>
  )
}


function FilterButton(props: PropsWithChildren<{children: string, buttonStatus: ItemStatus}>) {

  const [state, setItems] = useRecoilState(todoState);

  const filterItems = (status: number): void => {
    const filtered = updateFilteredItems(state.items, status);
    setItems({
      ...state,
      filteredItems: filtered,
      activeFilter: status
    });
  };

  return (
    <button
      className={state.activeFilter === props.buttonStatus ? 'active' : ''}
      onClick={() => filterItems(props.buttonStatus)}
    >
      {props.children}
    </button>
  );
}
