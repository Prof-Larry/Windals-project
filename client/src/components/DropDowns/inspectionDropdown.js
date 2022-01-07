import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form , Card} from "react-bootstrap";

export default function InspectionDropdown() {

    const [plantCode, setPlantCode] = useState([{ plant_code: "", production_line: [], product_no: []}]);
    const [production_line, setProductionLine] = useState([{production_line: ""}])
    const [product_no, setProductNo] = useState([{product_no: ""}])

//-------------------PLANT CODE---------------------------
    const handleRemoveClickPlantCode = index => {
        const list = [...plantCode];
        list.splice(index, 1);
        setPlantCode(list);
    }

    const handleAddClickPlantCode = () => {
        setPlantCode([...plantCode, { plant_code: "", production_line: [], product_no: []}]);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...plantCode];
        list[index][name] = value;
        setPlantCode(list)
    }

//------------------PRODUCTION LINE ---------------------
    const handleAddProductionLine = (i) => {
        setProductionLine([...production_line, {production_line: ""}]);
    }
    const handleRemoveProductionLine = (i,index) => {
        const list = [...production_line];
        list.splice(index, 1);
        setProductionLine(list);
    }
    const handleUpdateProduction = (e, index) => {
        const { name, value } = e.target;
        const list = [...production_line];
        list[index][name] = value;
        setProductionLine(list)
    }    

//-----------------PRODUCT NO----------------------------    
    const handleAddProductNo = () => {
        setProductNo([...product_no, {product_no: ""}]);
    }
    const handleRemoveProductNo = index => {
        const list = [...product_no];
        list.splice(index, 1);
        setProductNo(list);
    }
    const handleUpdateProductNo = (e, index) => {
        const { name, value } = e.target;
        const list = [...product_no];
        list[index][name] = value;
        setProductNo(list)
    }  
  
    
  
    return (
      <div className="InspectionDropdown">
        
        {plantCode.map((x,i) => {
            return(
                <div>
                    <Card className="mt-2">
                        <Card.Header className="text-center text-dark">Plant code : {i}</Card.Header>

                        <Row className="mt-2">
                            <Col className="mx-5">
                                <Form.Label>plant code</Form.Label>
                                <Form.Control
                                    name="plant_code"
                                    value={x.plant_code}
                                    onChange={e => handleInputChange(e, i)}
                                    ></Form.Control>
                            </Col>
                        </Row>
                        <hr/>
                        <br/>

                        <Row className="mt-2">
                        <Col className="mx-2"> 

 {production_line.map((x,index) => {
     return(
         <div>
             <Form.Label>production line</Form.Label>
             <Form.Control
                name="production_line"
                value={x.production_line}
                onChange={e => handleUpdateProduction(e, index)}
             >
             </Form.Control>
             {production_line.length !== 1 && 
                <Button className="mx-1 mt-2 mb-2" variant="danger" 
                onClick={() => handleRemoveProductionLine(index)}
                >
                    Remove
                </Button>}
            {production_line.length - 1 === index && 
                <Button className="mx-1 mt-2 mb-2" variant="success" 
                onClick={handleAddProductionLine}
                >
                    Add
            </Button>}
         </div>
         
     );
 })}                   
{JSON.stringify(production_line)}                       
                        </Col>



                        <Col className="mx-2">

{product_no.map((x,idx) => {
     return(
         <div>
             <Form.Label>product no</Form.Label>
             <Form.Control
                name="product_no"
                value={x.product_no}
                onChange={e => handleUpdateProductNo(e, idx)}
             >
             </Form.Control>
             {product_no.length !== 1 && 
                <Button className="mx-1 mt-2 mb-2" variant="danger" 
                onClick={() => handleRemoveProductNo(idx)}
                >
                    Remove
                </Button>}
            {product_no.length - 1 === idx && 
                <Button className="mx-1 mt-2 mb-2" variant="success" 
                onClick={handleAddProductNo}
                >
                    Add
            </Button>}
         </div>
         
     );
 })}
 {JSON.stringify(product_no)}   
                        </Col>
                        </Row>

                        <div className="mt-1 text-center">
                            {plantCode.length !== 1 && 
                                <Button className="mx-1 mt-2 mb-2" variant="danger" 
                                onClick={() => handleRemoveClickPlantCode(i)}
                                >
                                    Remove
                                </Button>}
                            {plantCode.length - 1 === i && 
                                <Button className="mx-1 mt-2 mb-2" variant="success" 
                                onClick={handleAddClickPlantCode}
                                >
                                    Add
                                </Button>}
                        </div>
                    </Card>
                   

                </div>
            );
        })}
             {JSON.stringify(plantCode)}
      </div>
    );
  }