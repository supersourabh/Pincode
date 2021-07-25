import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function Header() {
    return (

        <>
            <Navbar bg="success" style={{position : "sticky" , width :"100%",top:1 ,zIndex:1000}} variant="dark">
                <Container>
                    <Navbar.Brand href="/">PINCODE Search</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/view/id">Search with PIN</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            
        </>

    )
}
