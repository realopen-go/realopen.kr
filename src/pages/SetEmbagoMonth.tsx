import React, { useCallback, useState } from "react";
import Col from "react-bootstrap/Col";
import BootstrapContainer from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import { useAuthStore, useLoadingStore } from "../stores";

const Container = styled(BootstrapContainer)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SetEmbagoMonthPage: React.FC = () => {
  const { updateUser } = useAuthStore();
  const { finishLoading, startLoading } = useLoadingStore();
  const history = useHistory();
  const [embagoMonth, setEmbagoMonth] = useState(0);

  const handleChange = useCallback(
    (e) => {
      setEmbagoMonth(e.target.value);
    },
    [setEmbagoMonth]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        startLoading();
        await updateUser({ embagoMonth });
        history.push("/");
      } catch (e) {
        window.alert(e.message);
      }

      finishLoading();
    },
    [embagoMonth, setEmbagoMonth]
  );

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>엠바고 설정(단위: 개월)</Form.Label>
              <Form.Control
                max={12}
                min={0}
                onChange={handleChange}
                type="number"
                value={embagoMonth}
              />
              <Form.Text className="text-muted">
                설정한 개월 수가 지나면 청구건이 전체공개됩니다.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              설정
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SetEmbagoMonthPage;
