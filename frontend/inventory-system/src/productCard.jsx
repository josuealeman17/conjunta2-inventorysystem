import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './sbclient';

function ProductCard(props) {
    const product = props.product;

    const [ editing, setEditing ] = useState(false);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);

    async function updateProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({
                    name: name,
                    description: description
                })
                .eq("id", product.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Button variant="danger" onClick={() => deleteProduct()}>Borrar Producto</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Editar Producto</Button>
                    </>
                :
                    <>
                        <h4>Editando Producto</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Regresar</Button>
                        <br></br>
                        <Form.Label>Producto:</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            defaultValue={product.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            defaultValue={product.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateProduct()}>Actualizar producto en Supabase DB</Button>
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default ProductCard;