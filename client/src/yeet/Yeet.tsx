import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, todoState } from "../state/atoms";
import { checkAuthState } from "../state/auth.service";
import { getAllAndUpdate } from "../state/todo.service";

export enum ItemStatus {
    all = 0,
    draft = 1,
    pending = 2,
    complete = 3,
}

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
    const [todo_state, todo_setItems] = useRecoilState(todoState);
    const [auth_state, auth_setItems] = useRecoilState(authState);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            // check if logged in
            const isLoggedIn = await checkAuthState();

            if (isLoggedIn) {
                auth_setItems({
                    ...auth_state,
                    isLoggedIn: isLoggedIn
                });

                // Load todos from api
                getAllAndUpdate(todo_state, todo_setItems);
            } else if (!/confirm|register/.test(window.location.pathname)) {
                navigate('/auth/login');
            }

        })();
    }, []);

    return (<></>);
}
