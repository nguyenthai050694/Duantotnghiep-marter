import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Col, Container, Table } from 'reactstrap';
import OrderComponent, { OrderDetailItem, OrderItem } from './order.component';
import '../css/styles.css';
import { Button, Modal, Row } from 'react-bootstrap';
import { BsBagCheck, BsCheck, BsCheckCircle, BsFillEyeFill, BsTruck, BsXCircle } from "react-icons/bs";
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { STATUS_ORDER } from '../common/const';
import EnhancedTable from '../common/table/table';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

interface OrederTemplate {
    self: OrderComponent
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function OrederTemplate({ self }: OrederTemplate) {
    const { state } = self;

    const headCells = [
        {
            id: 'id',
            align: 'center',
            disablePadding: false,
            label: 'Mã',
        },
        {
            id: 'nameRecipient',
            align: 'left',
            disablePadding: false,
            label: 'Nguời nhận',
        },
        {
            id: 'telephone',
            align: 'left',
            disablePadding: false,
            label: 'Điện thoại',
        },
        {
            id: 'address',
            align: 'left',
            disablePadding: false,
            label: 'Địa chỉ',
        },
        {
            id: 'created',
            align: 'left',
            disablePadding: false,
            label: 'Ngày đặt',
        },
        {
            id: 'statusName',
            align: 'left',
            disablePadding: false,
            label: 'Trạng thái',
        },
        {
            id: 'action',
            align: 'center',
            disablePadding: false,
            label: 'Hành động',
            component: (item: any) => {
                console.log(item);

                return <>
                    <button onClick={() => self.openModalDetail(item.id)}>
                        <BsFillEyeFill title='Xem chi tiết' />
                    </button>
                    {item.status === 2 && <button onClick={() => self.handDeliveredOrder(item.id)}>
                        <BsTruck title='Xác nhận đang giao hàng' />
                    </button>}
                    {/* {item.status === 3 && <button onClick={() => self.handDeliveredOrder(item.id)}>
                                                <BsCheckCircle title='Xác nhận đã giao hàng' />
                                            </button>} */}
                    {item.status !== 0 && <button onClick={() => self.handCancelOrder(item.id)}>
                        <BsXCircle title='Hủy đơn hàng' />
                    </button>}
                </>
            }
        },
    ];

    const headCellsDetail = [
        {
            id: 'code',
            align: 'center',
            disablePadding: false,
            label: 'Ảnh sản phẩm',
            component: (item: any) => {
                return <>
                    <img src={item.imageUrl} width="150px" height="auto" />
                </>
            }
        },
        {
            id: 'name_Product',
            align: 'left',
            disablePadding: false,
            label: 'Tên sản phẩm',
        },
        {
            id: 'sizeName',
            align: 'right',
            disablePadding: false,
            label: 'Size',
        },
        {
            id: 'quantity',
            align: 'right',
            disablePadding: false,
            label: 'Số lượng',
        },
        {
            id: 'price',
            align: 'right',
            disablePadding: false,
            label: 'Đơn giá (VND)',
        },
    ];

    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };
    return (
        <div className='main-page'>
            <Container>
                <Row>
                    <ToastContainer />
                    <Col md={9} ></Col>
                    <Col md={3} >
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth className='order-search'>
                                <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.status}
                                    label="Trạng thái"
                                    onChange={(val: any) => { self.handChangeStatus(val) }}
                                >
                                    <MenuItem value={99}>Tất cả</MenuItem>
                                    <MenuItem value={1}>Chưa thanh toán</MenuItem>
                                    <MenuItem value={2}>Đã thanh toán</MenuItem>
                                    <MenuItem value={3}>Chờ giao hàng</MenuItem>
                                    <MenuItem value={4}>Đã giao hàng</MenuItem>
                                    <MenuItem value={5}>Hoàn tất</MenuItem>
                                    <MenuItem value={0}>Hủy</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Col>
                    <EnhancedTable headCells={headCells} rows={state.lstOrder} />
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
                        <EnhancedTable headCells={headCellsDetail} rows={state.orderDetailList} total={`${state.totalPrice} VND`} />
                        {/* <Table striped bordered hover className='table-page'>
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
                        </Table> */}
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