import { useRecoilState } from 'recoil';
import { todoState } from '../state/atoms';
import './TodoCard.css';

export default function TodoCard() {
    const [items, setItems] = useRecoilState(todoState);

    return (
        <>
            {
                items.map(item => (
                    <p key={item.id}>{item.title}</p>
                ))
            }
        </>
    )
}
