import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";

import api from "../lib/api";

export type Bill = {
  bill_id: string;
  bill_title: string;
  content?: string;
};

export type User = {
  id: string;
  username: string;
};

enum ACTION_TYPES {
  SIGN_IN = "SIGN_IN",
}

type Action = {
  type: ACTION_TYPES.SIGN_IN;
  user: User;
};

interface State {
  user: User | null;
}

const INITIAL_STATE: State = {
  user: null,
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
      return {
        ...prevState,
        user: action.user,
      };
    default:
      return INITIAL_STATE;
  }
};

export const Context = createContext<{
  state: typeof INITIAL_STATE;
  dispatch: (action: Action) => void;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <Context.Provider value={{ dispatch, state }}>{children}</Context.Provider>
  );
};

export const useAuthStore = () => {
  const { state, dispatch } = useContext(Context);

  const signIn = useCallback(
    async ({ password, username }: { password: string; username: string }) => {
      try {
        const { user } = await api.post("auth/signin", {
          body: {
            password,
            username,
          },
        });

        dispatch({
          type: ACTION_TYPES.SIGN_IN,
          user,
        });
      } catch (e) {
        window.alert(`${e.statusCode}: ${e.message}`);
      }
    },
    [dispatch]
  );

  return {
    ...state,
    signIn,
  };
};
