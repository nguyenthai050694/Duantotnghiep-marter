import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import '../voucher/voucher.css';
import UpdateVoucher from './UpdateVoucher';
import NewVoucher from './NewVoucher';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import PaginatedItems from "../../customHook/PaginatedItems";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, PaginationLink, PaginationItem } from 'reactstrap';

const Voucher = () => {

    const token = localStorage.getItem('token');
    const [voucher, setVoucher] = useState({});
    const [isNewVoucherModal, setIsNewVoucherModal] = useState(false)
    const [isupdatevoucherModal, setIsupdatevoucherModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false);
    const [dataVoucher, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [voucherId, setVoucherId] = useState()
    const [pageNumber, setPageNumber] = useState()
    const [totalPage, setTotalPage] = useState([])
    const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/api/voucher/get`);


    const pageable = async (id) => {
        if (id <= 0) {
            id = 0
        } else if (id >= totalPage.length - 1) {
            id = totalPage.length - 1
        }
        const res = await axios.get(`http://localhost:8080/api/voucher/get?page=${id}`,
            { headers: { "Authorization": `Bearer ${token}` } })
        let data = res ? res.data : []
        setData(data.content)
        setPageNumber(data.number)
        console.log(data.number);
    }

    useEffect(() => {
        if (dataPro.content) {
            setData(dataPro.content)
            setPageNumber(dataPro.number)
            for (let i = 1; i <= dataPro.totalPages; i++) {
                setTotalPage((prev) => [...prev, i])

            }
        }
    }, [dataPro])

    const updateTotalPage = async () => {
        const res = await axios.get(`http://localhost:8080/api/category/get`, { headers: { "Authorization": `Bearer ${token}` } })
        let data = res ? res.data : []
        if (data.totalPages > totalPage.length) {
            for (let i = 1; i <= dataPro.totalPages; i++) {
                setTotalPage((prev) => [...prev, i])
            }
        }
    }

    const updateData = (res, type) => {
        if (type === 'create') {
            let copydata = dataVoucher;
            copydata.unshift(res);
            setData(copydata);
            updateTotalPage();
        }
        else if (type === 'update') {
            let copydata = dataVoucher;
            let getIndex = copydata.findIndex((p) => { return p.id === res.id });
            copydata.fill(res, getIndex, getIndex + 1);
            setData(copydata)
        }
    }

    const editVoucher = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/voucher/get/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
            setVoucher(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteVoucher = (id) => {
        try {
            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
            console.log(token);
            const updateStatusFalse = async () => {
                const res = await axios.put(`http://localhost:8080/api/voucher/setStatusFalse/${id}`, config,
                    { headers: { "Authorization": `Bearer ${token}` } })
                let copyList = [...dataVoucher]
                let getIndex = copyList.findIndex((p) => { return p.id === res.data.id });
                copyList.fill(res.data, getIndex, getIndex + 1);
                setData(copyList)
                console.log(copyList);
                notifySuccess("Bạn đã tạm dừng thành công !!")
                toggleNested()
                // notifyWarning("Thay đổi trạng thái thành công !!")
            }
            updateStatusFalse()
        } catch (error) {
            console.log(error.message)
        }
    }

    const notifySuccess = (text) => {
        toast.success(text, styleToast)
    };
    const notifyWarning = (text) => {
        toast.warning(text, styleToast);
    };
    const styleToast = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }

    const toggleNested = (id) => {
        setNestedModal(!nestedModal);
        console.log(id);
        id && setVoucherId(id)
    };

    const updatevoucherModal = () => {
        setIsupdatevoucherModal(!isupdatevoucherModal)
    }
    const newVoucherModal = () => {
        setIsNewVoucherModal(!isNewVoucherModal)
    }

    const onBack = () => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    const onNext = () => {
        setPage(page + 1 < dataVoucher.length / 7 ? page + 1 : page);
    };

    return (
        <>
            <UpdateVoucher
                isupdatevoucherModal={isupdatevoucherModal}
                toggleModal={updatevoucherModal}
                updateData={updateData}
                voucher={voucher}
            />

            <NewVoucher
                isNewVoucherModal={isNewVoucherModal}
                toggleModal={newVoucherModal}
                updateData={updateData}
                voucher={voucher}
            />

            <div>
                <Table bordered>
                    <thead style={{ verticalAlign: 'middle' }}>
                        <tr>
                            <th colSpan="12">
                                <h3>Khuyến Mãi</h3>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Stt</th>
                            {/* name */}
                            <th scope="col">Tên</th>

                            {/* value */}
                            <th scope="col">Phần giá chiết khấu(%)</th>
                            {/* quantity */}
                            <th scope="col">Lượng sử dụng</th>
                            {/*  */}
                            <th scope="col">Danh mục</th>
                            {/* effect from */}
                            <th scope="col">Ngày bắt đầu</th>
                            {/* effect until */}
                            <th scope="col">Ngày hết hạn</th>
                            <th scope="col">Mô tả</th>
                            {/* status */}
                            <th scope="col">Trạng thái</th>
                            <th scope="col" colspan="2">
                                <NavLink className="btn btn-primary" style={{ borderRadius: 50 }}
                                    onClick={() => newVoucherModal()}>
                                    Thêm mới
                                </NavLink>
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: 'middle' }}>
                        {
                            !isLoading && dataVoucher && dataVoucher.length > 0 && dataVoucher.map((item, index) => {
                                let effectFrom = moment(item.effectFrom).format('DD/MM/YYYY');
                                let effectUntil = moment(item.effectUntil).format('DD/MM/YYYY');
                                { console.log(dataVoucher.length) }
                                // if (item.status != 0)
                                if (item.status == 1) {
                                    return (
                                        item.status == 1 &&
                                        <tr key={item.id}>
                                            <th scope="row" id="">{pageNumber * 7 + index + 1}</th>
                                            <td id="name">{item.name}</td>
                                            <td id="value">{item.value}</td>
                                            <td id="quantity">{item.quantity}</td>
                                            <td id="category">{item.namecate}</td>
                                            <td id="effectFrom">{effectFrom}</td>
                                            <td id="effectUntil">{effectUntil}</td>
                                            <td id="description"><textarea>{item.description}</textarea></td>
                                            <td id="status">{Number(item.status) == 1 ? "Hoạt động" : "Không hoạt động"}</td>
                                            <td>
                                                <button className="btn btn-primary update update-voucher"
                                                    type='buttom' id="update" style={{ borderRadius: 50 }}
                                                    onClick={() => { editVoucher(item.id); updatevoucherModal() }}>
                                                    Cập nhập
                                                </button>
                                            </td>
                                            <td>

                                                <button className="btn btn-danger delete delete-voucher"
                                                    id="delete" style={{ borderRadius: 50 }}
                                                    onClick={() => toggleNested(item.id)}>
                                                    Tạm dừng
                                                </button>

                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return (

                                        item.status == 0 &&
                                        <tr key={item.id} style={{ color: '#c7c7c7' }}>
                                            <th scope="row" id="">{pageNumber * 7 + index + 1}</th>
                                            <td id="name">{item.name}</td>
                                            <td id="value">{item.value}</td>
                                            <td id="quantity">{item.quantity}</td>
                                            <td id="category">{item.namecate}</td>
                                            <td id="effectFrom">{effectFrom}</td>
                                            <td id="effectUntil">{effectUntil}</td>
                                            <td id="description"><textarea>{item.description}</textarea></td>
                                            <td id="status">{Number(item.status) == 1 ? "Hoạt động" : "Không hoạt động"}</td>
                                            <td>
                                                <button className="btn btn-primary update update-voucher"
                                                    type='buttom' id="update" style={{ borderRadius: 50 }}
                                                    onClick={() => { editVoucher(item.id); updatevoucherModal() }}>
                                                    Cập nhập
                                                </button>
                                            </td>
                                            <td>

                                                <button className="btn btn-danger delete delete-voucher"
                                                    id="delete" style={{ borderRadius: 50 }}
                                                    onClick={() => toggleNested(item.id)}>
                                                    Tạm dừng
                                                </button>

                                            </td>

                                        </tr>


                                    )
                                }

                            })
                        }
                        <Modal
                            isOpen={nestedModal}
                            toggle={toggleNested}
                        // size='lg'
                        >
                            <ModalHeader>Tạm dừng</ModalHeader>
                            <ModalBody>
                                Bạn muốn dừng voucher chứ?
                            </ModalBody>
                            <ModalFooter>
                                <Button type='button' color="primary" onClick={() => { deleteVoucher(voucherId) }}>
                                    Tạm dừng
                                </Button>{' '}
                                <Button color="secondary" onClick={() => toggleNested()}>
                                    Hủy bỏ
                                </Button>
                            </ModalFooter>
                        </Modal>
                        {isLoading &&
                            <tr>
                                <h3>Vui lòng đợi...</h3>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <PaginatedItems itemsPerPage={totalPage.length}
                pageable={pageable} />
        </>
    );
}
export default Voucher;