import { useLocation } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

export default function DetailedPage() {
  const data = useLocation();
  const movie = data.state;



  return (
    <>
      <Container fluid="lg" className="col-lg-9 col-12 ">
        <Row className="ps-3 ">
          <span className="fs-2 ">{movie.title}</span>
        </Row>

        <Row className="ps-3  my-3">
          <Col>
            <span className="text-secondary">{movie.release_year}</span>
            <span className="text-secondary mx-3">{movie.type}</span>
            <span className="text-secondary me-3">{movie.duration}</span>
          </Col>
        </Row>

        <Row className="my-3 ps-3">
          <Container className="col-sm-4 ">
            <img
              src={movie.poster}
              style={{
                width: "100%",
              }}
            ></img>
          </Container>

          <Container fluid="lg" className="col-sm-8  p-3">
            <Col>
              {movie.genre.map((gen, index) => (
                <span className="mx-2 px-3  pb-1 border bg-secondary rounded-pill" key={index}>
                  {gen}
                </span>
              ))}
            </Col>
            <p className="my-3 ps-2 ">{movie.summary}</p>

            <Col className=" ps-2  my-3 ">
              <span className="fw-bold">Director:</span>
              <span className="mx-2 text-info">{movie.director}</span>
            </Col>

            <Col className=" ps-2  my-3">
              <span className="fw-bold">Cast:</span>
              {movie.cast.map((gen, index) => (
                <span className="mx-2 text-info" key={index}>
                  {gen}
                </span>
              ))}
            </Col>

            <Col className=" ps-2  my-3">
              <span className="fw-bold">Writers:</span>
              {movie.writers.map((gen, index) => (
                <span className="mx-2 text-info" key={index}>
                  {gen}
                </span>
              ))}
            </Col>

            <Col className="my-5 d-grid">
              <Button variant="warning">Add to Watchlist</Button>
            </Col>
          </Container>
        </Row>
      </Container>
    </>
  );
}
