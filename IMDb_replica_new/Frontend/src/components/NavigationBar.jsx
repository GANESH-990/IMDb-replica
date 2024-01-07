import {
  Navbar,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";

export default function NavigationBar() {
  const [searchedItem, setSearchedItem] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const navigate = useNavigate();

  async function getMovies() {
    const URL = "https://imdb-replica.onrender.com/api/movies";

    await axios
      .get(URL)
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((e) => console.log(e));
  }

  function handleSearch(e) {
    setSearchedItem(e.target.value);
  }

  useEffect(() => {
    return () => {
      setSearchedItem("");
    };
  }, []);



  function toggleSearchInput() {
    setShowSearchInput(!showSearchInput);
  }

  useEffect(() => {
    getMovies();
  }, []);


  useEffect(()=>{
    if (movieData !== null && movieData !== undefined) {
      // Filter movies based on search term
      const filterMovies = movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchedItem.toLowerCase())
      );
      setFilteredMovies(filterMovies);
    }
  },[movieData])

  useEffect(() => {
    if (!showSearchInput) {
      // Clear the search input when hiding it
      setSearchedItem("");
    }
  }, [showSearchInput]);

  return (
    <>
      <Container fluid="true" className="bg-dark mb-2 ">
        <Navbar variant="dark" expand="lg" expanded={isExpanded}>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            onBlur={() => setIsExpanded(false)}
          />

          <Container className="justify-content-sm-center justify-content-between px-md-2 px-0 py-0 col-10">
            {!showSearchInput ? (
              <>
                <Navbar.Brand as={Link} to="/">
                  <Container
                    className="text-dark fw-bolder bg-warning rounded py-1 px-2"
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    IMDb
                  </Container>
                </Navbar.Brand>

                <Form className="d-flex col-lg-8 col-sm-9 d-sm-block d-none">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-2"
                    value={searchedItem}
                    onChange={handleSearch}
                  />
                </Form>

                <Icon.Search
                  size={24}
                  className="mr-2 d-sm-none me-3"
                  onClick={() => {
                    toggleSearchInput();
                    setIsExpanded(false);
                  }}
                />

                <Navbar.Collapse className="justify-content-evenly">
                  <div
                    className="fw-bold text-light my-2"
                    onClick={() => {
                      navigate("/watchlist");
                      setIsExpanded(false);
                      console.log("button clicked");
                    }}
                  >
                    WatchList
                  </div>

                  <div
                    className="fw-bold text-light my-2"
                    onClick={() => {
                      navigate("/signin");
                      setIsExpanded(false);
                      console.log("sign in button clicked");
                    }}
                  >
                    Sign In
                  </div>

                  {/* <Container className="border border-info">__________</Container> */}
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <Form className="d-flex col-11">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="ms-2"
                    value={searchedItem}
                    onChange={handleSearch}
                  />
                </Form>
                <Icon.XLg
                  size={20}
                  className="mx-auto"
                  onClick={() => {
                    toggleSearchInput();
                    setSearchedItem("");
                  }}
                />
              </>
            )}
          </Container>
        </Navbar>
      </Container>

      <ListGroup
        style={{ zIndex: 1, position: "absolute", top: "10px" }}
        className="col-sm-10  col-12 justify-content-center mt-5"
      >
        {searchedItem &&
          filteredMovies.map((movie, index) => (
            <ListGroup.Item
              as={Link}
              to="/detailedpage"
              state={movie}
              key={index}
              className="col-sm-8 col-12 bg-dark text-light align-self-center"
              onClick={() => {
                setSearchedItem("");
              }}
            >
              {movie.title}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
}
