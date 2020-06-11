import React from "react";
import Col from "react-bootstrap/Col";
import BootstrapContainer from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

import Page from "./Page";
import Bills from "../components/Bills";

const Container = styled(BootstrapContainer)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const IndexPage: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Page>
      <Container>
        <Row>
          <Col md={8}>
            <Bills />
          </Col>
          <Col md={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup className="mb-3">
                <FormControl
                  name="search"
                  placeholder="검색어"
                  ref={register}
                />
                <InputGroup.Append>
                  <Button type="submit" variant="outline-secondary">
                    검색
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default IndexPage;
