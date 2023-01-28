import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Container, Table } from 'reactstrap';
import OrderComponent, { OrderDetailItem, OrderItem } from './order.component';
import '../css/styles.css';
import { Button, Modal, Row } from 'react-bootstrap';
import { BsBagCheck, BsCheck, BsCheckCircle, BsFillEyeFill, BsXCircle } from "react-icons/bs";
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { STATUS_ORDER } from '../common/const';

interface OrederTemplate {
    self: OrderComponent
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function OrederTemplate({ self }: OrederTemplate) {
    const { state } = self;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    return (
        <div className='main-page'>
            <Container>
                <Row>
                    <ToastContainer />

                    <Table striped bordered hover className='table-page'>
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Người nhận</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Ngày đặt</th>
                                <th>Trạng thái</th>
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
                                        <td id="description">{item.statusName}</td>
                                        <td style={{ 'textAlign': 'center' }}>
                                            <button onClick={() => self.openModalDetail(item.id)}>
                                                <BsFillEyeFill title='Xem chi tiết' />
                                            </button>
                                            {item.status === 2 && <button onClick={() => self.handDeliveredOrder(item.id)}>
                                                <BsCheckCircle title='Xác nhận đã giao hàng' />
                                            </button>}
                                            {item.status !== 0 && <button onClick={() => self.handCancelOrder(item.id)}>
                                                <BsXCircle title='Hủy đơn hàng' />
                                            </button>}
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

            <Modal show={state.isModal} onHide={self.closeModalDetail} size={'xl'}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-info'>
                        <Table border={0} className="table-detail">
                            <tbody style={{ 'textAlign': 'left' }}>
                                <tr>
                                    <td width={'10%'} style={{ 'whiteSpace': 'nowrap' }}>
                                        <label>Họ Tên:</label>
                                    </td>
                                    <td width={'20%'}>
                                        {state.orderDetailItem.nameRecipient}
                                    </td>
                                    <td width={'10%'} style={{ 'whiteSpace': 'nowrap' }}>
                                        <label>Số điện thoại:</label>
                                    </td>
                                    <td width={'20%'}>
                                        {state.orderDetailItem.telephone}
                                    </td>
                                    <td width={'10%'} style={{ 'whiteSpace': 'nowrap' }}>
                                        <label>Ngày đặt:</label>
                                    </td>
                                    <td width={'20%'}>
                                        {state.orderDetailItem.created}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={'10%'} style={{ 'whiteSpace': 'nowrap' }}>
                                        <label>Địa chỉ:</label>
                                    </td>
                                    <td colSpan={5}>
                                        {state.orderDetailItem.address}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className='modal-list'>
                        <Table striped bordered hover className='table-page'>
                            <thead>
                                <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Size</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá (VND)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.orderDetailList &&
                                    state.orderDetailList.length > 0 &&
                                    state.orderDetailList.map((item: OrderDetailItem, index) => (
                                        <tr key={index}>
                                            <td id="category">
                                                <img src={item.imageUrl} width="150px" height="auto" />
                                            </td>
                                            <td id="category">{item.name_Product}</td>
                                            <td id="description" style={{ 'textAlign': 'right' }}>{item.sizeName}</td>
                                            <td id="quantity" style={{ 'textAlign': 'right' }}>{item.quantity && item.quantity.toString()}</td>
                                            <td id="category" style={{ 'textAlign': 'right' }}>{item.price && item.price.toString()}</td>

                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>
                                        <h4>Tổng</h4>
                                    </td>
                                    <td colSpan={4} style={{ 'textAlign': 'right' }}>
                                        {`${state.totalPrice} VND`}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={self.closeModalDetail}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div >
    )
}