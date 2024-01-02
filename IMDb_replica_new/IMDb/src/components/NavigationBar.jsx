
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import { Link } from 'react-router-dom';


export default function NavigationBar(){

    return(
        <>
        <Navbar className='bg-body-tertiary'>
        <Navbar.Brand> React Bootstrap</Navbar.Brand>

        <Nav>
        <Nav.Link as={Link} to='/'>Home..</Nav.Link>
        <Nav.Link as={Link} to='/watchlist'>watchlist..</Nav.Link>
        <Nav.Link as={Link} to='/signin'>signin..</Nav.Link>


        </Nav>

        </Navbar>

        <Link to='/'> Home</Link>
        <Link to='/watchlist'>watchlist..</Link>
        <Link to='/signin'>signin..</Link>




        


        </>
    )
}
