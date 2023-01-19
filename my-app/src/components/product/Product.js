import { React, useState, useEffect } from "react";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import { Pagination } from 'react-bootstrap';
import useCallGetAPI from "../../customHook/CallGetApi";
import PaginatedItems from "../../customHook/PaginatedItems";
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
  PaginationLink,
  PaginationItem
} from "reactstrap";
import ProductDetails from "./ProductDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import { Table } from "reactstrap";
import { async } from "@firebase/util";

// class Product extends React.Component {
const Product = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
  const [nestedModal, setNestedModal] = useState(false);
  const [proId, setProId] = useState();
  const [product, setProduct] = useState({});
  const [dataProduct, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isUpdateModal, setisUpdateModal] = useState(false);
  const [isDetailsModal, setisdetailsModal] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  let [urlImgs, setUrlImgs] = useState();
  const [imageFiles, setImageFiles] = useState([]);
  const [pageNumber, setPageNumber] = useState()
  const [totalPage, setTotalPage] = useState([])
  const [keyword, setKeyword] = useState()
  const imagesListRef = ref(storage, "images/");
  const [checkPage, setCheckPage] = useState(true)



  const toggleNested = (id) => {
    setNestedModal(!nestedModal);
    id && setProId(id);
  };

  const handleInputSearch = async (e) => {
    if (e.target.value == 0) {
      const res = await axios.get(`http://localhost:8080/admin/product/select`,
        { headers: { "Authorization": `Bearer ${token}` } })
      let data = res ? res.data : []
      setTotalPage([])
      for (let i = 1; i <= data.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])
      }
      setCheckPage(!checkPage)
      console.log(checkPage);
      setData(data.content)
      setPageNumber(data.number)
      setKeyword(e.target.value)
    } else {
      setKeyword(e.target.value)
    }
  }

  const searchButton = async () => {
    if (keyword == '') {
      return
    }
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
    let res = await axios.post(
      `http://localhost:8080/admin/product/search?keyword=${keyword}`,
      config
    );
    let data = res ? res.data : []
    setTotalPage([])
    for (let i = 1; i <= data.totalPages; i++) {
      setTotalPage((prev) => [...prev, i])
    }
    setCheckPage(!checkPage)
    setData(data.content)
    setPageNumber(data.number)
  }

  const pageable = async (id) => {
    if (id <= 0) {
      id = 0
    } else if (id >= totalPage.length - 1) {
      id = totalPage.length - 1
    }
    const res = await axios.get(`http://localhost:8080/admin/product/select?page=${id}`,
      { headers: { "Authorization": `Bearer ${token}` } })
    let data = res ? res.data : []
    setData(data.content)
    setPageNumber(data.number)
  }

  const updateTotalPage = async () => {
    const res = await axios.get(`http://localhost:8080/admin/product/select`, { headers: { "Authorization": `Bearer ${token}` } })
    let data = res ? res.data : []
    if (data.totalPages > totalPage.length) {
      for (let i = 1; i <= dataPro.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])
      }
    }
  }

  const updateData = (res, resImg, type) => {
    if (type === "create") {
      let copydata = dataProduct;
      res["image"] = resImg;
      copydata.unshift(res);
      setData(copydata);
      updateTotalPage()
    } else if (type === "update") {
      let copydata = dataProduct;
      let getIndex = copydata.findIndex((p) => {
        return p.id == res.id;
      });
      copydata.fill(res, getIndex, getIndex + 1);
      setData(copydata);
    }
  };

  const { data: dataPro, isLoading } = useCallGetAPI(
    `http://localhost:8080/admin/product/select`
  );
  useEffect(() => {
    setImageUrls([])
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        let nameImg = item.name;
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, { nameImg, url }]);
        });
      });
    });
  }, [])

  useEffect(() => {
    if (dataPro && dataPro.length > 0) {
      setData(dataPro);
    }

    if (dataPro.content) {
      setData(dataPro.content)
      setPageNumber(dataPro.number)
      for (let i = 1; i <= dataPro.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])

      }
    }
    // setData(dataPro)
    // console.log(isLoading);
  }, [dataPro]);

  const createModal = () => {
    setIsCreateModal(!isCreateModal);
  };

  const updateModal = () => {
    setisUpdateModal(!isUpdateModal);
  };

  const detailsModal = () => {
    setisdetailsModal(!isDetailsModal);
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

  const editProduct = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/product/find/${id}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    // e.preventDefault();
    try {
      await axios.get(
        `http://localhost:8080/admin/product/updateStatusFalse/${id}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      let copyList = dataProduct;
      copyList = copyList.filter((item) => item.id !== id);
      setData(copyList);
      toggleNested();
      toast.success("Xóa thành công", styleToast);

      // updateData(res.data)
    } catch (error) {
      console.log(error.message);
    }
  };

  // handleClickButtom = (event) => {
  //   event.preventDefault();
  //   setState({
  //     show: !state.show
  //   })
  // }

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 1 < dataProduct.length / 7 ? page + 1 : page);
  };

  //Listen for file selection
  const handleImages = (e) => {
    setImageFiles([]);
    //Get files
    if (e.target.files.length > 5) {
      return toast.warning("Không chọn quá 5 ảnh", styleToast);
    }
    for (let i = 0; i < e.target.files.length; i++) {
      let imageFile = e.target.files[i];
      setImageFiles((prev) => [...prev, imageFile]);
    }
  };
  const handleUpdateImages = () => {
    imageFiles.map((item) => {
      uploadImageAsPromise(item);
    });
  };

  //Handle waiting to upload each file using promise
  const uploadImageAsPromise = (imageFile) => {
    // return new Promise(function () {

    const imageRef = ref(storage, `images/${imageFile.name}`);
    //Upload file

    uploadBytes(imageRef, imageFile).then((snapshot) => {
      let nameImg = imageFile.name;
      getDownloadURL(snapshot.ref).then((url) => {
        let copy = [...imageUrls, { nameImg, url }];
        const key = "nameImg";
        const arrayUniqueByKey = [
          ...new Map(copy.map((item) => [item[key], item])).values(),
        ];
        setImageUrls(arrayUniqueByKey);
      });
    });


    // var task = storageRef.put(imageFile);
    //Update progress bar
    // task.on('state_changed',
    //     progress = (snapshot) => {
    //         var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    //         uploader.value = percentage;
    //     },
    //     error = (err) => {
    //       console.log(err);
    //     },
    //     complete = () =>{
    //         var downloadURL = task.snapshot.downloadURL;

    //     }
    // );
    // });
  };

  return (
    <>
      <ProductDetails
        isDetailsModal={isDetailsModal}
        toggleModal={detailsModal}
        updateData={updateData}
        handleImages={handleImages}
        handleUpdateImages={handleUpdateImages}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        product={product}
      />
      <CreateProduct
        isCreateModal={isCreateModal}
        toggleModal={createModal}
        updateData={updateData}
        handleImages={handleImages}
        handleUpdateImages={handleUpdateImages}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
      />
      <UpdateProduct
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
        product={product}
      />
      <div>
        <Table bordered>
          <thead style={{ verticalAlign: "middle" }}>
            <tr>
              <th colSpan='10'><h3>Sản Phẩm</h3></th>
            </tr>
            <tr>
              <th colSpan='7'></th>
              <th colSpan='3'><div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search for..."
                  aria-label="Search for..."
                  aria-describedby="btnNavbarSearch"
                  onChange={(e) => handleInputSearch(e)}
                />
                <button
                  className="btn btn-primary"
                  id="btnNavbarSearch"
                  type="button"
                  onClick={() => searchButton()}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div></th>
            </tr>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Màu</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Loại</th>
              <th>Mô tả</th>
              <th>Ảnh</th>
              <th colspan="2">
                <button
                  class="btn btn-primary create"
                  id="create"
                  onClick={() => createModal()}
                >
                  Thêm
                </button>
              </th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "middle" }}>
            {!isLoading &&
              dataProduct &&
              dataProduct.length > 0 &&
              Object.values(dataProduct.slice(7 * page, 7 * page + 7)).map(
                (item, index) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row" id="">
                        {pageNumber * 7 + index + 1}
                      </th>
                      <td
                        id="category"
                        onClick={() => {
                          editProduct(item.id);
                          detailsModal();
                        }}
                      >
                        {item.name}
                      </td>
                      <td id="category">{item.color}</td>
                      <td id="price">{item.price}</td>
                      <td id="quantity">{item.quantity}</td>
                      <td id="category">{item.name_cate}</td>
                      <td id="description">{item.description}</td>
                      <td id="image">
                        {imageUrls.map((img) => {
                          return (
                            <>
                              {img.nameImg === item.image && (
                                <img width="70" height="65" src={img.url} />
                              )}
                              {img.nameImg !== item.image && <image src="" />}
                            </>
                          );
                        })}
                      </td>
                      <td>
                        <button
                          class="btn btn-primary update"
                          type="buttom"
                          id="update"
                          onClick={() => {
                            editProduct(item.id);
                            updateModal();
                          }}
                        >
                          Cập nhật
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger delete"
                          id="delete"
                          onClick={() => toggleNested(item.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}

            <Modal
              isOpen={nestedModal}
              toggle={toggleNested}
            // size='lg'
            >
              <ModalHeader>Xóa</ModalHeader>
              <ModalBody>
                Bạn có chắc chắn xóa không?
              </ModalBody>
              <ModalFooter>
                <Button type='button' color="primary" onClick={() => { deleteProduct(proId) }}>
                  Xóa
                </Button>{' '}
                <Button color="secondary" onClick={() => toggleNested()}>
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>

            {isLoading && (
              <tr>
                <h3>Vui Lòng Đợi...</h3>
              </tr>
            )}
          </tbody>

        </Table >
      </div >
      {checkPage == true &&
        <PaginatedItems itemsPerPage={totalPage.length}
          pageable={pageable} />
      }
      {checkPage == false &&
        <PaginatedItems itemsPerPage={totalPage.length}
          pageable={pageable} />
      }
    </>
  );
};

export default Product;
