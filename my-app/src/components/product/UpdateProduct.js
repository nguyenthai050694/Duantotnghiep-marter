import { React, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useCallGetAPI from "../../customHook/CallGetApi";
import { ToastContainer, toast } from "react-toastify";
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

// class UpdateProduct extends Component {
const UpdateProduct = (props) => {
  const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
  const { isUpdateModal, toggleModal, updateData } = props;
  const [product, setProduct] = useState(props.product);
  const [check, setCheck] = useState({
    name: "",
    color: "",
    price: "",
    quantity: "",
    categoryId: ""
  });
  const { data: cates } = useCallGetAPI(
    `http://localhost:8080/api/category/get`
  );
  const [lstCate, setLstCate] = useState([]);
  const [cate, setCate] = useState("");
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const colors = [
    {
      id: 'Trắng',
      tital: 'Trắng'
    },
    {
      id: 'Đỏ',
      tital: 'Đỏ'
    },
    {
      id: 'Xanh dương',
      tital: 'Xanh dương'
    },
    {
      id: 'Cam',
      tital: 'Cam'
    },
    {
      id: 'Đen',
      tital: 'Đen'
    },
    {
      id: 'Hồng',
      tital: 'Hồng'
    },
    {
      id: 'Nâu',
      tital: 'Nâu'
    },
    {
      id: 'Tím',
      tital: 'Tím'
    },
    {
      id: 'Xanh lá',
      tital: 'Xanh lá'
    },
  ]

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  useEffect(() => {
    setLstCate(cates);
  }, [cates]);
  const handleOnchangeinput = (event, id) => {
    let gia = /^\d*(\.\d+)?$/
    let soluong = /^\d+$/;
    let chu = /[a-zA-Z]/g;
    let copyProduct = { ...product };
    copyProduct[id] = event.target.value;
    try {
      let ch0 = { ...check };
      if (id == "name") {
        if (copyProduct[id].trim().length > 0 && chu.test(event.target.value) == false) {
          ch0["name"] = "Sai định dạng";
        } else if (copyProduct[id].trim().length == 0) {
          ch0["name"] = "Tên không được để trống";
        } else {
          ch0[id] = "";
        }
        setCheck({
          ...ch0,
        });
      } else {
        if (id == "color") {

        } else if (id == "price") {
          if (copyProduct[id].trim().length > 0 && gia.test(event.target.value) == false || Number(copyProduct[id]) < 1000) {
            ch0["price"] = "Giá phải trên 1k VNĐ và phải là số";
          } else if (copyProduct[id].trim().length == 0) {
            ch0["price"] = "Giá không được để trống";
          } else {
            ch0["price"] = "";
          }
        } else if (id == "quantity") {
          if (copyProduct[id].trim().length > 0 && soluong.test(event.target.value) == false || Number(copyProduct[id]) <= 0) {
            ch0["quantity"] = "Số lượng phải là số và lớn hơn 0";
          } else if (copyProduct[id].trim().length == 0) {
            ch0["quantity"] = "Số lượng không được để trống";
          } else {
            ch0["quantity"] = "";
          }
        } else if (id == "categoryId") {
          if (copyProduct[id] == 0) {
            ch0["categoryId"] = "Danh mục không được để trống";
          } else {
            ch0["categoryId"] = "";
          }
        } else {
          ch0[id] = "";
        }
        setCheck({
          ...ch0,
        });
      }
      setProduct({
        ...copyProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async () => {
    try {
      let ch0 = { ...check };
      product.price = product.price + ''
      product.quantity = product.quantity + ''
      product.categoryId = product.categoryId + ''
      if (product.name.trim().length == 0) {
        ch0["name"] = "Tên không được để trống";
        setCheck({ ...ch0 });
      } if (product.color.trim().length == 0) {
        ch0["color"] = "Màu sắc không được để trống";
        setCheck({ ...ch0 });
      } if (product.price.trim().length == 0) {
        ch0["price"] = "Giá không được để trống";
        setCheck({ ...ch0 });
      } if (product.quantity.trim().length == 0) {
        ch0["quantity"] = "Số lượng không được để trống";
        setCheck({ ...ch0 });
      } if (product.categoryId.trim().length == 0) {
        ch0["categoryId"] = "Danh mục không được để trống";
        setCheck({ ...ch0 });
      }
      if (
        check.name.trim().length > 0 ||
        check.color.trim().length > 0 ||
        check.price.trim().length > 0 ||
        check.quantity.trim().length > 0
      ) {
        return;
      }
      const res = await axios.put(
        `http://localhost:8080/admin/product/put/${product.id}`,
        {
          categoryId: product.categoryId,
          color: product.color,
          name: product.name,
          namecate: product.namecate,
          sizes: product.sizes,
          medias: product.medias,
          description: product.description,
          code: product.code,
          price: product.price,
          quantity: product.quantity,
        },

      );
      let data = res && res.data ? res.data : [];
      data.created = moment(data.created).format("DD/MM/YYYY HH:mm:ss");
      data.modified = moment(data.modified).format("DD/MM/YYYY HH:mm:ss");
      data.image = product.image
      toggle();
      updateData(data, "", "update");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggle = () => {
    toggleModal();
    setProduct({});
  };

  const createCate = async () => {
    try {
      if (cate.trim().length == 0) {
        notifyWarning("Cần nhập tên loại sản phẩm");
        return
      }
      let res = await axios.post("http://localhost:8080/api/category/create", {
        namecate: cate,
      });
      let data = res && res.data ? res.data : {};
      let copydata = lstCate;
      if (res.data) {
        copydata.unshift(data);
        setLstCate(copydata);
        notifySuccess("Thêm mới cate thành công");
        toggleNested();
      }
    } catch (error) {
      notifyError("Thêm mới thất bại!");
      console.log(error);
    }
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
    setCate("");
  };
  const notifySuccess = (text) => {
    toast.success(text, styleToast);
  };
  const notifyWarning = (text) => {
    toast.warning(text, styleToast);
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
  return (
    <>
      <Modal isOpen={isUpdateModal} toggle={() => toggle()} size="lg" centered>
        <ModalHeader toggle={() => toggle()}>Cập nhật</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>

                  <Label for="name">Tên sản phẩm</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder=""
                    type="text"
                    value={product.name}
                    onChange={(event) => handleOnchangeinput(event, "name")}
                  />
                  {check.name && check.name.length > 0 && (
                    <p className="checkError">{check.name}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="color">Màu</Label>
                  <select
                    style={{
                      border: "1px solid",
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    id="namecate"
                    name="namecate"
                    placeholder=""
                    type="select"
                    onChange={(event) =>
                      handleOnchangeinput(event, "color")
                    }
                  >
                    {colors.map((item, index) => {
                      if (item.id == product.color) {
                        return (
                          <option key={item.id} selected value={item.id}>
                            {item.tital}
                          </option>
                        );
                      } else {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.tital}
                          </option>
                        );
                      }
                    })}
                  </select>
                  {check.color && check.color.length > 0 && (
                    <p className="checkError">{check.color}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="price">Giá</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder=""
                    type="text"
                    value={product.price}
                    onChange={(event) => handleOnchangeinput(event, "price")}
                  />
                  {check.price && check.price.length > 0 && (
                    <p className="checkError">{check.price}</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="quantity">Số Lượng</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder=""
                    type="text"
                    value={product.quantity}
                    onChange={(event) => handleOnchangeinput(event, "quantity")}
                  />
                  {check.quantity && check.quantity.length > 0 && (
                    <p className="checkError">{check.quantity}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={11}>
                    <FormGroup>
                      <Label for="namecate">Loại sản phẩm</Label>
                      <div>
                        <select
                          style={{
                            border: "1px solid",
                            width: "100%",
                            height: "37px",
                            borderRadius: "5px",
                          }}
                          id="categoryId"
                          name="categoryId"
                          placeholder=""
                          type="select"
                          //value={product.namecate}
                          onChange={(event) =>
                            handleOnchangeinput(event, "categoryId")
                          }
                        >
                          {lstCate.map((item, index) => {
                            if (item.id == product.categoryId) {
                              return (
                                <option key={item.id} value={item.id} selected>
                                  {item.namecate}
                                </option>
                              );
                            } else {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.namecate}
                                </option>
                              );
                            }
                          })}
                        </select>
                        {check.namecate && check.namecate.length > 0 && (
                          <p className="checkError">{check.namecate}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={1}>
                    <Label for="category">Thêm</Label>
                    <Button color="primary" type="button" onClick={toggleNested}>+</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="description">Mô Tả</Label>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    size="lg"
                    value={product.description}
                    onChange={(event) =>
                      handleOnchangeinput(event, "description")
                    }
                  />
                  {check.description && check.description.length > 0 && (
                    <p className="checkError">{check.description}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              updateProduct();
              handleOnchangeinput(e, "category");
              handleOnchangeinput(e, "size");
            }}
          >
            Lưu
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={nestedModal}
        toggle={toggleNested}
        onClosed={closeAll ? toggle : undefined}
        // size='lg'
        centered
      >
        <ModalHeader>Thêm danh mục</ModalHeader>
        <ModalBody>
          <Input
            id="namecate"
            placeholder="Name Category"
            name="namecate"
            onChange={(event) => setCate(event.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              //createProduct();
              createCate();
            }}
          >
            Thêm
          </Button>
          <Button color="secondary" onClick={toggleNested}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UpdateProduct;
