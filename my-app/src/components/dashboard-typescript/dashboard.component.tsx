import axios from 'axios';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import moment from 'moment';
import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { storage } from '../../Firebase';
import { STATUS_ORDER, styleToast } from '../common/const';
import OrederTemplate from './dashboard.template'

// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface OrderItem {
    id: number,
    code: String,
    address: String,
    created: String,
    nameRecipient: String,
    status: number,
    statusName: string,
    telephone: String,
}

export interface OrderDetailItem {
    id: number,
    color_Product: String,
    image: string,
    imageUrl: string,
    orderId: number,
    name_Product: String,
    quantity: number,
    sizeId: number,
    sizeName: String,
    voucherId: number,
    price: number
}

interface Count {
    count: number,
    name: string,
}

interface Revenue {
    money: number,
    percen: number,
}

export interface OrderState {
    isLoading: Boolean,
    lstOrder: OrderItem[],
    isModal: boolean,
    orderDetailItem: OrderItem,
    orderDetailList: OrderDetailItem[],
    images: any[],
    totalPrice: number,
    count: Count[],
    revenue: Revenue[],
}

export default class DashboardComponent extends React.Component {
    // create state
    state = {
        isLoading: false,
        count: [],
        revenue: [],
        lstOrder: [],
        isModal: false,
        orderDetailItem: {} as OrderItem,
        orderDetailList: [],
        images: [],
        totalPrice: 0,
    } as OrderState

    // Get token
    token = localStorage.getItem('token');
    // Config header request
    config = {
        headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        }
    }

    /**
     * componentDidMount
     * call init
     */
    componentDidMount(): void {
        this.init()
    }

    /**
     * function call api init
     */
    init = async () => {

        // Set Loadding
        this.setState({
            ...this.state,
            isLoading: true
        })

        // Call Api order/findAll
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/dashboard`, this.config
        );

        // Get list image
        // const imagesListRef = ref(storage, "images/");
        // listAll(imagesListRef).then((response) => {
        //     let images = [] as any[]
        //     response.items.forEach((item, index) => {
        //         getDownloadURL(item).then((url) => {
        //             images.push({
        //                 nameImg: item.name,
        //                 url,
        //             })

        //             if (index === response.items.length - 1) {
        //                 // Set state
        //                 this.setState({
        //                     ...this.state,
        //                     images,
        //                 })
        //             }
        //         });
        //     });
        // });

        // Set state
        this.setState({
            ...this.state,
            count: res.data.count,
            revenue: res.data.revenue,
            isLoading: false,
        })

    }

    /**
     * 
     * @returns 
     * Render Template
     */
    render() {
        return (
            <>
                <OrederTemplate self={this} />
            </>
        )
    }

    /**
     * 
     * @param id 
     * open Modal Detail Order
     */
    openModalDetail = async (id: Number) => {
        // Call Api order/find/id
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/order/find/${id}`, this.config
        ) as any;

        // Call Api order/find/id
        const resDetail = await axios.get(
            `${process.env.REACT_APP_API_KEY}/orderDetail/findByOrder_Id/${id}`, this.config
        );

        let totalPrice = 0
        const orderDetailList = resDetail.data.map((item: any) => {
            totalPrice += item.price * item.quantity
            return {
                ...item,
                imageUrl: this.getUrlImage(item.image)
            }
        })

        this.setState({
            ...this.state,
            isModal: true,
            orderDetailItem: {
                ...res.data,
                created: moment(res.data.created as any).format('DD/MM/YYYY HH:mm:ss')
            },
            orderDetailList,
            totalPrice,
        })
    }

    /**
     * close modal detail
     */
    closeModalDetail = () => {
        this.setState({
            ...this.state,
            isModal: false,
        })
    }

    getUrlImage = (image: string) => {
        const item = this.state.images.find(e => e.nameImg === image);
        return item ? item.url : ''
    }

    /**
     * 
     * @param id 
     * cancel order
     */
    handCancelOrder = (id: number) => {
        confirmAlert({
            title: '',
            message: 'Bạn có chắc chán muốn hủy đơn hàng?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        let res = await axios.get(
                            `${process.env.REACT_APP_API_KEY}/order/cancel/${id}`, this.config
                        );
                        if (res.status === 200) {
                            toast.success("Hủy đơn hàng thành công", styleToast);
                            this.init()
                        } else {
                            toast.error("Hủy đơn hàng thất bại", styleToast);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                },
            ]
        });

    }

    /**
     * 
     * @param id 
     * Delivered order
     */
    handDeliveredOrder = (id: number) => {
        confirmAlert({
            title: '',
            message: 'Xác nhận đã giao hàng thành công!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        let res = await axios.get(
                            `${process.env.REACT_APP_API_KEY}/order/delivered/${id}`, this.config
                        );
                        if (res.status === 200) {
                            toast.success("Xác nhận thành công", styleToast);
                            this.init()
                        } else {
                            toast.error("Xác nhận thất bại", styleToast);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                },
            ]
        });

    }
}