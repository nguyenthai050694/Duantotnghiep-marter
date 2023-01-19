import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../voucher/voucher.css';
import axios from 'axios';
import useCallGetAPI from '../../customHook/CallGetApi';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

const UpdateVoucher = (props) => {

    const token = localStorage.getItem('token');
    const { isupdatevoucherModal, toggleModal, updateData } = props;
    const [voucher, setVoucher] = useState(props.voucher);
    const [lstcate, setLstCate] = useState([]);
    const { data: cates } = useCallGetAPI(`http://localhost:8080/api/category/get`, { headers: { "Authorization": `Bearer ${token}` } });

    // console.log("Timestamp:" + voucher.effectUntil);
    const Day = new Date(voucher.effectFrom).getDate();
    const Month = new Date(voucher.effectFrom).getMonth() + 1;
    const Year = new Date(voucher.effectFrom).getFullYear();
    // const NewDateEffectFrom = `${Day}/${Month}/${Year}`;
    // const NewDateEffectFrom = `${Year}-${Month}-${Day}`;
    const newdata = Year + '-' + (Month <= 9 ? '0' + Month : Month) + '-' + (Day <= 9 ? '0' + Day : Day);
    // console.log("Day:" + Day);
    // console.log("Month:" + Month);
    // console.log("Year:" + Year);
    // console.log(NewDateEffectFrom);
    // console.log(newdata);
    // DateFomat effectUntil
    const Day1 = new Date(voucher.effectUntil).getDate();
    const Month1 = new Date(voucher.effectUntil).getMonth() + 1;
    const Year1 = new Date(voucher.effectUntil).getFullYear();
    const newdataEffectuntil = Year1 + '-' + (Month1 <= 9 ? '0' + Month1 : Month1) + '-' + (Day1 <= 9 ? '0' + Day1 : Day1);

    const [check, setCheck] = useState({ name: '', value: '', quantity: '', type: 1, categoryId: '', effectFrom: '', effectUntil: '' });
    const status = [{
        id: 1,
        title: "Hoạt động",
    }, {
        id: 0,
        title: "Không hoạt động",
    },
    ];

    useEffect(() => {
        setLstCate(cates)
    }, [cates])

    useEffect(() => {
        setVoucher(props.voucher)

    }, [props.voucher])

    const handleOnchangeInput = (event, id) => {
        let copyVoucher = { ...voucher };
        copyVoucher[id] = event.target.value;
        try {

            let ch1 = { ...check };
            if (copyVoucher[id].trim().length <= 0) {
                ch1[id] = `${id} không được để trống !!`
                if (id == "value") {
                    ch1[id] = "Giảm giá không được để trống !!"
                }
                setCheck({
                    ...ch1
                })
            } else {
                if (id == "value" || id == "quantity") {
                    if (Number(copyVoucher[id]) <= 0) {
                        ch1[id] = id == "value" ? "Giảm giá phải lớn hơn 0 !!" : "Lượt sử dụng phải lớn hơn 0 !!"
                    } else {
                        ch1[id] = ""
                    }
                } else if (id == "effectFrom") {
                    if (new Date(new Date(copyVoucher["effectFrom"]).toDateString()) < new Date(new Date().toDateString())) {
                        ch1["effectFrom"] = "Bắt đầu từ ngày hôm nay"
                        if (new Date(new Date(copyVoucher["effectUntil"]).toDateString()) >= new Date(new Date(copyVoucher["effectFrom"]).toDateString())) {
                            ch1["effectUntil"] = ""
                        }
                    }
                    else if (new Date(new Date(copyVoucher["effectUntil"]).toDateString()) < new Date(new Date(copyVoucher["effectFrom"]).toDateString())) {
                        ch1["effectUntil"] = "Sau ngày bắt đầu"
                        if (new Date(new Date(copyVoucher["effectFrom"]).toDateString()) >= new Date(new Date().toDateString())) {
                            ch1["effectFrom"] = ""
                        }
                    }
                    else {
                        ch1[id] = ""
                    }
                }
                else if (id == "effectUntil") {
                    if (new Date(new Date(copyVoucher["effectUntil"]).toDateString()) < new Date(new Date(copyVoucher["effectFrom"]).toDateString())) {
                        ch1["effectUntil"] = "Sau ngày bắt đầu"
                    }
                    else {
                        ch1[id] = ""
                    }
                } else {
                    ch1[id] = ``
                }
                setCheck({
                    ...ch1
                })
            }
        } catch (error) {
            let ch1 = { ...check };
            ch1[id] = `${id} không được để trống !!`
            console.log(error);
            setCheck({
                ...ch1
            })
        }
        // console.log(event.target[event.target.selectedIndex].value)
        setVoucher({
            ...copyVoucher
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
    console.log(voucher);

    const updateVoucher = async () => {
        try {
            let ch1 = { ...check };
            let value = "" + voucher.value
            let quantity = "" + voucher.quantity
            if (voucher.name?.trim().length <= 0
                && value.trim().length <= 0
                && quantity.trim().length <= 0
                && voucher.effectFrom?.trim().length <= 0
                && voucher.effectUntil?.trim().length <= 0) {
                ch1["name"] = "Tên không để trống"
                ch1["value"] = "Giảm giá không để trống"
                ch1["quantity"] = "Lượt sử dụng không để trống"
                ch1["effectFrom"] = "Bạn chưa chọn ngày"
                ch1["effectUntil"] = "Bạn chưa chọn ngày"
                setCheck({ ...ch1 })
                return
            } else if (voucher.name?.trim().length <= 0) {
                ch1["name"] = "Tên không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (value.trim().length <= 0) {
                ch1["value"] = "Giảm giá không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (quantity.trim().length <= 0) {
                ch1["quantity"] = "Lượt sử dụng không để trống"
                setCheck({ ...ch1 })
                return
            }
            else if (voucher.effectFrom?.trim().length <= 0) {
                ch1["effectFrom"] = "Bạn chưa chọn ngày"
                setCheck({ ...ch1 })
                return
            }
            else if (voucher.effectUntil?.trim().length <= 0) {
                ch1["effectUntil"] = "Bạn chưa chọn ngày"
                setCheck({ ...ch1 })
                return
            }
            else if (
                check.effectUntil.trim().length > 0
                || check.effectFrom.trim().length > 0
                || check.name?.trim().length > 0
                || check.value.trim().length > 0
                || check.quantity.trim().length > 0
            ) {
                return
            }

            const res = await axios.put(`http://localhost:8080/api/voucher/update/${voucher.id}`, voucher,
                { headers: { "Authorization": `Bearer ${token}` } })
            let data = (res && res.data) ? res.data : [];
            // data.effectFrom = moment(data.effectFrom).format('DD/MM/YYYY HH:mm:ss');
            // data.effectUntil = moment(data.effectUntil).format('DD/MM/YYYY HH:mm:ss');
            toggle()
            updateData(data, 'update')
            notifySuccess("Cập nhập thành công")
        } catch (error) {
            console.log(error.message);
        }
    }


    const toggle = () => {
        toggleModal()
        setVoucher({})
        setCheck({})
    }
    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isupdatevoucherModal} toggle={() => toggle()} size='lg' centered>
                <ModalHeader toggle={() => toggle()}>Cập Nhập</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <form className="needs-validation">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Tên</label>
                                        {/* không cho người dùng nhập thì dùng readOnly */}
                                        <input type="text"
                                            className="form-control"
                                            placeholder=""
                                            id="name"
                                            name="name"
                                            required
                                            value={voucher.name}
                                            onChange={(event) => handleOnchangeInput(event, 'name')} />
                                        {check.name && check.name.length > 0 && <p className="checkError">{check.name}</p>}
                                        {/* {errors.code && (
                                        <div className="alert alert-danger" role="alert">
                                            Code không hợp lệ!
                                        </div>
                                    )} */}
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Phần giá chiết khấu</label>
                                        <input
                                            type="number"
                                            placeholder=""
                                            className="form-control"
                                            min={0}
                                            max={100}
                                            id="value"
                                            name="value"
                                            value={voucher.value}
                                            onChange={(event) => handleOnchangeInput(event, 'value')}
                                        />
                                        {check.value && check.value.length > 0 && <p className="checkError">{check.value}</p>}
                                        {/* {errors.discount && (
                                        <div className="alert alert-danger" role="alert">
                                            Giảm giá không hợp lệ!
                                        </div>
                                    )} */}
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
                                            onChange={(event) => handleOnchangeInput(event, 'quantity')}
                                        // {...register("count", {
                                        //     required: true,
                                        //     min: 0,
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
                                        <label className="form-label">Trạng thái</label>
                                        <select
                                            className="form-control"
                                            id="status"
                                            name="status"
                                            placeholder=""
                                            value={voucher.status}
                                            onChange={(event) => handleOnchangeInput(event, 'status')}
                                        // {...register("isActive", { required: false })}
                                        >
                                            {/* {voucher.status === 1 &&
                                                <>
                                                    <option selected value={1}>Hoạt động</option>
                                                    <option value={0}>Không hoạt động</option>
                                                </>
                                            }
                                            <option value='1'>Hoạt động</option>
                                            <option value='0'>Không hoạt động</option>
                                            {voucher.status === 0 &&
                                                <>
                                                    <option value={1}>Hoạt động</option>
                                                    <option selected value={0}>Không hoạt động</option>
                                                </>
                                            } */}
                                            {status.map(item => {
                                                if (voucher.status === item.id) {
                                                    return <option selected value={item.id}>{item.title}</option>
                                                }
                                                return <option value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-sm-12 mt-5">
                                        <label className="form-label">Danh mục</label>
                                        <select
                                            className="form-control"
                                            id="categoryId"
                                            name="categoryId"
                                            placeholder=""
                                            // value={voucher.name_cate}
                                            onChange={(event) => handleOnchangeInput(event, 'categoryId')}
                                        // {...register("isActive", { required: false })}
                                        >
                                            {lstcate.map((item, index) => {
                                                if (item.id === voucher.categoryId) {
                                                    return (
                                                        <option key={index} value={item.id} selected>
                                                            {item.namecate}
                                                        </option>
                                                    )
                                                }
                                                return (
                                                    <option key={index} value={item.id} >
                                                        {item.namecate}
                                                    </option>
                                                )

                                            })}
                                        </select>
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày bắt đầu</label>
                                        <input
                                            type="date"
                                            min="2022-01-01"
                                            id="effectFrom"
                                            placeholder=""
                                            value={newdata}
                                            onChange={(event) => handleOnchangeInput(event, 'effectFrom')}
                                            className="form-control"
                                        // {...register("expireDate", {
                                        //     required: true,
                                        // })}
                                        />
                                        {check.effectFrom && check.effectFrom.length > 0 && <p className="checkError">{check.effectFrom}</p>}
                                    </div>
                                    <div className="col-sm-6 mt-5">
                                        <label className="form-label">Ngày kết thúc</label>
                                        <input
                                            type="date"
                                            // min="2022-01-01"
                                            // max="2023-01-01"
                                            className="form-control"
                                            id="effectUntil"
                                            value={newdataEffectuntil}
                                            onChange={(event) => handleOnchangeInput(event, 'effectUntil')}
                                        // {...register("expireDate", {
                                        //     required: true,
                                        // })}
                                        />
                                        {check.effectUntil && check.effectUntil.length > 0 && <p className="checkError">{check.effectUntil}</p>}
                                    </div>
                                    <div className="col-sm-12 mt-5">
                                        <label className="form-label">Mô tả</label>
                                        <textarea
                                            type="description"
                                            // min="2022-01-01"
                                            // max="2023-01-01"
                                            className="form-control"
                                            id="description"
                                            value={voucher.description}
                                            onChange={(event) => handleOnchangeInput(event, 'description')}
                                        // {...register("expireDate", {
                                        //     required: true,
                                        // })}
                                        />
                                    </div>

                                </div>
                                {/* <button
                                    className="btn btn-primary btn-lg mt-5 mb-5"
                                    type="submit"
                                    style={{ marginLeft: 80, borderRadius: 50 }}
                                >
                                    Cập nhật
                                </button> */}
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { updateVoucher(); }}>
                        Cập nhập
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Hủy bỏ
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default UpdateVoucher;