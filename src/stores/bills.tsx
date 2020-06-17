import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";

export type Bill = {
  bill_id: string;
  bill_title: string;
  content?: string;
};

enum ACTION_TYPES {
  FETCH_BILLS = "FETCH_BILLS",
}

type Action = {
  type: ACTION_TYPES.FETCH_BILLS;
  bills: Bill[];
};

interface State {
  bills: Bill[];
  lastPage: number;
  page: number;
  pageSize: number;
}

const INITIAL_STATE: State = {
  bills: [],
  lastPage: 1,
  page: 1,
  pageSize: 10,
};

const reducer: Reducer<State, Action> = (
  prevState: State,
  action: Action
): State => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_BILLS:
      return {
        ...prevState,
        bills: action.bills,
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

export const useBillsContext = () => {
  const { state, dispatch } = useContext(Context);

  const initBills = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.FETCH_BILLS,
      bills: [{ bill_id: "2", bill_title: "title 2" }],
    });
  }, [dispatch]);

  return {
    ...state,
    initBills,
  };
};
