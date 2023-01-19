import { React, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useCallGetAPI from "../../customHook/CallGetApi";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Row,
  Col,
  Form,
  Input,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product_Rest_API_URL = "http://localhost:8080/admin/product";

const CreateProduct = (props) => {
  const {
    isCreateModal,
    toggleModal,
    updateData,
    handleImages,
    handleUpdateImages,
    imageFiles,
    setImageFiles,
  } = props;
  const [check, setCheck] = useState({});
  const sizeCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const size = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  const [lstsizeSelect, setLstSizeSelect] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    color: "Trắng",
    price: "",
    quantity: "",
    categoryId: "",
    sizes: "",
    medias: "",
    status: 1
  });
  const [lstSize, setLstSize] = useState([]);
  let [sizeSelect, setSizeSelect] = useState(0);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const { data: cates } = useCallGetAPI(
    `http://localhost:8080/api/category/get`
  );
  const [lstCate, setLstCate] = useState([]);
  const [cate, setCate] = useState("");

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

  const handleOnchangeinput = (event, id) => {
    let soluong = /^\d+$/;
    let gia = /^\d*(\.\d+)?$/
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
        } else if (id == "sizes") {
          if (copyProduct[id] == 0) {
            ch0["sizes"] = "Số lượng kích cỡ không được để trống";
          } else {
            ch0["sizes"] = "";
          }
        } else if (id == "medias") {
          if (event.target.files.length == 0) {
            ch0["medias"] = "Cần chọn ảnh";
          } else if (event.target.files.length > 5) {
            ch0["medias"] = "Không chọn quá 5 ảnh";
          } else {
            ch0["medias"] = "";
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

  useEffect(() => {
    setLstCate(cates);
  }, [cates]);

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

  const createProduct = (data) => {
    try {
      let ch0 = { ...check };
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
      } if (imageFiles.length == 0) {
        ch0["medias"] = "Cần chọn ảnh";
        setCheck({ ...ch0 });
      } if (sizeSelect == 0) {
        ch0["sizes"] = "Cần chọn số lượng cỡ giày";
        setCheck({ ...ch0 });
      }
      if (
        check.name.trim().length > 0 ||
        check.color.trim().length > 0 ||
        check.price.trim().length > 0 ||
        check.quantity.trim().length > 0 ||
        check.sizes.trim().length > 0 ||
        check.medias.trim().length > 0
      ) {
        return;
      }
      const nums = [
        data.size1,
        data.size2,
        data.size3,
        data.size4,
        data.size5,
        data.size6,
        data.size7,
        data.size8,
        data.size9,
        data.size10,
        data.size11,
      ];
      const quantt = [
        data.quantity1,
        data.quantity2,
        data.quantity3,
        data.quantity4,
        data.quantity5,
        data.quantity6,
        data.quantity7,
        data.quantity8,
        data.quantity9,
        data.quantity10,
        data.quantity11,
      ];
      const newQuantt = quantt.slice(0, sizeSelect);
      const newNums = nums.slice(0, sizeSelect);
      const hasDuplicate = newNums.some(
        (x) => newNums.indexOf(x) !== newNums.lastIndexOf(x)
      );
      let totalQuantitySize = 0;
      for (let i = 0; i < newQuantt.length; i++) {
        totalQuantitySize += Number(newQuantt[i])
        if (isNaN(newQuantt[i])) {
          notifyWarning("Số lượng size phải là số");
          return;
        }
      }
      if (hasDuplicate) {
        notifyWarning("Size bị trùng, vui lòng chọn lại!");
        return;
      } else if (totalQuantitySize > product.quantity) {
        notifyWarning("Số lượng Size lớn hơn số lượng sản phẩm");
        return;
      } else {
        const createPro = async () => {
          let res = await axios.post(Product_Rest_API_URL + "/post", product);
          let datares = res && res.data ? res.data : [];
          datares.created = moment(datares.created).format(
            "DD/MM/YYYY HH:mm:ss"
          );
          if (datares.modified > 0) {
            datares.modified = moment(datares.modified).format(
              "DD/MM/YYYY HH:mm:ss"
            );
          }
          let image = [
            {
              productId: res.data.id,
              url: imageFiles[0]?.name,
              type: "image",
            },
            {
              productId: res.data.id,
              url: imageFiles[1]?.name,
              type: "image",
            },
            {
              productId: res.data.id,
              url: imageFiles[2]?.name,
              type: "image",
            },
            {
              productId: res.data.id,
              url: imageFiles[3]?.name,
              type: "image",
            },
            {
              productId: res.data.id,
              url: imageFiles[4]?.name,
              type: "image",
            },
          ].slice(0, imageFiles.length);
          let datasize = [
            {
              productId: res.data.id,
              size: data.size1,
              quantity: data.quantity1,
            },
            {
              productId: res.data.id,
              size: data.size2,
              quantity: data.quantity2,
            },
            {
              productId: res.data.id,
              size: data.size3,
              quantity: data.quantity3,
            },
            {
              productId: res.data.id,
              size: data.size4,
              quantity: data.quantity4,
            },
            {
              productId: res.data.id,
              size: data.size5,
              quantity: data.quantity5,
            },
            {
              productId: res.data.id,
              size: data.size6,
              quantity: data.quantity6,
            },
            {
              productId: res.data.id,
              size: data.size7,
              quantity: data.quantity7,
            },
            {
              productId: res.data.id,
              size: data.size8,
              quantity: data.quantity8,
            },
            {
              productId: res.data.id,
              size: data.size9,
              quantity: data.quantity9,
            },
            {
              productId: res.data.id,
              size: data.size10,
              quantity: data.quantity10,
            },
            {
              productId: res.data.id,
              size: data.size11,
              quantity: data.quantity11,
            },
          ].slice(0, sizeSelect);
          let resImg = await axios.post(
            `http://localhost:8080/api/media/create`,
            image
          );
          await axios.post(`http://localhost:8080/api/size/postList`, datasize);
          updateData(datares, resImg.data[0].url, `create`);
          setSizeSelect();
          toggle();
          notifySuccess("Thêm thành công");
        };
        createPro();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
    setCate("");
  };

  const toggle = () => {
    toggleModal();
    setProduct({
      name: "",
      color: "Trắng",
      price: "",
      quantity: "",
      categoryId: "",
      sizes: "",
      medias: "",
      status: 1
    });
    setCheck({
      name: "",
      color: "",
      price: "",
      quantity: "",
      categoryId: "",
      sizes: "",
      medias: ""
    })
    setLstSizeSelect([]);
    setImageFiles([]);
  };

  const { register, handleSubmit } = useForm();

  const { ref } = register;

  const checkSize = (e) => {
    let Select = e.target.value;
    setSizeSelect(Select);
    setLstSizeSelect([]);
    for (let i = 1; i <= Select; i++) {
      setLstSizeSelect((prev) => [...prev, i]);
    }
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
        notifySuccess("Thêm mới thành công");
        toggleNested();
      }
    } catch (error) {
      notifyError("Thêm mới thất bại!");
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal isOpen={isCreateModal} toggle={() => toggle()} size="xl" centered>
        <Form onSubmit={handleSubmit(createProduct)} innerRef={ref}>
          <ModalHeader toggle={() => toggle()}>Thêm</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={7}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Tên</Label>
                      <div>
                        <input
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                          id="name"
                          name="name"
                          placeholder=""
                          type="text"
                          value={product.name}
                          onChange={(event) =>
                            handleOnchangeinput(event, "name")
                          }
                        />
                        {check.name && check.name.length > 0 && (
                          <p className="checkError">{check.name}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="color">Màu</Label>
                      <div>
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
                            return (
                              <option key={item.id} value={item.id}>
                                {item.tital}
                              </option>
                            );
                          })}
                        </select>
                        {check.color && check.color.length > 0 && (
                          <p className="checkError">{check.color}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="price">Giá</Label>
                      <div>
                        <input
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                          id="price"
                          name="price"
                          placeholder=""
                          type="text"
                          value={product.price}
                          onChange={(event) =>
                            handleOnchangeinput(event, "price")
                          }
                        />
                        {check.price && check.price.length > 0 && (
                          <p className="checkError">{check.price}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="quantity">Số lượng</Label>
                      <div>
                        <input
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                          id="quantity"
                          name="quantity"
                          placeholder=""
                          type="text"
                          value={product.quantity}
                          onChange={(event) =>
                            handleOnchangeinput(event, "quantity")
                          }
                        />
                        {check.quantity && check.quantity.length > 0 && (
                          <p className="checkError">{check.quantity}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Row>
                      <Col md={10}>
                        <FormGroup>
                          <Label for="namecate">Danh mục</Label>
                          <div>
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
                                handleOnchangeinput(event, "categoryId")
                              }
                            >
                              <option value="" disabled selected>
                                Chọn loại sản phẩm
                              </option>
                              {lstCate.map((item, index) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.namecate}
                                  </option>
                                );
                              })}
                            </select>
                            {check.categoryId &&
                              check.categoryId.length > 0 && (
                                <p className="checkError">{check.categoryId}</p>
                              )}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col
                        md={2}
                        style={{
                          padding: "0px 12px 0px 0px",
                          marginLeft: "0%",
                        }}
                      >
                        <Label for="category">Thêm</Label>
                        <button
                          type="button"
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "15px",
                          }}
                          onClick={toggleNested}
                        >
                          +
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="sizes">Số lượng size</Label>
                          <div>
                            <select
                              style={{
                                border: "1px solid",
                                width: "100%",
                                borderRadius: "5px",
                              }}
                              id="sizes"
                              name="sizes"
                              placeholder=""
                              type="select"
                              onChange={(event) => {
                                handleOnchangeinput(event, "sizes");
                                checkSize(event);
                              }}
                            >
                              <option value="" disabled selected>Chọn size</option>
                              {sizeCheck.map((item, index) => {
                                return <option value={item}>{item}</option>;
                              })}
                            </select>
                            {check.sizes && check.sizes.length > 0 && (
                              <p className="checkError">{check.sizes}</p>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="description">Mô tả</Label>
                      <div>
                        <textarea
                          style={{
                            border: "1px solid",
                            width: "100%",
                            borderRadius: "5px",
                            height: "100px",
                          }}
                          id="description"
                          name="description"
                          onChange={(event) => {
                            handleOnchangeinput(event);
                          }}
                        />
                        {check.description && check.description.length > 0 && (
                          <p className="checkError">{check.description}</p>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                {lstsizeSelect.length >= 1 && (
                  <Row>
                    {lstsizeSelect.map((item) => {
                      return (
                        <Col md={6}>
                          <Row>
                            <Col md={4}>
                              <FormGroup>
                                <Label for="description">Kích Cỡ</Label>
                                <div>
                                  <select
                                    style={{
                                      border: "1px solid",
                                      width: "100%",
                                      borderRadius: "5px",
                                    }}
                                    id="size"
                                    name="size"
                                    placeholder=""
                                    type="select"
                                    {...register(`size${item}`)}
                                  >
                                    {size.map((size) => {
                                      return (
                                        <option value={size}>{size}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md={8}>
                              <FormGroup>
                                <Label for="description">Số Lượng</Label>
                                <div>
                                  <input
                                    style={{
                                      border: "1px solid",
                                      width: "100%",
                                      borderRadius: "5px",
                                    }}
                                    {...register(`quantity${item}`)}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </Col>
              <Col md={5}>
                <Row>
                  <Col md={12}>
                    <Label>Ảnh</Label>
                    <div>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => { handleImages(e, 'medias'); handleOnchangeinput(e, 'medias') }}
                        style={{
                          border: "1px solid",
                          width: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                    {check.medias &&
                      check.medias.length > 0 && (
                        <p className="checkError">{check.medias}</p>
                      )}
                  </Col>
                  <Col md={12} style={{ marginTop: "1%" }}>
                    {imageFiles.length > 0 &&
                      imageFiles &&
                      imageFiles.map((item, index) => {
                        return (
                          <>
                            {imageFiles.length === 1 && (
                              <img
                                src={URL.createObjectURL(item)}
                                width="100%"
                                height="285rem"
                                style={{
                                  borderRadius: "15px",
                                  border: "1px solid",
                                }}
                              />
                            )}
                            {imageFiles.length === 2 && (
                              <div style={{ padding: "0 20% 0 20%" }}>
                                <img
                                  src={URL.createObjectURL(item)}
                                  width="100%"
                                  height="142rem"
                                  style={{
                                    borderRadius: "15px",
                                    border: "1px solid",
                                    marginBottom: "5px",
                                  }}
                                />
                              </div>
                            )}
                            {imageFiles.length === 3 && (
                              <>
                                {index === 0 && (
                                  <div style={{ padding: "0 20% 0 20%" }}>
                                    <img
                                      src={URL.createObjectURL(item)}
                                      width="100%"
                                      height="142rem"
                                      style={{
                                        borderRadius: "15px",
                                        border: "1px solid",
                                        marginBottom: "5px",
                                      }}
                                    />
                                  </div>
                                )}
                                {index > 0 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="48.883%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginRight: "5px",
                                    }}
                                  />
                                )}
                              </>
                            )}
                            {imageFiles.length === 4 && (
                              <>
                                {index === 0 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginBottom: "5px",
                                      marginRight: "5px",
                                    }}
                                  />
                                )}
                                {index === 1 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginBottom: "5px",
                                    }}
                                  />
                                )}

                                {index === 2 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginRight: "5px",
                                    }}
                                  />
                                )}
                                {index === 3 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                    }}
                                  />
                                )}
                              </>
                            )}
                            {imageFiles.length === 5 && (
                              <>
                                {index === 0 && (
                                  <div style={{ padding: "0 20% 0 20%" }}>
                                    <img
                                      src={URL.createObjectURL(item)}
                                      width="100%"
                                      height="142rem"
                                      style={{
                                        borderRadius: "15px",
                                        border: "1px solid",
                                        marginBottom: "5px",
                                      }}
                                    />
                                  </div>
                                )}
                                {index === 1 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginBottom: "5px",
                                      marginRight: "5px",
                                    }}
                                  />
                                )}
                                {index === 2 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginBottom: "5px",
                                    }}
                                  />
                                )}

                                {index === 3 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                      marginRight: "5px",
                                    }}
                                  />
                                )}
                                {index === 4 && (
                                  <img
                                    src={URL.createObjectURL(item)}
                                    width="49%"
                                    height="142rem"
                                    style={{
                                      borderRadius: "15px",
                                      border: "1px solid",
                                    }}
                                  />
                                )}
                              </>
                            )}
                          </>
                        );
                      })}
                    {imageFiles.length <= 0 && (
                      <img
                        width="100%"
                        height="285rem"
                        style={{ borderRadius: "15px", border: "1px solid" }}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              onClick={() => {
                createProduct();
              }}
            >
              Thêm Mới
            </Button>
            <Button color="secondary" onClick={() => toggle()}>
              Hủy
            </Button>
          </ModalFooter>
        </Form>
        <Modal
          isOpen={nestedModal}
          toggle={toggleNested}
          onClosed={closeAll ? toggle : undefined}
          // size='lg'
          centered
        >
          <ModalHeader>Thêm loại sản phẩm</ModalHeader>
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
      </Modal>
    </>
  );
};

export default CreateProduct;
