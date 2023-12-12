import React from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBarElements = () => {
  const handleSearch = () => {
    // 여기에 검색 기능 구현
    console.log('Search button clicked!');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="d-flex justify-content-between">
        <Navbar.Brand href="/">
          <img
            src="/images/jobja-logo.png"
            alt="LOGO"
            width="150"
            height="50"
            className="d-inline-block align-top"
          />
          <span style={{ marginRight: '100px' }}></span>
        </Navbar.Brand>

        <Form.Control
          type="search"
          placeholder="기업명, 공고명 검색"
          className="me-2"
          style={{ width: '400px' }}
          aria-label="Search"
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
          <FaSearch />
        </Button>

        <span style={{ marginRight: '100px' }}></span>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="ms-2">
              신입공채
            </Nav.Link>
            <Nav.Link href="#action2" className="ms-2">
              채용정보
            </Nav.Link>
            <NavDropdown
              title="프로필"
              id="navbarScrollingDropdown"
              className="ms-2"
            >
              <NavDropdown.Item as={Link} to="/my-page">마이페이지</NavDropdown.Item>
              <NavDropdown.Item href="#action4">도움말</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">로그아웃</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/Login"
              className="ms-2"
              style={{ marginRight: '60px' }}
            >
              로그인
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarElements;
