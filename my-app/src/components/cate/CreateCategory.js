import { React, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { storage } from "../../Firebase";

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
    Row, Col, Form
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

const Category_Rest_API_URL = 'http://localhost:8080/api/category';

// class CreateCategory extends Component {
const CreateCategory = (props) => {
    const token = localStorage.getItem('token');
    const { isCreateModal, toggleModal, updateData, uploadFile, setImageUpload, imageUpload } = props;
    // const size = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    // const [updateData, setUpdateData] = useState(props);
    const [category, setCategory] = useState({});



    const handleOnchangeInput = (event, id) => {
        const copyCategory = { ...category };
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




    const createCategory = () => {
        try {

            if (category.namecate.trim().length <= 0) {
                notifyWarning("Cần nhập thông tin!")
                return
            }

            const create = async () => {
                let res = await axios.post(Category_Rest_API_URL + '/create', {

                    namecate: category.namecate,
                    created: category.created,
                    creator: category.creator,
                    modified: category.modified,
                    modifier: category.modifier
                }, { headers: { "Authorization": `Bearer ${token}` } })
                let data = (res && res.data) ? res.data : []
                data.created = moment(data.created).format('DD/MM/YYYY HH:mm:ss');
                if (data.modified > 0) {
                    data.modified = moment(data.modified).format('DD/MM/YYYY HH:mm:ss');
                }
                updateData(data, `create`)
                toggle()
            }
            create()
            notifySuccess('Thêm mới thành công')

        } catch (error) {
            notifyWarning("Cần nhập thông tin")
            console.log(error)
        }
    }


    const toggle = () => {
        toggleModal()
        setCategory({})
        setImageUpload('')
    }


    return (
        <div>
            <ToastContainer />
            <Modal isOpen={isCreateModal} toggle={() => toggle()}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggle()}>Thêm</ModalHeader>
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
                    <Button color="primary" onClick={(e) => { createCategory(e); uploadFile(e) }}>
                        Thêm
                    </Button>
                    <Button color="secondary" onClick={() => toggle()}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default CreateCategory;