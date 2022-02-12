import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { IItem, todoState } from "../../../../state/atoms";
import { createAndGetAll } from "../../../../state/todo.service";
import { ItemStatus } from "../../../../yeet/Yeet";
import './NewTodoInput.css';
const stateOpts = ItemStatus;

export default function NewTodoInput() {
  const [state, setItems] = useRecoilState(todoState);
  const { value, bind, reset } = useInput('');

  const submitCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newItem: IItem = { title: value, description: '', state: stateOpts.pending, positionIndex: 1 };
    createAndGetAll(newItem, state, setItems);
    reset();
  }

  return (
    <form className="new-todo" onSubmit={(e: FormEvent<HTMLFormElement>) => submitCreate(e)}>
      <input placeholder="Create a new todo..." {...bind}></input>
    </form>
  )

}

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      }
    }
  };
};
