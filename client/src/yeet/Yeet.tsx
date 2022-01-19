import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoState, IItem } from "../state/atoms";
import { todoService } from "../state/todoService";

/**
 * Seeing as I'm still trying to figure out the best "reacty" way to do things
 * I wasnt sure of where its best to kick off the initial request to get state.
 * I cant do it in the App because it complains that using Recoil has to be
 * inside a recoil component, ie something thats a child to App.
 *
 * In Angular I can kick it off from wherever the hell I want. This annoys me.
 * So out of immature spite I created this function to "yeet" off any initial
 * api requests to get and set state.
 */
export default function Yeet() {
    const setItems = useRecoilState(todoState)[1];

    useEffect(() => {
        todoService.getTasks().then((items: IItem[]) => {
            setItems(items);
        });
    }, [setItems]);

    return (<></>);
}
