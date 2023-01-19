import { React, useState, useEffect } from "react";
import NumericInput from "react-numeric-input";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../css/CartPage.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import axios from "axios";
import useCallGetAPI from "../../customHook/CallGetApi";
import {
  Table,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  ModalHeader,
} from "reactstrap";
import Badge from "@mui/material/Badge";
import { async } from "@firebase/util";
import moment from 'moment'

const Order = (props) => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  let imagesListRef = ref(storage, "images/");
  const [lstproduct, setLstProduct] = useState([]);
  const { data: dataOrder, isLoading } = useCallGetAPI(
    `http://localhost:8080/api/order/findAll`
  );
  const [order, setOrder] = useState({})
  const [orderDetail, setOrderDetail] = useState([])
  const [lstOrder, setLstOrder] = useState([]);
  const [source, setSource] = useState();
  const [number, setNumber] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const statuses = [
    {
      id: 1,
      checked: false,
    },
    {
      id: 2,
      checked: false,
    },
    {
      id: 3,
      checked: false,
    },
    {
      id: 4,
      checked: false,
    },
    {
      id: 0,
      checked: false,
    },
  ];
  const [isModalOrder, setIsModalOrder] = useState(false)
  const [isModal, setIsModal] = useState(false);
  let totalPrice = 0
  let totalQuantity = 0

  useEffect(() => {
    setLstOrder([]);
    dataOrder.map((item) => {
      let copydata = [...statuses];
      let getIndex = statuses.findIndex((p) => {
        return p.id == item.status;
      });
      let data = { id: item.status, checked: true };
      copydata.fill(data, getIndex, getIndex + 1);
      item["statuses"] = copydata;
      setLstOrder((prev) => [...prev, item]);
    });
  }, [dataOrder]);


  useEffect(() => {
    setImageUrls([]);
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        let nameImg = item.name;
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, { nameImg, url }]);
        });
      });
    });
  }, []);

  const updatedata = (res) => {
    let data = res ? res.data : {};
    let copydata = [...lstOrder];
    let getIndex = copydata.findIndex((p) => {
      return p.id == data.id;
    });

    // setStatuses
    let lstStatus = [...statuses];
    let getIndexStatus = lstStatus.findIndex((p) => {
      return p.id == data.status;
    });
    let statuschecked = { id: data.status, checked: true };
    lstStatus.fill(statuschecked, getIndexStatus, getIndexStatus + 1);

    //setStatuses to Order
    data["statuses"] = lstStatus;
    copydata.fill(data, getIndex, getIndex + 1);
    setLstOrder(copydata);
  };

  const findOrderAndOrderDetail = async (order_Id) => {
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
    let res = await axios.get(
      `http://localhost:8080/api/order/find/${order_Id}`,
      config
    );
    if (res.data) {
      res.data.created = moment(res.data.created).format('DD/MM/YYYY HH:mm:ss');
      if (res.data.paymentAtDate != null) {
        res.data.paymentAtDate = moment(res.data.paymentAtDate).format('DD/MM/YYYY HH:mm:ss')
      }
      if (res.data.recaiveAtDate != null) {
        res.data.recaiveAtDate = moment(res.data.recaiveAtDate).format('DD/MM/YYYY HH:mm:ss')
      }
      if (res.data.completedAtDate != null) {
        res.data.completedAtDate = moment(res.data.completedAtDate).format('DD/MM/YYYY HH:mm:ss')
      }
      if (res.data.cancelledAtDate != null) {
        res.data.cancelledAtDate = moment(res.data.cancelledAtDate).format('DD/MM/YYYY HH:mm:ss')
      }
      if (res.data.returnAtDate != null) {
        res.data.returnAtDate = moment(res.data.returnAtDate).format('DD/MM/YYYY HH:mm:ss')
      }
      setOrder(res.data)
      let od_Detail = await axios.get(
        `http://localhost:8080/api/orderDetail/findByOrder_Id/${res.data.id}`,
        config
      );
      setOrderDetail(od_Detail.data)
      toggleOrder()
    }
  }

  const toggle = () => {
    setIsModal(!isModal);
  };
  const toggleOrder = () => {
    setIsModalOrder(!isModalOrder);
  };

  const [check, setCheck] = useState({});

  const setStatusOrder = async () => {
    if (check.id == 3) {
      if (check.status == 2) {
        let res = await axios.get(
          `http://localhost:8080/api/order/delivered/${check.order_Id}`
        );
        updatedata(res);
        toast.success("Cập nhật đơn hàng thành công", styleToast);
        return;
      } else if (check.status == 0) {
        toast.error("Đơn hàng đã bị hủy!", styleToast);
        return;
      }
      else if (check.status == 4) {
        toast.error("Đơn hàng đã bị hủy!", styleToast);
        return;
      } else if (check.status == check.id) {
        return;
      }
      check.e.preventDefault();
      toast.error("Đơn hàng chưa được thanh toán", styleToast);
    } else if (check.id == 0) {
      if (check.status == 4) {
        toast.error("Đơn hàng đã giao thành công, không thể hủy!", styleToast);
        return;
      }
      let res = await axios.get(
        `http://localhost:8080/api/order/cancel/${check.order_Id}`
      );
      updatedata(res);
      toast.success("Hủy đơn hàng thành công", styleToast);
    }
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
  };


  return (
    <>
      <ToastContainer />
      <Table bordered>
        <thead style={{ verticalAlign: "middle" }}>
          <tr>
            <th>Mã</th>
            <th>Người nhận</th>
            {/* <th>Price</th> */}
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Ngày đặt</th>
            <th>Chờ thanh toán</th>
            <th>Đã thanh toán</th>
            <th>Đang giao</th>
            <th>Giao thành công</th>
            <th>ĐÃ hủy</th>
          </tr>
        </thead>
        <tbody style={{ verticalAlign: "middle" }}>
          {!isLoading &&
            lstOrder &&
            lstOrder.length > 0 &&
            lstOrder.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td id="category"
                    onClick={() => findOrderAndOrderDetail(item.id)}
                  >{item.code}jd2shas21sb12d1d32</td>
                  <td id="category">{item.nameRecipient}</td>
                  {/* <td id="price">{item.price}</td> */}
                  <td id="quantity">{item.telephone}</td>
                  <td id="category">{item.address}</td>
                  <td id="description">{item.created}</td>
                  {item.statuses.map((item2) => {
                    if (
                      item2.checked == true &&
                      item2.id != 1 &&
                      item2.id != 2 &&
                      item2.id != 4
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) =>
                              setCheck({
                                order_Id: item.id,
                                id: item2.id,
                                status: item.status,
                                e: e,
                              })
                            }
                            checked
                            name={item.id}
                          />
                        </td>
                      );
                    } else if (
                      item2.checked == true &&
                      item2.id != 0 &&
                      item2.id != 3
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) => {
                              setStatusOrder(item.id, item2.id, item.status);
                              toggle();
                            }}
                            checked
                            disabled
                            name={item.id}
                          />
                        </td>
                      );
                    } else if (
                      item2.checked == false &&
                      item2.id != 0 &&
                      item2.id != 3
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) =>
                              setStatusOrder(item.id, item2.id, item.status)
                            }
                            disabled
                            name={item.id}
                          />
                        </td>
                      );
                    } else if (
                      item2.checked == false &&
                      item2.id != 1 &&
                      item2.id != 2 &&
                      item2.id != 4
                    ) {
                      return (
                        <td>
                          <input
                            type="radio"
                            onClick={(e) => {
                              toggle();
                              setCheck({
                                order_Id: item.id,
                                id: item2.id,
                                status: item.status,
                                e: e,
                              });
                            }}
                            name={item.id}
                          />
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          {isLoading && (
            <tr>
              <h3>Vui lòng đợi...</h3>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal isOpen={isModal} toggle={() => toggle()} centered>
        <ModalHeader toggle={() => toggle()}>
          <h2>Cập nhập đơn hàng</h2>
        </ModalHeader>
        <ModalBody>
          {check.id == 3 && <h4>xác nhận giao hàng?</h4>}
          {check.id == 0 && <h4>xác nhận hủy?</h4>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setStatusOrder();
              toggle();
            }}
          >
            Ok
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={isModalOrder} toggle={() => toggleOrder()} centered size="xl">
        <ModalHeader toggle={() => toggleOrder()}>
          <Row style={{ marginBottom: "5px" }}>
            <Col md={7}>
              <Row style={{ marginBottom: "5px" }}>
                <Col md={7}>
                  <h5>Mã: {order.code}</h5>
                  <h5>Người nhận: {order.nameRecipient}</h5>
                </Col>
                <Col md={5}>
                  <h5>Điện thoại: {order.telephone}</h5>
                </Col>
                <Col md={12}>
                  <h5>Địa chỉ: {order.address}</h5>
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <p>Ngày đặt: {order.created}</p>
              {order.paymentAtDate != null && <p>Ngày thanh toán: {order.paymentAtDate}</p>}
              {order.recaiveAtDate != null && <p>Ngày giao: {order.recaiveAtDate}</p>}
              {order.completedAtDate != null && <p>Ngày nhận: {order.completedAtDate}</p>}
              {order.cancelledAtDate != null && <p>Ngày hủy: {order.cancelledAtDate}</p>}
              {order.returnAtDate != null && <p>Ngày trả hàng: {order.returnAtDate}</p>}
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          {orderDetail.map((lstcart, index) => {
            totalPrice += lstcart.price
            totalQuantity += lstcart.quantity
            return (
              <>
                <Row style={{ marginBottom: "5px" }}>
                  <Col md={3}>
                    {imageUrls.map((img, index1) => {
                      return (
                        img.nameImg === lstcart.image &&
                        <Badge
                          badgeContent={lstcart.quantity}
                          color="primary"
                        >
                          <img src={img.url} width="150px" height="100px" />
                        </Badge>
                      );
                    })}
                  </Col>
                  <Col md={3}>
                    <p>
                      {lstcart.name_Product} / {lstcart.sizeName}
                    </p>
                  </Col>
                  <Col md={3}>
                    <p>
                      {lstcart.color_Product}
                    </p>
                  </Col>
                  <Col md={3}>
                    <p>{lstcart.price * lstcart.quantity}</p>
                  </Col>
                </Row>
                {index != orderDetail.length - 1 && <hr />}
              </>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <div style={{ marginRight: '35%' }}>
            Tổng sản phẩm: {totalQuantity}
          </div>
          <div style={{ marginRight: '35%' }}>
            Tổng tiền: {totalPrice} VNĐ
          </div>
          <Button color="secondary" onClick={() => toggleOrder()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Order;
