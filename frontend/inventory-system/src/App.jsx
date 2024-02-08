import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { supabase } from "./sbclient";


function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function() {
      checkUser();
    });
  }, [])
  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }
  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }
  
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }
  if (user) {
    return (
      <div className="App">
        <h1>Hello, {user.email}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    )
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  console.log(products);

  return (
    <>
      <h1>Hello, please sign in!</h1>
      <button onClick={signInWithGithub}>Sign In</button>
      <Navbar>
        <Container>
          <Navbar.Brand>Productos</Navbar.Brand>
          <Nav>
            <Nav.Item>jovenaleman</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container className="container-p">
        <Row>
          <Col className="card" xs={12} md={8}>
            <Form.Label>Producto</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <Button onClick={() => createProduct()}>
              Guardar producto en Supabase DB
            </Button>
          </Col>
        </Row>
        <hr></hr>
        <h3>Productos actuales</h3>
        <Row xs={1} lg={3} className="g-4">
          {products.map((product) => (
            <Col>
              <ProductCard product={product} /> {/* product={product} */}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
