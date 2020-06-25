import React, {
  createContext,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from "react";
import api from "../lib/api";
import { Bill } from "../models";

export type BillResponse = {
  bill_id: number;
  bill_title: string;
  content?: string;
  open_status?: string;
  open_type?: string;
  processor_code?: number;
  request_content?: string;
  user_id: string;
};

enum ACTION_TYPES {
  FETCH_BILLS = "FETCH_BILLS",
  SET_QUERY = "SET_QUERY",
}

type Action =
  | {
      type: ACTION_TYPES.FETCH_BILLS;
      bills: Bill[];
      lastPage: number;
    }
  | {
      type: ACTION_TYPES.SET_QUERY;
      query: Query;
    };

type Query = {
  page: number;
  pageSize: number;
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
        lastPage: action.lastPage,
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

export const useBillsContext = () => {
  const { state, dispatch } = useContext(Context);

  const fetchAll = useCallback(async () => {
    try {
      const res = await api.get("bills", {
        params: {
          page: state.query.page,
          pageSize: state.query.pageSize,
        },
      });
      dispatch({
        type: ACTION_TYPES.FETCH_BILLS,
        bills: res.bills.map((bill: BillResponse) => new Bill(bill)),
        lastPage: res.pageCount,
      });
    } catch (e) {
      throw e;
    }
  }, [dispatch, state.query]);

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
    [dispatch, state.query]
  );

  return {
    ...state,
    fetchAll,
    setQuery,
  };
};
