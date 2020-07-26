import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Route, Switch, useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import Index from "./pages/Index";
import Login from "./pages/Login";
import MyBills from "./pages/MyBills";
import SetEmbagoMonth from "./pages/SetEmbagoMonth";
import { useAuthStore, useLoadingStore } from "./stores";

const LoadingBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
`;

export default () => {
  const history = useHistory();
  const { state: authState } = useAuthStore();
  const { state: loadingState } = useLoadingStore();

  useEffect(() => {}, []);

  useEffect(() => {
    if (authState.user === null || authState.user.embagoMonth !== null) {
      history.push("/");
    }

    if (authState.user && authState.user.embagoMonth === null) {
      history.push("/login/embago-month");
    }
  }, [authState.user, history]);

  return (
    <>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/my/bills" exact component={MyBills} />
        <Route path="/login" exact component={Login} />
        <Route path="/login/embago-month" exact component={SetEmbagoMonth} />
      </Switch>

      {loadingState.loading && (
        <LoadingBackdrop>
          <Spinner animation="grow" />
        </LoadingBackdrop>
      )}
    </>
  );
};
