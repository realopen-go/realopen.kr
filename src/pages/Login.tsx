import React, { useCallback } from "react";
import Col from "react-bootstrap/Col";
import BootstrapContainer from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

import { useAuthStore } from "../stores";
import { useHistory } from "react-router-dom";

const Container = styled(BootstrapContainer)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LoginPage: React.FC = () => {
  const { signIn } = useAuthStore();
  const { register, handleSubmit } = useForm();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        await signIn({
          password: data.password,
          username: data.username,
        });
      } catch (e) {
        window.alert(e.message);
      }
    },
    [signIn]
  );

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
              <Form.Label>사용자 이름</Form.Label>
              <Form.Control name="username" ref={register} type="text" />
              <Form.Text className="text-muted">
                https://open.go.kr과 동일한 사용자 이름을 사용합니다.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                name="password"
                placeholder="Password"
                ref={register}
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              로그인
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
