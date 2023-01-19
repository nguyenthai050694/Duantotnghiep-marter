import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../../Firebase";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';


// class UpdateCategory extends Component {
const UpdateCategory = (props) => {
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    const token = localStorage.getItem('token');
    const { isUpdateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload, urlImg } = props;
    const [category, setCategory] = useState(props.category);

    useEffect(() => {
        setCategory(props.category)
    }, [props.category])

    const handleOnchangeInput = (event, id) => {
        let copyCategory = { ...category };
        if (id === 'image') {
            copyCategory[id] = event.target.files[0].name;
        } else {
            copyCategory[id] = event.target.value;
        }
        setCategory({
            ...copyCategory
        })
    }
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


    const updateCategory = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/api/category/update/${category.id}`, {
                namecate: category.namecate,
                created: category.created,
                creator: category.creator,
                modified: category.modified,
                modifier: category.modifier,
            }, { headers: { "Authorization": `Bearer ${token}` } })
            let data = (res && res.data) ? res.data : [];
            data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
            data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
            toggle()
            updateData(data, 'update')
            notifySuccess('Cập nhật cate thành công')
        } catch (error) {
            console.log(error.message)
        }
    }



    const toggle = () => {
        toggleModal()
        setCategory({})
    }

    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isUpdateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Cập nhật</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        Tên loại sản phẩm
                                    </Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder=""
                                        type="text"
                                        value={category.namecate}
                                        onChange={(event) => handleOnchangeInput(event, 'namecate')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => { updateCategory(); uploadFile(e) }}>
                        Lưu
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateCategory;