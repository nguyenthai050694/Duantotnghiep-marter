import { React, useState, useEffect } from "react";
import useCallGetAPI from '../../customHook/CallGetApi';
import axios from 'axios';
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';
import { useForm } from "react-hook-form";
import { async } from "@firebase/util";
import { ToastContainer, toast } from 'react-toastify';


const VouCher_Rest_API_URL = 'http://localhost:8080/api/voucher';

const NewVoucher = (props) => {
    const token = localStorage.getItem('token');
    const { isNewVoucherModal, toggleModal, updateData } = props;
    const [voucher, setVoucher] = useState({ name: '', value: '', quantity: '', type: 1, categoryId: '', effectFrom: '', effectUntil: '', status: 1 });
    const [lstcate, setLstCate] = useState([]);
    const { data: cates } = useCallGetAPI(`http://localhost:8080/api/category/get`, { headers: { "Authorization": `Bearer ${token}` } });
    const [check, setCheck] = useState({ name: '' });
    const today = new Date();

    const handleOnchangeinput = (event, id) => {
        let copyVoucher = { ...voucher };
        copyVoucher[id] = event.target.value;
        try {
            console.log(new Date(new Date(copyVoucher["effectFrom"]).toDateString()) < new Date(new Date().toDateString()));
            let ch0 = { ...check };
            if (copyVoucher[id].trim().length <= 0) {
                ch0[id] = `${id} không được để trống !!`
                if (id == "value") {
                    ch0[id] = "Giảm giá không được để trống !!!"
                }
                setCheck({
                    ...ch0
                })
            } else {
                if (id == "value" || id == "quantity") {
                    if (Number(copyVoucher[id]) <= 0) {
                        ch0[id] = id == "value" ? "Giảm giá phải lớn hơn 0 !!!" : "Lượt sử dụng phải lớn hơn 0 !!"
                    }
                    else {
                        ch0[id] = ""
                    }
                }
                else if (id == "effectFrom") {
                    if (new Date(new Date(copyVoucher["effectFrom"]).toDateString()) < new Date(new Date().toDateString())) {
                        ch0["effectFrom"] = "Bắt đầu từ ngày hôm nay"
                        if (new Date(new Date(copyVoucher["effectUntil"]).toDateString()) >= new Date(new Date(copyVoucher["effectFrom"]).toDateString())) {
                            ch0["effectUntil"] = ""
                        }
                    }
                    else if (new Date(new Date(copyVoucher["effectUntil"]).toDateString()) < new Date(new Date(copyVoucher["effectFrom"]).toDateString())) {
                        ch0["effectUntil"] = "Sau ngày bắt đầu"
                        if (new Date(new Date(copyVoucher["effectFrom"]).toDateString()) >= new Date(new Date().toDateString())) {
                            ch0["effectFrom"] = ""
                        }
                    }

                    else {
                        ch0[id] = ""
                    }
                }
                else if (id == "effectUntil") {

                    if (new Date(new Date(copyVoucher["effectUntil"]).toDateString()) < new Date(new Date(copyVoucher["effectFrom"]).toDateString())) {
                        ch0["effectUntil"] = "Sau ngày bắt đầu"
                    }
                    else {
                        ch0[id] = ""
                    }
                }
                else {
                    ch0[id] = ""
                }
                setCheck({
                    ...ch0
                })
            }
        } catch (error) {
            // let ch0 = { ...check };
            // ch0[id] = `${id} không được để trống !!`
            console.log(error);
            // setCheck({
            //     ...ch0
            // })
        }
        setVoucher({
            ...copyVoucher
        })
    }

    const status = [{
        id: 1,
        title: "Giảm theo %",
    }, {
        id: 0,
        title: "Giảm theo VND",
    },
    ];

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

    const createVoucher = (data) => {
        try {
            let ch0 = { ...check };
            const createVou = async () => {
                if (voucher.name?.trim().length <= 0
                    && voucher.value?.trim().length <= 0
                    && voucher.quantity?.trim().length <= 0
                    && voucher.categoryId?.trim().length <= 0
                    && voucher.effectFrom?.trim().length <= 0
                    && voucher.effectUntil?.trim().length <= 0
                ) {
                    ch0["name"] = "Tên không để trống"
                    ch0["value"] = "Giảm giá không để trống"
                    ch0["quantity"] = "Lượt sử dụng không để trống"
                    ch0["categoryId"] = "Cần chọn danh mục"
                    ch0["effectFrom"] = "Bạn chưa chọn ngày"
                    ch0["effectUntil"] = "Bạn chưa chọn ngày"
                    setCheck({ ...ch0 })
                    return
                }
                else if (voucher.name.trim().length <= 0) {
                    ch0["name"] = "Tên không để trống"
                    setCheck({ ...ch0 })
                    return
                }
                else if (voucher.value.trim().length <= 0) {
                    ch0["value"] = "Giảm giá không để trống"
                    setCheck({ ...ch0 })
                    return
                }
                else if (voucher.quantity.trim().length <= 0) {
                    ch0["quantity"] = "Lượt sử dụng không để trống"
                    setCheck({ ...ch0 })
                    return
                }
                else if (voucher.categoryId.trim().length <= 0) {
                    ch0["categoryId"] = "Cần chọn danh mục"
                    setCheck({ ...ch0 })
                    return
                }
                else if (voucher.effectFrom.trim().length <= 0) {
                    ch0["effectFrom"] = "Bạn chưa chọn ngày"
                    setCheck({ ...ch0 })
                    return
                }
                else if (voucher.effectUntil.trim().length <= 0) {
                    ch0["effectUntil"] = "Bạn chưa chọn ngày"
                    setCheck({ ...ch0 })
                    return
                }
                else if (check.effectUntil.trim().length > 0
                    || check.effectFrom.trim().length > 0
                    || check.name.trim().length > 0
                    || check.value.trim().length > 0
                    || check.quantity.trim().length > 0
                    || check.categoryId.trim().length > 0) {
                    return
                }

                let res = await axios.post(VouCher_Rest_API_URL + '/create', voucher)
                let datares = (res && res.data) ? res.data : []
                datares.effectFrom = moment(datares.effectFrom).format('DD/MM/YYYY HH:mm:ss');
                if (datares.effectUntil > 0) {
                    datares.effectUntil = moment(datares.effectUntil).format('DD/MM/YYYY HH:mm:ss');
                }
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
        setLstCate(cates)
    }, [cates])

    const toggle = () => {
        toggleModal()
        setVoucher({ name: '', value: '', quantity: '', type: 1, categoryId: '', effectFrom: '', effectUntil: '' })
        setCheck({})
    }

    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isNewVoucherModal} toggle={() => toggle()} size='lg' centered>
                <form className="needs-validation" onSubmit={handleSubmit(createVoucher)}>
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
                                            id="name"
                                            name="name"
                                            placeholder=""
                                            value={voucher.name}
                                            onChange={(event) => handleOnchangeinput(event, 'name')}
                                        // {...register("code", {
                                        //     required: true,
                                        //     pattern: /^\s*\S+.*/
                                        // })}
                                        />
                                        {check.name && check.name.length > 0 && <p className="checkError">{check.name}</p>}
                                        {/* {errors.code && (
                                            <div className="alert alert-danger" role="alert">
                                                Code không hợp lệ!
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Giảm giá (%)-(VND)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                            max={100}
                                            placeholder=""
                                            id="value"
                                            name="value"
                                            value={voucher.value}
                                            onChange={(event) => handleOnchangeinput(event, 'value')}
                                        // {...register("discount", {
                                        //     required: true,
                                        //     min: 0,
                                        //     max: 100
                                        // })}
                                        />
                                        {check.value && check.value.length > 0 && <p className="checkError">{check.value}</p>}
                                        {/* {errors.discount && (
                                            <div className="alert alert-danger" role="alert">
                                                Giảm giá không hợp lệ!
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Phần giá chiết khấu</label>
                                        <select
                                            className="form-control"
                                            placeholder=""
                                            id="type"
                                            name="type"
                                            value={voucher.type}
                                            onChange={(event) => handleOnchangeinput(event, 'type')}
                                        // {...register("discount", {
                                        //     required: true,
                                        //     min: 0,
                                        //     max: 100
                                        // })}
                                        >
                                            {/* {errors.discount && (
                                            <div className="alert alert-danger" role="alert">
                                                Giảm giá không hợp lệ!
                                            </div>
                                        )} */}
                                            {status.map(item => {

                                                return <option value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Lượt sử dụng</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                            placeholder=""
                                            id="quantity"
                                            name="quantity"
                                            value={voucher.quantity}
                                            onChange={(event) => handleOnchangeinput(event, 'quantity')}
                                        // {...register("count", {
                                        //     required: true,
                                        //     min: 0
                                        // })}
                                        />
                                        {check.quantity && check.quantity.length > 0 && <p className="checkError">{check.quantity}</p>}
                                        {/* {errors.count && (
                                            <div className="alert alert-danger" role="alert">
                                                Lượt sử dụng không hợp lệ!
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Danh mục</label>
                                        <select
                                            className="form-control"
                                            id="name_cate"
                                            name="name_cate"
                                            placeholder=""
                                            // value={voucher.name_cate}
                                            onChange={(event) => handleOnchangeinput(event, 'categoryId')}
                                        // {...register("isActive", { required: false })}
                                        >
                                            <option value="" disabled selected>
                                                Select category
                                            </option>
                                            {
                                                lstcate.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>
                                                            {item.namecate}
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                        {check.categoryId && check.categoryId.length > 0 && <p className="checkError">{check.categoryId}</p>}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            min="2022-01-01"
                                            placeholder=""
                                            className="form-control"
                                            id="effectFrom"
                                            value={voucher.effectFrom}
                                            onChange={(event) => handleOnchangeinput(event, 'effectFrom')}
                                        // {...register("expireDate", {
                                        //     required: true
                                        // })}
                                        />
                                        {check.effectFrom && check.effectFrom.length > 0 && <p className="checkError">{check.effectFrom}</p>}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            max="2024-01-01"
                                            className="form-control"
                                            placeholder=""
                                            id="effectUntil"
                                            value={voucher.effectUntil}
                                            onChange={(event) => handleOnchangeinput(event, 'effectUntil')}
                                        // {...register("expireDate", {
                                        //     required: true
                                        // })}
                                        />
                                        {check.effectUntil && check.effectUntil.length > 0 && <p className="checkError">{check.effectUntil}</p>}
                                    </div>
                                    <div className="col-sm-12 mt-5">
                                        <label className="form-label">Mô tả</label>
                                        <textarea
                                            type="description"
                                            className="form-control "
                                            placeholder=""
                                            name="description"
                                            id="description"
                                            value={voucher.description}
                                            onChange={(event) => handleOnchangeinput(event, 'description')}
                                        // {...register("expireDate", {
                                        //     required: true
                                        // })}
                                        />
                                    </div>

                                </div>
                                {/* <button
                                    className="btn btn-primary btn-lg mt-5 mb-5"
                                    type="submit"
                                    style={{ marginLeft: 80, borderRadius: 50 }}
                                >
                                    Thêm mới
                                </button> */}

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
export default NewVoucher;