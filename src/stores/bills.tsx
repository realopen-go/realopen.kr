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
  id: number;
  request_subject: string;
  request_description?: string;
  result_description?: string;
  status?: string;
  proc_org_code?: string;
  proc_org_name?: string;
  request_date: string;
  group_id: string;
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
      query: {
        page?: number;
        pageSize?: number;
        text?: string;
      };
    };

type Query = {
  page: number;
  pageSize: number;
  text: string;
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
    text: "",
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
          ...prevState.query,
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
        params: state.query,
      });

      const bills = Object.keys(res.bills)
        .map((key) => ({
          bills: res.bills[key].bills.map((b: BillResponse) => new Bill(b)),
          index: res.bills[key].index,
        }))
        .sort((billsGroup) => billsGroup.index)
        .map((billsGroup) => billsGroup.bills);

      dispatch({
        type: ACTION_TYPES.FETCH_BILLS,
        bills,
        lastPage: res.pageCount,
      });
    } catch (e) {
      throw e;
    }
  }, [dispatch, state.query]);

  const setQuery = useCallback(
    (query: { page?: number; pageSize?: number; text?: string }) => {
      try {
        dispatch({
          type: ACTION_TYPES.SET_QUERY,
          query,
        });
      } catch (e) {
        throw e;
      }
    },
    [dispatch]
  );

  return {
    ...state,
    fetchAll,
    setQuery,
  };
};
