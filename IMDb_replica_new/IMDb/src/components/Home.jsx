import {Container, Card} from 'react-bootstrap'


//using sample data
import filmData from "../../../../sample_fillm_data.json";




export default function Home(){

    return(
        <>
        <p
        style={{zIndex:-1}}
        >home</p>

{filmData.map((movie,index)=>(
                <Card key={index}>
                    <Card.Title>{movie.title}</Card.Title>

                </Card>
            ))}

        <Container>
            {filmData.map((movie,index)=>(
                <Card key={index}>
                    <Card.Title>{movie.title}</Card.Title>

                </Card>
            ))}

        </Container>
        
        </>


    )
      
}