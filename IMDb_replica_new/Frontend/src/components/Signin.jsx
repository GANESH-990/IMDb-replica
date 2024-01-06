/* eslint-disable react/prop-types */
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as Icon from "react-bootstrap-icons";

import { useState } from "react";

export default function Signin() {
  const [SignInToggle, setSignToggle] = useState(false);

  function toggleOnClick() {
    setSignToggle(!SignInToggle);
  }

  return (
    <div style={{ backgroundColor: "#C6C6C2" }}>
      <Row className="border border-1 border-info col-lg-9 mx-auto bg-light text-dark py-5">
        <Col md={6}>


            {/*  space for API errors e.g.- wrong password */}

            
          <Container className="border border-1 rounded mx-auto col-sm-8  p-3 shadow-sm">
            {!SignInToggle ? (
              <SignInBox toggleFunction={toggleOnClick} />
            ) : (
              <SignUpBox toggleFunction={toggleOnClick} />
            )}
          </Container>
        </Col>

        <Col style={{ borderLeft: "1px solid black" }} md={6} className=" my-5 my-md-0">
          <Container>
            <h4 className="fw-bold">Benefits of your free IMDb account</h4>

            <p className="fw-bold my-0">Personalized Recommendations</p>
            <p>{`Discover shows you'll love.`}</p>

            <p className="fw-bold my-0">Your Watchlist</p>
            <p>
              Track everything you want to watch and receive e-mail when movies
              open in theaters.
            </p>

            <p className="fw-bold my-0">Your Ratings</p>
            <p>{`Rate and remember everything you've seen.`}</p>

            <p className="fw-bold my-0">Contribute to IMDb</p>
            <p>
              Add data that will be seen by millions of people and get cool
              badges.
            </p>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

function SignInBox({ toggleFunction }) {
  return (
    <>
      <h3>Sign in</h3>
      <Form>
        <Form.Group className="my-3">
          <Form.Label>Email or mobile phone number</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            type="email"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            type="password"
          />
        </Form.Group>

        <Container fluid="true" className="d-grid my-5">
          <Button className="btn btn-warning text-dark fw-bolder shadow-sm">
            Sign in
          </Button>
        </Container>
      </Form>

      <Container>
        <div className="d-flex align-items-center">
          <div className="border-bottom flex-grow-1 mr-3"></div>
          <span className="text-muted">New to IMDb?</span>
          <div className="border-bottom flex-grow-1 ml-3"></div>
        </div>
      </Container>

      <Container fluid="true" className="d-grid my-2">
        <Button className="btn btn-light border" onClick={toggleFunction}>
          Create your IMDb account
        </Button>
      </Container>
    </>
  );
}

function SignUpBox({ toggleFunction }) {
  return (
    <>
      <p className="fs-3">Create your account</p>

      <Form>
        <Form.Group className="my-1">
          <Form.Label className="fw-bold">Your name</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            type="text"
          />
        </Form.Group>

        <Form.Group className="my-1">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            type="email"
          />
        </Form.Group>

        <Form.Group className="my-1">
          <Form.Label className="fw-bold">password</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            type="password"
          />
        </Form.Group>

        <Form.Group className="ms-1 mb-3">
          <Form.Label className="fw-bold"> Re-enter password</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            type="password"
          />
        </Form.Group>

        <Container fluid="true" className="d-grid my-2">
          <Button className="btn btn-warning text-dark fw-normal shadow-sm">
            Create your IMDb account
          </Button>
        </Container>
      </Form>

      <Container className="shadow-lg my-3">
        <div className="d-flex align-items-center ">
          <div className="border-bottom flex-grow-1 mr-3"></div>
        </div>
      </Container>

      <span>Already have an account? </span>
      <a className="link-primary"  style={{cursor:'pointer'}} onClick={toggleFunction}>
        Sign in <Icon.CaretRightFill size={10} />
      </a>
    </>
  );
}
