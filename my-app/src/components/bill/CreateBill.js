import { React, useState } from 'react';
import axios from 'axios';
import moment from 'moment'

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


const Bill_Rest_API_URL = 'http://localhost:8080/admin/bill';

// class CreateProduct extends Component {
const CreateBill = (props) => {
    // constructor(props) {
    //     super(props);
    //     state = {
    //         product: {},
    //         size: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    //     }
    // }
    // const product = props.product;

    const { isCreateModal, toggleModal, updateData } = props;
    const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    // const [updateData, setUpdateData] = useState(props);
    const [bill, setBill] = useState({});



    const handleOnchangeInput = (event, id) => {
        let copyBill = { ...bill };
        copyBill[id] = event.target.value;
        setBill({
            ...copyBill
        })
    }

    // const editProduct = async (id) => {
    //     try {
    //         const res = await axios.get(Product_Rest_API_URL + `/find/${id}`)
    //         setState({
    //             product: res.data
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const CreateBill = () => {
        try {
            const z = async () => {
                let res = await axios.post(Bill_Rest_API_URL + '/post', {
                    userId: bill.userId,
                    code: bill.code,
                    name_recipient: bill.name_recipient,
                    telephone: bill.telephone,
                    address: bill.address,
                    created: bill.created,
                    modified: bill.modified
                  
                })
                let data = (res && res.data) ? res.data : []
                data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
                if (data.modified > 0) {
                    data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
                }
                updateData(data, `create`)
                toggle()
            }
            z()
            // setState({
            //     lstProduct: [...lstProduct, res.data],
            // })
            // props.updateData();
        } catch (error) {
            console.log(error)
        }
    }

    // const updateProduct = async (e, id) => {
    //     try {
    //         e.preventDefault();
    //         if (document.getElementById('name').value.trim().length <= 0 || document.getElementById('color').value.trim().length <= 0
    //             || document.getElementById('price').value.trim().length <= 0 || document.getElementById('quantity').value.trim().length <= 0
    //             || document.getElementById('categoryid').value.trim().length <= 0 || document.getElementById('description').value.trim().length <= 0
    //         ) {
    //             alert("Cần nhập thông tin");
    //             return;
    //         }
    //         const res = await axios.put(Product_Rest_API_URL + `/put/${id}`, {
    //             categoryId: product.categoryId,
    //             color: product.color,
    //             name: product.name,
    //             description: product.description,
    //             code: product.code,
    //             price: product.price,
    //             quantity: product.quantity,
    //             created: product.created
    //         })
    //         setState({
    //             lstProduct: [...lstProduct, res.data]
    //         })
    //         componentDidMount();
    //         clear();
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const toggle = () => {
        toggleModal()
        setBill({})
    }


    return (
        <div>
            <Modal isOpen={isCreateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Create</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="userId">
                                        User
                                    </Label>
                                    <Input
                                        id="userId"
                                        name="userId"
                                        placeholder=""
                                        type="select"
                                        value={bill.userId}
                                        onChange={(event) => handleOnchangeInput(event, 'userId')}
                                    >
                                    <option value='1'>
                                        1
                                    </option>
                                    <option value='2'>
                                        2
                                    </option>
                                    </Input>
                                   
                                    
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                        <Label for="user">
                                            Thêm
                                        </Label>
                                        <Button color="secondary">
                                            +
                                        </Button>
                                    </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="code">
                                         Code
                                    </Label>
                                    <Input
                                        id="code"
                                        name="code"
                                        placeholder=""
                                        type="text"
                                        value={bill.code}
                                        onChange={(event) => handleOnchangeInput(event, 'code')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name_recipient">
                                        Name_Recipient
                                    </Label>
                                    <Input
                                        id="name_recipient"
                                        name="name_recipient"
                                        placeholder=""
                                        type="text"
                                        value={bill.name_recipient}
                                        onChange={(event) => handleOnchangeInput(event, 'name_recipient')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="telephone">
                                         Telephone
                                    </Label>
                                    <Input
                                        id="telephone"
                                        name="telephone"
                                        placeholder=""
                                        type="text"
                                        value={bill.telephone}
                                        onChange={(event) => handleOnchangeInput(event, 'telephone')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <Col md={10}>
                                        <FormGroup>
                                            <Label for="address">
                                                Address
                                            </Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                placeholder=""
                                                type="text"
                                                onChange={(event) => handleOnchangeInput(event, 'address')}
                                            >
                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                   
                                </Row>
                                
                            </Col>
                        </Row> 
                            {/* <Col md={6}>
                                <Row>
                                    <Col md={10}>
                                        <FormGroup>
                                            <Label for="size">
                                                size
                                            </Label>
                                            <Input
                                                id="size"
                                                name="size"
                                                placeholder=""
                                                type="select"
                                                onChange={(event) => handleOnchangeInput(event, 'size')}
                                            >
                                                {
                                                    size.map((item, index) => {
                                                        return (
                                                            <option value={item}>
                                                                {item}
                                                            </option>
                                                        )
                                                    })
                                                }

                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={1}>
                                        <Label for="user">
                                            Thêm
                                        </Label>
                                        <Button color="secondary">
                                            +
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>*/}
                        
                        {/* <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        type="textarea"
                                        size='lg'
                                        value={product.description}
                                        onChange={(event) => handleOnchangeInput(event, 'description')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { CreateBill(e); handleOnchangeInput(e, 'user')}}>
                        Add New
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default CreateBill;