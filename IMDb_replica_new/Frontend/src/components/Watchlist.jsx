import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import  filmdata from '../../../../sample_fillm_data.json';
import { Container,Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
const savedFilms = filmdata.slice(1,5);

export default function Watchlist(){
    const [authoToken , setAuthToken] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        checkToken();

        if(authoToken === null || authoToken === undefined){
            navigate('/signin');
            console.log("null toekn")
        }
        else{
             navigate('/watchlist')
            console.log("toekn value==",authoToken);
        }

        console.log(authoToken);
        console.log("useeffect runned....")
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[authoToken]);




    async function checkToken(){
    const authToken = await localStorage.getItem("authToken");
            await setAuthToken(authToken);
    }

    return(
        <div style={{backgroundColor:'#CAC9C5'}}>


        <Container fluid='lg' className="col-lg-9 mx-auto py-3 border border-info bg-light">

            <p className="text-dark fs-2">Your Watchlist</p>
            <p className="text-secondary">PRIVATE</p>
            <Row className="border border-secondary mx-1"></Row>
            <Row className="text-muted my-2 ps-4">
                <span>{savedFilms.length} Titles</span>
            </Row>
            <Row className="border border-secondary mx-1"></Row>

            <Container>
                {savedFilms.map((movie, index)=>(
                    <CardList key={index} movie={movie}/>
                ))}
            </Container>
        </Container>


        </div>
    )
}


function CardList({movie}){
    return(
        <>
        <Row className="border border-2 border-info my-2 mx-auto">
            <Col className="col-lg-2 col-sm-4 col-12 mx-auto">
                <img src={movie.poster} alt={movie.title} style={{width:'100%'}}></img>
            </Col>

            <Col className="border border-1 text-dark col-sm-8 mx-auto">
            <Link to="/detailedpage" state={movie} className="text-decoration-none fs-5 ps-2">{movie.title}</Link>
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
            </Col>
            
        </Row>
        </>
    )
}