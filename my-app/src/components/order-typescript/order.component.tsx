import axios from 'axios';
import moment from 'moment';
import React from 'react'
import OrederTemplate from './order.template'

// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface OrderItem {
    id: Number,
    code: String,
    address: String,
    created: String,
    nameRecipient: String,
    status: Number,
    telephone: String,
}

export default class OrderComponent extends React.Component {
    // create state
    state = {
        isLoading: false,
        lstOrder: [] as OrderItem[]
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
        // Get token
        const token = localStorage.getItem('token');

        // Config header request
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }

        // Set Loadding
        this.setState({
            ...this.state,
            isLoading: true
        })

        // Call Api order/findAll
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/order/findAll`, config
        );

        // Map lstOrder
        const lstOrder = res.data && res.data.map((item: OrderItem) => {
            return {
                ...item,
                created: moment(item.created as any).format('DD/MM/YYYY HH:mm:ss')
            }
        })

        // Set lstOrder
        this.setState({
            ...this.state,
            lstOrder: lstOrder,
            isLoading: false
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
}