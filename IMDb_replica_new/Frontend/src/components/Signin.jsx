/* eslint-disable react/prop-types */
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [SignInToggle, setSignToggle] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  function toggleOnClick() {
    setSignToggle(!SignInToggle);
  }

  async function handleLogout(tk) {
    const URL = "https://imdb-replica.onrender.com/api/signout";

    await axios
      .post(
        URL,
        {},
        {
          headers: {
            Authorization: tk,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAuthToken(null);
        localStorage.removeItem('authToken');
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthToken(authToken);
  }, []);


  return (
    <div style={{ backgroundColor: "#C6C6C2" }}>
      <Row className="border border-1 border-info col-lg-9 mx-auto bg-light text-dark py-5">
        <Col md={6}>

          <Container className="border border-1 rounded mx-auto col-sm-8  p-3 shadow-sm">
            {authToken !== null && authToken !== undefined ? (
              <>
                <LogOut token={authToken} deleteTokenFunction={handleLogout} />
              </>
            ) : (
              <>
                {!SignInToggle ? (
                  <SignInBox toggleFunction={toggleOnClick} />
                ) : (
                  <SignUpBox toggleFunction={toggleOnClick} />
                )}
              </>
            )}
          </Container>
        </Col>

        <Col
          style={{ borderLeft: "1px solid black" }}
          md={6}
          className=" my-5 my-md-0"
        >
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
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  function validate(values) {
    const errors = {};
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!reg.test(values.email)) {
      errors.email = "Please Enter valid email address!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 charecters!";
    }

    return errors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(form) {
    form.preventDefault();
    setFormErrors({});
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  async function handleAPICall() {
    const URL = "https://imdb-replica.onrender.com/api/signin";

    await axios
      .post(URL, {
        email: formValues.email,
        password: formValues.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log("------error---------");
        console.log(error.response);
        setErrorMessage(error.response.data.message);
      });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleAPICall();
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <h3>Sign in</h3>
      <p className="text-danger">{errorMessage}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3">
          <Form.Label>Email or mobile phone number</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.email}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.password}</p>
        </Form.Group>

        <Container fluid="true" className="d-grid my-5">
          <Button
            type="submit"
            className="btn btn-warning text-dark fw-bolder shadow-sm"
          >
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
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  function validate(values) {
    const errors = {};
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!values.username) {
      errors.username = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!reg.test(values.email)) {
      errors.email = "Please Enter valid email address!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordReg.test(values.password)) {
      errors.password =
        "Password must contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required!";
    } else if (!(values.confirmPassword === values.password)) {
      errors.confirmPassword = "Password must match!";
    }

    return errors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(form) {
    form.preventDefault();
    setErrorMessage(null);
    setFormErrors({});
    await asyncHandle();
    setIsSubmit(true);
  }

  async function asyncHandle() {
    const errors = validate(formValues);
    setFormErrors(errors);
  }

  async function handleAPICall() {
    const URL = "https://imdb-replica.onrender.com/api/signup";

    await axios
      .post(URL, {
        firstname: formValues.username,
        lastname: formValues.username,
        email: formValues.email,
        password: formValues.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log("------error---------");
        console.log(error.response);
        setErrorMessage(error.response.data.message);
      });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleAPICall();
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <p className="text-danger">{errorMessage}</p>
      <p className="fs-3">Create your account</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-1">
          <Form.Label className="fw-bold">Your name</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            name="username"
            type="text"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.username}</p>
        </Form.Group>

        <Form.Group className="my-1">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.email}</p>
        </Form.Group>

        <Form.Group className="my-1">
          <Form.Label className="fw-bold">password</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm "
            type="password"
            name="password"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.password}</p>
        </Form.Group>

        <Form.Group className="my-1 mb-3">
          <Form.Label className="fw-bold">Re-enter password</Form.Label>
          <Form.Control
            className="border border-secondary shadow-sm "
            type="password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.confirmPassword}</p>
        </Form.Group>

        <Container fluid="true" className="d-grid my-2">
          <Button
            className="btn btn-warning text-dark fw-normal shadow-sm"
            type="submit"
          >
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
      <a
        className="link-primary"
        style={{ cursor: "pointer" }}
        onClick={toggleFunction}
      >
        Sign in <Icon.CaretRightFill size={10} />
      </a>
    </>
  );
}

function LogOut({ token, deleteTokenFunction }) {
  return (
    <>
      <Container fluid="true" className="d-grid my-2">
        <Button
          className="btn btn-warning text-dark fw-normal shadow-sm"
          type="button"
          onClick={() => deleteTokenFunction(token)}
        >
          Logout
        </Button>
      </Container>
    </>
  );
}
