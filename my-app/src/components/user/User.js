import { React, useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import UserDetails from './UserDetails';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import useCallGetAPI from '../../customHook/CallGetApi';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
  Row, Col, Form, PaginationLink, PaginationItem
} from 'reactstrap';
import {
  Table
} from 'reactstrap';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import PaginatedItems from "../../customHook/PaginatedItems";

// class User extends React.Component {
const User = () => {
  const token = localStorage.getItem('token');
  const { data: dataPro, isLoading } = useCallGetAPI(`http://localhost:8080/admin/user/get`);
  const [user, setUser] = useState({});
  const [dataUser, setData] = useState([]);
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setisUpdateModal] = useState(false)
  const [nestedModal, setNestedModal] = useState(false);
  const [isDetailsModal, setisdetailsModal] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  let [urlImg, setUrlImg] = useState();
  const imagesListRef = ref(storage, "images/");
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState()
  const [pageNumber, setPageNumber] = useState()
  const [totalPage, setTotalPage] = useState([])

  useEffect(() => {
    if (dataPro && dataPro.length > 0) {
      setData(dataPro)
    }

    if (dataPro.content) {
      setData(dataPro.content)
      setPageNumber(dataPro.number)
      for (let i = 1; i <= dataPro.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])

      }
    }
  }, [dataPro])

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


  const notifyWarning = (text) => {
    toast.warning(text, styleToast);
  };
  const notifySuccess = (text) => {
    toast.success(text, styleToast)
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
  }


  const uploadFile = () => {
    if (imageUpload == null) return;
    let check = true;
    imageUrls.map(item => {
      if (imageUpload.name === item.nameImg)
        return check = false
    })
    if (check === true) {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        let nameImg = imageUpload.name
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, { nameImg, url }]);
        });
      });
    }

  };
  const updateTotalPage = async () => {
    const res = await axios.get(`http://localhost:8080/admin/user/get`)
    let data = res ? res.data : []
    if (data.totalPages > totalPage.length) {
      for (let i = 1; i <= dataPro.totalPages; i++) {
        setTotalPage((prev) => [...prev, i])
      }
    }
  }


  const updateData = (res, type) => {
    if (type === 'create') {
      let copydata = dataUser;
      copydata.unshift(res);
      setData(copydata);
      updateTotalPage();
    }
    else if (type === 'update') {
      let copydata = dataUser;
      let getIndex = copydata.findIndex((p) => { return p.id === res.id });
      copydata.fill(res, getIndex, getIndex + 1);
      setData(copydata)
    }
  }


  const createModal = () => {
    setIsCreateModal(!isCreateModal)
  }

  const updateModal = () => {
    setisUpdateModal(!isUpdateModal)
  }

  const detailsModal = () => {
    setisdetailsModal(!isDetailsModal)
  }

  const toggleNested = (id) => {
    setNestedModal(!nestedModal);
    id && setUserId(id)
  };


  const editUser = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/user/find/${id}`)
      setUser(res.data)
      console.log(res.data.image)
      if (res.data.image?.length > 0) {
        imageUrls.map((img) => {
          if (img.nameImg === res.data.image) {
            return setUrlImg(img.url)
          }
        })
      } else {
        setUrlImg("")
      }


    } catch (error) {
      console.log(error.message)
    }
  }

  const pageable = async (id) => {
    if (id <= 0) {
      id = 0
    } else if (id >= totalPage.length - 1) {
      id = totalPage.length - 1
    }
    const res = await axios.get(`http://localhost:8080/admin/user/get?page=${id}`,
      { headers: { "Authorization": `Bearer ${token}` } })
    let data = res ? res.data : []
    setData(data.content)
    setPageNumber(data.number)
    console.log(data.number);
  }

  const deleteUser = async (id) => {

    try {
      const res = await axios.put(`http://localhost:8080/admin/user/setStatusFalse/${id}`)
      let copyList = dataUser;
      copyList = copyList.filter(item => item.id !== id)
      setData(copyList)
      toggleNested()
      notifySuccess("Success Delete ")
    } catch (error) {

    }

  }


  // const onBack = () => {
  //   setPage(page - 1 > -1 ? page - 1 : page);
  // };

  // const onNext = () => {
  //   setPage(page + 7 < dataUser.length / 7 ? page + 7 : page);
  // };


  // const onBack = () => {
  //   setPage(page - 1 > -1 ? page - 1 : page);
  // };

  // const onNext = () => {
  //   setPage(page + 1 < dataUser.length / 7 ? page + 1 : page);
  // };



  return (
    <>
      <UserDetails
        isDetailsModal={isDetailsModal}
        toggleModal={detailsModal}
        updateData={updateData}
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
        urlImg={urlImg}
        user={user}
      />
      <CreateUser
        isCreateModal={isCreateModal}
        toggleModal={createModal}
        updateData={updateData}
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
      />
      <UpdateUser
        isUpdateModal={isUpdateModal}
        toggleModal={updateModal}
        updateData={updateData}
        uploadFile={uploadFile}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
        setUrlImg={setUrlImg}
        urlImg={urlImg}
        user={user}
      />
      <div>

        <Table bordered >
          <thead style={{ verticalAlign: 'middle' }}>
            <tr>
              <th colSpan='10'><h3>Tài khoản</h3></th>
            </tr>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              {/* <th>Trạng thái</th> */}
              <th>Hình ảnh</th>
              <th colspan="1">Action</th>
              <th colspan="1">
                <button class="btn btn-primary create" id="create" onClick={() => createModal()}>Thêm</button>
              </th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: 'middle' }}>
            {!isLoading && dataUser && dataUser.length > 0 &&
              Object.values(
                dataUser.slice(7 * page, 7 * page + 7)
              ).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row" id="">
                      {pageNumber * 7 + index + 1}
                    </th>
                    <td id="category" onClick={() => { editUser(item.id); detailsModal() }}>{item.fullName}</td>
                    {/* <td id="category">{item.password}</td> */}
                    <td id="price">{item.email}</td>
                    <td id="quantity">{item.telephone}</td>
                    <td id="category">{item.address}</td>
                    {/* <td id="created">{item.created}</td> */}
                    {/* <td id="created">{item.modified}</td> */}
                    <td id="modified">{item.nameRole}</td>
                    {/* <td id="status">{Number(item.status) ? "Hoạt động" : "Không hoạt động"}</td> */}
                    <td id="image" >
                      {imageUrls.map((img) => {
                        return (
                          <>
                            {img.nameImg === item.image &&
                              <img width="70" height="65" src={img.url} />
                            }
                            {img.nameImg !== item.image &&
                              <image src='' />
                            }
                          </>
                        )
                      })}
                    </td>
                    {/* 
                      <img src={imageUrls} width="150" height="170" />
                    </td> */}
                    <td>
                      <button class="btn btn-primary update" type='buttom' id="update" onClick={() => { editUser(item.id); updateModal() }}>Cập nhật</button>
                    </td>
                    <td>
                      <button class="btn btn-danger delete" id="delete" onClick={() => toggleNested(item.id)} >Chuyển trạng thái</button>
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
              <ModalHeader>Delete</ModalHeader>
              <ModalBody>
                Bạn có chắc chắn chuyển sang không hoạt động không ?
              </ModalBody>
              <ModalFooter>
                <Button type='button' color="primary" onClick={() => { deleteUser(userId) }}>
                  Có
                </Button>{' '}
                <Button color="secondary" onClick={() => toggleNested()}>
                  Thoát
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
        {/* <Pagination>
          <PaginationItem>
            <PaginationLink
              first
              onClick={() => pageable(0)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => pageable(pageNumber - 1)}
              previous
            />
          </PaginationItem>
          {totalPage.map(item => {
            return (
              <PaginationItem>
                <PaginationLink onClick={() => pageable(item - 1)}>
                  {item}
                  {console.log(item)}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationLink
              onClick={() => pageable(pageNumber + 1)}
              next
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => pageable(totalPage.length - 1)}
              last
            />
          </PaginationItem>
        </Pagination> */}
      </div>
      <PaginatedItems itemsPerPage={totalPage.length}
        pageable={pageable} />
    </>
  )

}

export default User;




