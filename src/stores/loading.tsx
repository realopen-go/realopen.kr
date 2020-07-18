import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";

enum ACTION_TYPES {
  LOADING_START = "LOADING_START",
  LOADING_FINISH = "LOADING_FINISH",
}

type Action =
  | {
      type: ACTION_TYPES.LOADING_START;
      message?: string;
    }
  | {
      type: ACTION_TYPES.LOADING_FINISH;
    };

interface State {
  loading: boolean;
  message: string;
}

const INITIAL_STATE: State = {
  loading: false,
  message: "",
};

const reducer: Reducer<State, Action> = (_: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.LOADING_FINISH:
      return {
        loading: false,
        message: "",
      };
    case ACTION_TYPES.LOADING_START:
      return {
        loading: true,
        message: action.message || "로딩중입니다",
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

export const useLoadingStore = () => {
  const { state, dispatch } = useContext(Context);

  const finishLoading = useCallback((): void => {
    dispatch({
      type: ACTION_TYPES.LOADING_FINISH,
    });
  }, [dispatch]);

  const startLoading = useCallback(
    ({ message }: { message?: string } = {}): void => {
      dispatch({
        type: ACTION_TYPES.LOADING_START,
        message,
      });
    },
    [dispatch]
  );

  return {
    state,
    finishLoading,
    startLoading,
  };
};
