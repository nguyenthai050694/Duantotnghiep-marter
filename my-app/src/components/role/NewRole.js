import { React, useState, useEffect } from "react";
import useCallGetAPI from '../../customHook/CallGetApi';
import axios from 'axios';
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';
import { useForm } from "react-hook-form";
import { async } from "@firebase/util";
import { ToastContainer, toast } from 'react-toastify';
import Multiselect from "multiselect-react-dropdown";
import { Prev } from "react-bootstrap/esm/PageItem";

const Role_Rest_API_URL = 'http://localhost:8080/role';

const NewRole = (props) => {
    const { isNewRoleModal, toggleModal, updateData } = props;
    const [role, setRole] = useState({ roleName: '', description: '' });
    const [lstPremis, setLstPre] = useState([]);
    const { data: premissions } = useCallGetAPI(`http://localhost:8080/role/getPermission`);
    const [check, setCheck] = useState({ name: '' });
    const [options, setOptions] = useState([]);

    const handleOnchangeinput = (event, id) => {
        let copyRole = { ...role };
        copyRole[id] = event.target.value;
        try {
            let ch0 = { ...check };
            if (copyRole[id].trim().length <= 0) {
                ch0[id] = `${id} không được để trống !!`
                if (id == "value") {
                    ch0[id] = "Giảm giá không được để trống !!!"
                }
                setCheck({
                    ...ch0
                })
            } else {
                ch0[id] = ""
                setCheck({
                    ...ch0
                })
            }
        } catch (error) {
            console.log(error);
        }
        setRole({
            ...copyRole
        })
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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const createRole = (data) => {
        try {
            let ch0 = { ...check };
            const createVou = async () => {
                if (role.roleName?.trim().length <= 0
                    && role.description?.trim().length <= 0
                ) {
                    ch0["roleName"] = "Tên không để trống"
                    ch0["description"] = "Mô tả không để trống"
                    setCheck({ ...ch0 })
                    return
                }
                else if (role.roleName.trim().length <= 0) {
                    ch0["roleName"] = "Tên không để trống"
                    setCheck({ ...ch0 })
                    return
                }
                else if (role.value.trim().length <= 0) {
                    ch0["description"] = "Mô tả không để trống"
                    setCheck({ ...ch0 })
                    return
                }
                else if (check.roleName.trim().length > 0
                    || check.description.trim().length > 0
                ) {
                    return
                }

                let res = await axios.post(Role_Rest_API_URL + '/create', role)
                let datares = (res && res.data) ? res.data : []
                updateData(datares, `create`)
                console.log(datares);
                toggle()
                notifySuccess("Thêm mới thành công")
            }
            createVou();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setLstPre(premissions)
        setOptions([]);
        premissions.map(item => { setOptions((Prev) => [...Prev, item.description]) })
    }, [premissions])

    const toggle = () => {
        toggleModal()
        setRole({ roleName: '', description: '' })
        setCheck({})
    }

    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isNewRoleModal} toggle={() => toggle()} size='lg' centered>
                <form className="needs-validation" onSubmit={handleSubmit(createRole)}>
                    <ModalHeader toggle={() => toggle()}>Thêm mới</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-10 offset-1">

                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="roleName"
                                            name="roleName"
                                            placeholder=""
                                            value={role.roleName}
                                            onChange={(event) => handleOnchangeinput(event, 'roleName')}
                                        />
                                        {check.roleName && check.roleName.length > 0 && <p className="checkError">{check.roleName}</p>}
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Mô tả</label>
                                        {/* <Multiselect
                                            isObject={false}
                                            options={options}
                                            showCheckbox
                                        /> */}
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            id="description"
                                            name="description"
                                            value={role.description}
                                            onChange={(event) => handleOnchangeinput(event, 'description')}
                                        />
                                        {check.description && check.description.length > 0 && <p className="checkError">{check.description}</p>}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Quyền truy cập</label>
                                        <Multiselect
                                            isObject={false}
                                            options={options}
                                            showCheckbox
                                        />
                                        {/* <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                            placeholder=""
                                            id="quantity"
                                            name="quantity"
                                            value={role.quantity}
                                            onChange={(event) => handleOnchangeinput(event, 'quantity')}
                                        />
                                        {check.quantity && check.quantity.length > 0 && <p className="checkError">{check.quantity}</p>} */}
                                        {/* <button
                                            className="btn btn-primary btn-lg mt-5 mb-5"
                                            type="submit"
                                            style={{ marginLeft: 80, borderRadius: 50 }}
                                        >
                                            Thêm mới
                                        </button> */}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            Thêm mới
                        </Button>{' '}
                        <Button color="secondary" onClick={() => toggle()}>
                            Hủy bỏ
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}
export default NewRole;