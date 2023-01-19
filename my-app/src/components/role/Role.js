import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import '../voucher/voucher.css';
// import UpdateVoucher from './UpdateVoucher';
import NewRole from './NewRole';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';
import { ToastContainer, toast } from 'react-toastify';
import PaginatedItems from "../../customHook/PaginatedItems";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, PaginationLink, PaginationItem } from 'reactstrap';

const Voucher = () => {

    const token = localStorage.getItem('token');
    const [role, setRole] = useState({});
    const [isNewRoleModal, setIsNewRoleModal] = useState(false)
    const [isupdatevoucherModal, setIsupdatevoucherModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false);
    const [dataRoles, setData] = useState([]);
    console.log(dataRoles);
    const [page, setPage] = useState(0);
    const [voucherId, setVoucherId] = useState()
    const [pageNumber, setPageNumber] = useState()
    const [totalPage, setTotalPage] = useState([])
    const { data: dataRole, isLoading } = useCallGetAPI(`http://localhost:8080/role/get`);



    useEffect(() => {
        if (dataRole && dataRole.length > 0) {
            setData(dataRole)
        }
    }, [dataRole])

    const updateData = (res, type) => {
        if (type == 'create') {
            let copydata = dataRole;
            copydata.unshift(res);
            setData(copydata);
        }
    }

    const editVoucher = async (id) => {
        // try {
        //     const res = await axios.get(`http://localhost:8080/api/voucher/get/${id}`,
        //         { headers: { "Authorization": `Bearer ${token}` } })
        //     setVoucher(res.data)
        // } catch (error) {
        //     console.log(error.message)
        // }
    }

    const deleteVoucher = (id) => {
        // try {
        //     axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        //     let config = {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'Content-Type': 'application/json',
        //         }
        //     }
        //     console.log(token);
        //     const updateStatusFalse = async () => {
        //         const res = await axios.put(`http://localhost:8080/api/voucher/setStatusFalse/${id}`, config)
        //         let copyList = [...dataVoucher]
        //         let getIndex = copyList.findIndex((p) => { return p.id === res.data.id });
        //         copyList.fill(res.data, getIndex, getIndex + 1);
        //         setData(copyList)
        //         console.log(copyList);
        //         notifySuccess("Bạn đã tạm dừng thành công !!")
        //         toggleNested()
        //         // notifyWarning("Thay đổi trạng thái thành công !!")
        //     }
        //     updateStatusFalse()
        // } catch (error) {
        //     console.log(error.message)
        // }
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
    const newRoleModal = () => {
        setIsNewRoleModal(!isNewRoleModal)
    }
    return (
        <>
            <NewRole
                isNewRoleModal={isNewRoleModal}
                toggleModal={newRoleModal}
                updateData={updateData}
                role={role}
            />
            <div>
                <Table bordered>
                    <thead style={{ verticalAlign: 'middle' }}>
                        <tr>
                            <th colSpan="12">
                                <h3>Quyền</h3>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">Stt</th>
                            {/* name */}
                            <th scope="col">Tên</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Quyền truy cập</th>
                            <th scope="col" colspan="2">
                                <NavLink className="btn btn-primary" style={{ borderRadius: 50 }}
                                    onClick={() => newRoleModal()}>
                                    Thêm mới
                                </NavLink>
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: 'middle' }}>
                        {
                            !isLoading && dataRoles && dataRoles.length > 0 && dataRoles.map((item, index) => {
                                { console.log(dataRoles.length) }
                                let premission = ""
                                item.premission.map(item2 => {
                                    premission = premission + " -" + item2.description
                                })
                                // if (item.status != 0)
                                return (
                                    <tr key={item.id}>
                                        <th scope="row" id="">{index + 1}</th>
                                        <td id="name">{item.roleName}</td>
                                        <td id="description">{item.description}</td>
                                        <td id="description">{premission}</td>
                                        <td>
                                            <button className="btn btn-primary update update-voucher"
                                                type='buttom' id="update" style={{ borderRadius: 50 }}
                                                onClick={() => { editVoucher(item.id); updatevoucherModal() }}>
                                                sửa đổi
                                            </button>
                                        </td>
                                        <td>

                                            <button className="btn btn-danger delete delete-voucher"
                                                id="delete" style={{ borderRadius: 50 }}
                                                onClick={() => toggleNested(item.id)}>
                                                Xóa Quyền
                                            </button>

                                        </td>
                                    </tr>
                                )

                            })
                        }
                        <Modal
                            isOpen={nestedModal}
                            toggle={toggleNested}
                        // size='lg'
                        >
                            <ModalHeader>Tạm dừng</ModalHeader>
                            <ModalBody>
                                Bạn muốn xóa quyền này chứ?
                            </ModalBody>
                            <ModalFooter>
                                <Button type='button' color="primary" onClick={() => { deleteVoucher(voucherId) }}>
                                    Xóa Quyền
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
            {/* <PaginatedItems itemsPerPage={totalPage.length}
                pageable={pageable} /> */}
        </>
    );
}
export default Voucher;