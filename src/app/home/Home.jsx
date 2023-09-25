import React, { useEffect } from 'react'
import { toAbsoluteUrl } from '../../_metronic/helpers'
import { Image, Nav, Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom';




const Home = () => {

  const navigate = useNavigate()
useEffect(()=>{
  // getHomeImage().then(res=>{
  //   if(res.code == 200){
  //     setImg(res?.data?.image)
  //   }
  // })
},[])

  return (
    <div>
      <Row className={`ms-2 me-2 my-2 py-3 ${styles.nav_row}`} style={{overflow:'hidden'}}>  
        <Col className={`col-md-10 col-sm-11 m-auto `} style={{overflow:'hidden'}}>
          <Navbar  variant="light" collapseOnSelect expand="sm">
            <Navbar.Brand href="#home">
              <Image src={toAbsoluteUrl('/media/logos/default-small.svg')}
                width="60"
                height="60"></Image>  <span className={`${styles.blixter_icon}`}>Blixter</span></Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className={`m-auto ${styles.navs}`}>
                <Nav.Link href="#Company" className={` ${styles.nav_btn}`}>Company</Nav.Link>
                <Nav.Link href="#Solutions" className={` ${styles.nav_btn}`}>Solutions</Nav.Link>
                <Nav.Link href="#Products" className={` ${styles.nav_btn}`}>Products</Nav.Link>
                <Nav.Link href="#New" className={` ${styles.nav_btn}`}>What's New</Nav.Link>
                <Nav.Link href="#More" className={` ${styles.nav_btn}`}>More</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Button variant="success" onClick={()=>{navigate("/auth/login")}}>Log In</Button>
                {/* <Button variant="success ms-1">Login</Button> */}
              </Form> 
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row className={`ms-2 me-2`} style={{overflow:'hidden'}}>
        <Col className={` col-md-10 m-auto`} >
          <Row>
            <Col className={` col-md-5 ${styles.content_col}`}>
              <p className={` ${styles.heading}`}>Unleash your creativity</p>
              <span className={` ${styles.subhead}`}>No Tech Skills
                <span className={` ${styles.color}`}>
                  <span>  &nbsp;Required</span>
                  <Image src={toAbsoluteUrl('/media/logos/hero-home-title-underline.svg')}
                    className={` ${styles.image_line}`}
                  ></Image>
                </span>
              </span>

              <p className={`mt-5 pt-4 ${styles.paragraph} `}>
                With a simple and intuitive interface, you can put your data, <br />
                customize the model, and fine-tune the results to suit your <br />
                communication need.
              </p>

              <h3 className={`mt-4 pt-2 `}>Contact Us : +56992235151</h3>
              <Button variant="success" className={`mb-5 mt-5`}>Start For Free</Button>
            </Col>
            <Col className={`col-md-7`}>
              <Image src={toAbsoluteUrl('/media/logos/hero-visuals.png')}
                className={` ${styles.icon_image}`}></Image>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home
