import { React, useState, useEffect } from "react";
import axios from "axios";
import "../user/user.css";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Form,
} from "reactstrap";

// class UpdateUser extends Component {
const UpdateUser = (props) => {
  // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];

  const {
    isUpdateModal,
    toggleModal,
    updateData,
    uploadFile,
    setImageUpload,
    imageUpload,
    urlImg,
    setUrlImg
  } = props;
  const [user, setUser] = useState({
    fullName: "",
    password: "",
    email: "",
    telephone: "",
    address: "",
    roleId: 1,
    image: "",
    status: 1,
  });
  const [check, setCheck] = useState({ fullName: "" });

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const handleOnchangeInput = (event, id) => {
    const copyUser = { ...user };
    copyUser[id] = event.target.value;

    try {
      // console.log(new Date(new Date(copyVoucher["effectFrom"]).toDateString()) < new Date(new Date().toDateString()));
      if (id != "image") {
        let ch0 = { ...check };
        if (copyUser[id].trim().length <= 0) {
          ch0[id] = `${id} not null !!`;
          setCheck({
            ...ch0,
          });
        } else {
          ch0[id] = "";
        }
        setCheck({
          ...ch0,
        });
      }
      if (id == "image") {
        if (copyUser["image"].trim().length <= 0) setImageUpload("");
      }
    } catch (error) {
      console.log(error);
    }

    if (id === "image") {
      if (event.target.files.length > 0) {
        copyUser[id] = event.target.files[0].name;
      } else {
        setUrlImg('')
        copyUser[id] = "";
      }
    } else {
      copyUser[id] = event.target.value;
    }
    setUser({
      ...copyUser,
    });
  };

  const notifyWarning = (text) => {
    toast.warning(text, styleToast);
  };
  const notifySuccess = (text) => {
    toast.success(text, styleToast);
  };
  const notifyError = (text) => {
    toast.error(text, styleToast);
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

  const arrRole = [
    {
      id: 1,
      title: "Quản lý",
    },
    {
      id: 2,
      title: "Nhân viên",
    },
    {
      id: 3,
      title: "Khách hàng",
    },
  ];

  const status = [
    {
      id: 1,
      title: "Hoạt động",
    },
    {
      id: 0,
      title: "Không hoạt động",
    },
  ];

  const updateUser = async () => {
    try {
      let validForm = true;
      let ch0 = { ...check };
      if (
        user.fullName?.trim().length <= 0 &&
        user.password?.trim().length <= 0 &&
        user.email?.trim().length <= 0 &&
        user.telephone?.trim().length <= 0 &&
        user.address?.trim().length <= 0
      ) {
        ch0["fullName"] = "Name not null";
        ch0["password"] = "Password not null";
        ch0["email"] = "Email not null";
        ch0["telephone"] = "Telephone not null";
        ch0["address"] = "Address not null";
        setCheck({ ...ch0 });
        return;
      }
      if (user.fullName.trim().length <= 0) {
        ch0["name"] = "Name not null";
        setCheck({ ...ch0 });
        validForm = false;
      }
      if (user.password.trim().length <= 0) {
        ch0["password"] = "Password not null";
        setCheck({ ...ch0 });
        validForm = false;
      }
      if (user.email.trim().length <= 0) {
        ch0["email"] = "Email not null";
        setCheck({ ...ch0 });
        validForm = false;
      }
      if (user.telephone.trim().length <= 0) {
        ch0["telephone"] = "Telephone not null";
        setCheck({ ...ch0 });
        validForm = false;
      }
      if (user.address.trim().length <= 0) {
        ch0["address"] = "Address not null";
        setCheck({ ...ch0 });
        validForm = false;
      }

      if (validForm) {

        const res = await axios.put(
          `http://localhost:8080/admin/user/put/${user.id}`,
          user
        );
        let data = res && res.data ? res.data : [];
        data.created = moment(data.created).format("DD/MM/YYYY HH:mm:ss");
        data.modified = moment(data.modified).format("DD/MM/YYYY HH:mm:ss");
        toggle();
        updateData(data, "update");
        notifySuccess("Cập nhật thành công");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggle = () => {
    toggleModal();
    setUser({});
  };

  return (
    <div>
      <ToastContainer />
      <Modal isOpen={isUpdateModal} toggle={() => toggle()} size="lg" centered>
        <ModalHeader toggle={() => toggle()}>Cập nhật</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Họ tên</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder=""
                    type="text"
                    value={user.fullName}
                    onChange={(event) => handleOnchangeInput(event, "fullName")}
                  />
                  {check.fullName && check.fullName.length > 0 && (
                    <p className="checkError1">{check.fullName}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder=""
                    type="email"
                    value={user.email}
                    onChange={(event) => handleOnchangeInput(event, "email")}
                  />
                  {check.email && check.email.length > 0 && (
                    <p className="checkError1">{check.email}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="telephone">Số điện thoại</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    placeholder=""
                    type="text"
                    value={user.telephone}
                    onChange={(event) =>
                      handleOnchangeInput(event, "telephone")
                    }
                  />
                  {check.telephone && check.telephone.length > 0 && (
                    <p className="checkError1">{check.telephone}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="image">Hình ảnh</Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder=""
                    type="file"
                    // value={user.image}
                    onChange={(event) => {
                      handleOnchangeInput(event, "image");
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder=""
                        type="text"
                        value={user.address}
                        onChange={(event) =>
                          handleOnchangeInput(event, "address")
                        }
                      />
                      {check.address && check.address.length > 0 && (
                        <p className="checkError1">{check.address}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="roleId">Vai trò</Label>
                      <Input
                        id="roleId"
                        name="roleId"
                        placeholder=""
                        type="select"
                        value={user.roleId}
                        onChange={(event) =>
                          handleOnchangeInput(event, "roleId")
                        }
                      >
                        {arrRole.map((item) => {
                          if (user.roleId === item.id) {
                            return (
                              <option selected value={item.id}>
                                {item.title}
                              </option>
                            );
                          }
                          return <option value={item.id}>{item.title}</option>;
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="Status">Trạng thái</Label>
                      <select
                        className="form-control"
                        id="status"
                        name="status"
                        placeholder=""
                        value={user.status}
                        onChange={(event) =>
                          handleOnchangeInput(event, "status")
                        }
                      >
                        {status.map((item) => {
                          if (user.status === item.id) {
                            return (
                              <option selected value={item.id}>
                                {item.title}
                              </option>
                            );
                          }
                          return <option value={item.id}>{item.title}</option>;
                        })}
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                {!imageUpload && (
                  <img width="100%" height="241rem" src={urlImg} />
                )}
                {imageUpload && (
                  <img
                    width="100%"
                    height="241rem"
                    src={URL.createObjectURL(imageUpload)}
                  />
                )}
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              updateUser();
              uploadFile(e);
            }}
          >
            Lưu
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateUser;
