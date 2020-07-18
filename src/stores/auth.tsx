import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { useCookies } from "react-cookie";

import api from "../lib/api";
import { User } from "../models";

// export type Bill = {
//   bill_id: string;
//   bill_title: string;
//   content?: string;
// };

enum ACTION_TYPES {
  SIGN_IN = "SIGN_IN",
  UPDATE_ME = "UPDATE_ME",
}

type Action =
  | {
      type: ACTION_TYPES.SIGN_IN;
      user: User;
    }
  | {
      type: ACTION_TYPES.UPDATE_ME;
      user: {
        embagoMonth?: number;
      };
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
  // const [cookies, _setCookies, removeCookies] = useCookies(["token", "user"]);

  const signIn = useCallback(
    async ({
      password,
      username,
    }: {
      password: string;
      username: string;
    }): Promise<User> => {
      const result = await api.post("auth/signin", {
        body: {
          password,
          username,
        },
      });

      const user = new User({
        ...result.user,
        embagoMonth: result.user.embago_month,
      });

      dispatch({
        type: ACTION_TYPES.SIGN_IN,
        user,
      });

      return user;
    },
    [dispatch]
  );

  const updateUser = useCallback(
    async ({ embagoMonth }: { embagoMonth: number }): Promise<boolean> => {
      await api.put("users/me", {
        body: {
          embagoMonth,
        },
      });

      dispatch({
        type: ACTION_TYPES.UPDATE_ME,
        user: {
          embagoMonth,
        },
      });

      return true;
    },
    [dispatch]
  );

  return {
    state,
    signIn,
    updateUser,
  };
};
