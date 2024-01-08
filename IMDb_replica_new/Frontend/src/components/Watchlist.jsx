/* eslint-disable react/prop-types */
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";


import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";

export default function Watchlist() {
  const [authoToken, setAuthToken] = useState(null);
  const [watchListData, setWatchListData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();

    if (authoToken === null || authoToken === undefined) {
      navigate("/signin");
      console.log("null toekn");
    } else {
      navigate("/watchlist");
      console.log("toekn value==", authoToken);
    }

    console.log(authoToken);
    console.log("useeffect runned....");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authoToken]);

  useEffect(() => {
    getWatchList(authoToken);
  }, [authoToken]);

  async function getWatchList(tk) {
    const URL = "https://imdb-replica.onrender.com/api/watchlist";

    if (tk !== null || tk !== undefined) {
      await axios
        .get(URL, {
          headers: {
            Authorization: tk,
          },
        })
        .then((res) => {
          console.log("-------watchlist api called--------");
          console.log(res);
          setWatchListData(res.data);
        })
        .catch((error) => {
          console.log("-------watchlist api called--------");
          console.log(error);
        });
    }
  }

  async function checkToken() {
    const authToken = await localStorage.getItem("authToken");
    await setAuthToken(authToken);
  }

  async function removeFromWatchlist(movie, tk) {
    const URL = "https://imdb-replica.onrender.com/api/remove-from-watchlist";

    console.log("tk==",tk)
    console.log(movie._id)

    if (
      tk !== null &&
      tk !== undefined &&
      movie !== null &&
      movie !== undefined
    ) {
        axios.delete(
            URL,
            {
              headers: {
                Authorization: tk,
              },
              data: {
                movieId: movie._id,
              },
            }
          )
      .then((res)=>{
        console.log("--------removefrom watchlist API-------")
        console.log(res)
        window.alert(res.data.message)
        getWatchList(tk);
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }

  return (
    <div style={{ backgroundColor: "#CAC9C5" }}>
      <Container
        fluid="lg"
        className="col-lg-9 mx-auto py-3 border border-info bg-light"
      >
        <p className="text-dark fs-2">Your Watchlist</p>
        <p className="text-secondary">PRIVATE</p>

        {watchListData !== null && (
          <>
            {watchListData.length === 0 ? (
              <>
                <p className="text-dark">empty watchlist</p>
              </>
            ) : (
              <>
                <Row className="border border-secondary mx-1"></Row>
                <Row className="text-muted my-2 ps-4">
                  <span>{watchListData.length} Titles</span>
                </Row>
                <Row className="border border-secondary mx-1"></Row>

                <Container>
                  {watchListData.map((movie, index) => (
                    <CardList key={index} movie={movie} token={authoToken} removeFromWatchlistFunction={removeFromWatchlist}/>
                  ))}
                </Container>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

function CardList({ movie , token , removeFromWatchlistFunction}) {
  return (
    <>
      <Row className="border border-2 border-info my-2 mx-auto">
        <Col className="col-lg-2 col-sm-4 col-12 mx-auto">
          <img
            src={movie.poster}
            alt={movie.title}
            style={{ width: "100%" }}
          ></img>
        </Col>

        <Col className="border border-1 text-dark col-sm-8 mx-auto">
          <Link
            to="/detailedpage"
            state={movie}
            className="text-decoration-none fs-5 ps-2"
          >
            {movie.title}
          </Link>
          <Container className="text-muted">
            <span className="me-2">{movie.release_year}</span>
            <span className="mx-1">|</span>
            <span className="mx-2">{movie.duration}</span>
            <span className="mx-1">|</span>
            <span className="mx-2">{movie.type}</span>
            <span className="mx-1">|</span>
            <span className="mx-2">{movie.genre.toString()}</span>
          </Container>
          <Container>
            <Icon.StarFill color="#F5C518" size={18} />
            <span className="mx-2">{movie.IMDB_rating}</span>
          </Container>
          <Container className="my-2">
            <p>{movie.summary}</p>
          </Container>
          <Container className="mt-4 mb-3">
            <Col className="d-grid">
              <Button 
              variant="warning"
              onClick={()=>{
                removeFromWatchlistFunction(movie,token)
              }}>Remove from Watchlist</Button>
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
}
