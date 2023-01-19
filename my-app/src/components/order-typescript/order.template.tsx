import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Container, Table } from 'reactstrap';
import OrderComponent, { OrderItem } from './order.component';
import '../css/styles.css';
import { Button, Modal, Row } from 'react-bootstrap';
import { BsFillEyeFill } from "react-icons/bs";

interface OrederTemplate {
    self: OrderComponent
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function OrederTemplate({ self }: OrederTemplate) {
    const { state } = self;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='main-page'>
            <Container>
                <Row>
                    <ToastContainer />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Người nhận</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Ngày đặt</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!state.isLoading &&
                                state.lstOrder &&
                                state.lstOrder.length > 0 &&
                                state.lstOrder.map((item: OrderItem, index) => (
                                    <tr key={index}>
                                        <td id="category"
                                        >{item.code}</td>
                                        <td id="category">{item.nameRecipient}</td>
                                        {/* <td id="price">{item.price}</td> */}
                                        <td id="quantity">{item.telephone}</td>
                                        <td id="category">{item.address}</td>
                                        <td id="description">{item.created}</td>
                                        <td>
                                            <button onClick={handleShow}>
                                                <BsFillEyeFill />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            {state.isLoading && (
                                <tr>
                                    <h3>Vui lòng đợi...</h3>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}