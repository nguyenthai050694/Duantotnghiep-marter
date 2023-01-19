import { React, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


// class UpdateProduct extends Component {
const UpdateBill = (props) => {
    const user = [1,2,3];
    const { isUpdateModal, toggleModal, updateData } = props;
    const [bill, setBill] = useState(props.bill);

    useEffect(() => {
        setBill(props.bill)
    }, [props.bill])

    const handleOnchangeInput = (event, id) => {
        let copyBill = { ...bill };
        copyBill[id] = event.target.value;
        setBill({
            ...copyBill
        })
    }


    const UpdateBill = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/admin/bill/post/${bill.id}`, {
                userId: bill.userId,
                code: bill.code,
                name_recipient: bill.name_recipient,
                telephone: bill.telephone,
                address: bill.address,
                created: bill.created,
                modified: bill.modified
            })
            let data = (res && res.data) ? res.data : [];
            data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
            data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
            toggle()
            updateData(data, 'update')
        } catch (error) {
            console.log(error.message)
        }
    }

    const toggle = () => {
        toggleModal()
        setBill({})
    }

    return (
        <div>
            <Modal isOpen={isUpdateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Update</ModalHeader>
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
                                        value={user.userId}
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
                           
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { UpdateBill(); handleOnchangeInput(e, 'user')}}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateBill;