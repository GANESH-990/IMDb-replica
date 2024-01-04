import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import * as Icon from "react-bootstrap-icons";

import '../css/footer.css'
export default function Footer() {
  return (
    <>
      <footer  className="footer" >
        <Container className=" col-lg-3 col-6 mx-auto mb-0"  >

            <Row className="my-3 justify-content-center">
                <Col > <Icon.Tiktok/></Col>
                <Col > <Icon.Instagram/></Col>
                <Col > <Icon.Twitter/></Col>
                <Col > <Icon.Youtube/></Col>
                <Col > <Icon.Facebook/></Col>

            </Row>
        </Container>

        <Container fluid="true" className="col-lg-6 mx-auto">
          <Row className="my-3 justify-content-center">
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Get the IMDB App
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Help
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Site Index
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              IMDbPro
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Box Office Mojo
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              IMDb Developer
            </Col>
          </Row>

          <Row className="my-3 justify-content-center">
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Press Room
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Advertising
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Jobs
            </Col>
            <Col xs={6} sm={4} lg={3} className="text-center my-1">
              Conditions of Use
            </Col>
            <Col xs={6} sm={4} className="text-center my-1">
              Privacy Policy
            </Col>
            <Col xs={6} sm={4} className="text-center my-1">
              Your Ads Privacy Choices
            </Col>
          </Row>

          <Row className="my-1 justify-content-center">An Amazon company</Row>
          <Row className="my-1 justify-content-center">© 1990-2023 by IMDb.com, Inc.</Row>
        </Container>
      </footer>
    </>
  );
}
