import React, {
  createContext,
  ReactNode,
  Reducer,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { Bill } from "../models";

enum ACTION_TYPES {
  FETCH_BILLS = "FETCH_BILLS",
  SET_QUERY = "SET_QUERY",
}

type Query = {
  page: number;
  pageSize: number;
};

type Action =
  | {
      type: ACTION_TYPES.FETCH_BILLS;
      bills: Bill[];
    }
  | {
      type: ACTION_TYPES.SET_QUERY;
      query: Query;
    };

interface State {
  bills: Bill[];
  lastPage: number;
  query: Query;
}

const INITIAL_STATE: State = {
  bills: [],
  lastPage: 1,
  query: {
    page: 1,
    pageSize: 10,
  },
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
    case ACTION_TYPES.SET_QUERY:
      return {
        ...prevState,
        query: {
          ...action.query,
        },
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

export const useMyBillsContext = () => {
  const { state, dispatch } = useContext(Context);

  const initBills = useCallback(() => {
    // dispatch({
    //   type: ACTION_TYPES.FETCH_BILLS,
    //   bills: [{ bill_id: "2", bill_title: "title 2", content: "내용 " }],
    // });
  }, [dispatch]);

  const setQuery = useCallback(
    (query: { page?: number; pageSize?: number }) => {
      try {
        dispatch({
          type: ACTION_TYPES.SET_QUERY,
          query: {
            ...state.query,
            ...query,
          },
        });
      } catch (e) {
        throw e;
      }
    },
    [dispatch]
  );

  return {
    ...state,
    initBills,
    setQuery,
  };
};
