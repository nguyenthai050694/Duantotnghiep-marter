import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Col, Container } from 'reactstrap';
import '../css/styles.css';
import { Row } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import DashboardComponent from './dashboard.component';
import BoxInfo from '../common/box-info';
import '../css/dashboard.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import EmailIcon from '@mui/icons-material/Email';
import EnhancedTable from '../common/table/table';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DangerousIcon from '@mui/icons-material/Dangerous';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DashboardTemplate {
    self: DashboardComponent
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function DashboardTemplate({ self }: DashboardTemplate) {
    const { state } = self;
    const [dataChartOrder, setDataChartOrder] = useState<any>({
        labels: [],
        datasets: [
            {
                label: "Số đơn hàng",
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
                data: [],
            },
        ],
    });

    const [dataChartRevenueByDay, setDataChartRevenueByDay] = useState<any>({
        labels: [],
        datasets: [
            {
                label: "Doanh thu",
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
                data: [],
            },
        ],
    });

    const [dataChartRevenueByMonth, setDataChartRevenueByMonth] = useState<any>({
        labels: [],
        datasets: [
            {
                label: "Doanh thu",
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
                data: [],
            },
        ],
    });

    useEffect(() => {
        setDataChartOrder({
            labels: state.dataChartOrder && state.dataChartOrder.map(item => { return item.key }),
            datasets: [
                {
                    label: "Số đơn hàng",
                    backgroundColor: "#0d6efd",
                    borderColor: "#0d6efd",
                    data: state.dataChartOrder && state.dataChartOrder.map(item => {
                        return item.value
                    }),
                },
            ],
        })

        setDataChartRevenueByDay({
            labels: state.dataChartRevenueByDay && state.dataChartRevenueByDay.map(item => { return item.key }),
            datasets: [
                {
                    label: "Doanh thu",
                    backgroundColor: "#0d6efd",
                    borderColor: "#0d6efd",
                    data: state.dataChartRevenueByDay && state.dataChartRevenueByDay.map(item => {
                        return item.value
                    }),
                },
            ],
        })

        setDataChartRevenueByMonth({
            labels: state.dataChartRevenueByMonth && state.dataChartRevenueByMonth.map(item => { return item.key }),
            datasets: [
                {
                    label: "Doanh thu",
                    backgroundColor: "#0d6efd",
                    borderColor: "#0d6efd",
                    data: state.dataChartRevenueByMonth && state.dataChartRevenueByMonth.map(item => {
                        return item.value
                    }),
                },
            ],
        })
    }, [state.dataChartOrder, state.dataChartRevenueByDay, state.dataChartRevenueByMonth])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
                text: '',
            },
        },
    };

    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                display: false,
            },
            title: {
                display: true,
                text: 'Doanh thu theo ngày',
            },
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                display: false,
            },
            title: {
                display: true,
                text: 'Doanh thu theo tháng',
            },
        },
    };


    const [value, setValue] = React.useState(0);

    const headCells = [
        {
            id: 'id',
            align: 'center',
            disablePadding: true,
            label: 'Mã sản phẩm',
        },
        {
            id: 'name',
            align: 'left',
            disablePadding: false,
            label: 'Tên sản phẩm',
        },
        {
            id: 'imageUrl',
            align: 'center',
            disablePadding: false,
            label: 'Ảnh sản phẩm',
            component: (item: any) => {
                return <>
                    <img src={item.imageUrl} width="150px" height="auto" />
                </>
            }
        },
        {
            id: 'quantity',
            align: 'right',
            disablePadding: false,
            label: 'Số lượng bán',
        },
        {
            id: 'revenue',
            align: 'right',
            disablePadding: false,
            label: 'Doanh thu',
        },
    ];



    return (
        <div className='main-page dashboard'>

            <Container>
                <Row className='dashboard-row'>
                    <Col md={12} className='d-flex'>
                        <Box sx={{ width: 200 }}>
                            <Link to={'#'} >
                                <div className='box-icon'><PeopleIcon /></div>
                                <div className='box-content'>{`${state.count[0]?.name || ''}(${state.count[0]?.count || ''})`}</div>
                            </Link>
                        </Box>
                        <Box sx={{ width: 200 }}>
                            <Link to={'/admin/product'} >
                                <div className='box-icon'><StorageIcon /></div>
                                <div className='box-content'>{`${state.count[1]?.name || ''}(${state.count[1]?.count || ''})`}</div>
                            </Link>
                        </Box>

                        <Box sx={{ width: 200 }}>
                            <Link to={'/admin/order'} >
                                <div className='box-icon'><EmailIcon /></div>
                                <div className='box-content'>{`${state.count[2]?.name || ''}(${state.count[2]?.count || ''})`}</div>
                            </Link>
                        </Box>
                    </Col>
                </Row>
                <Row className='dashboard-row'>
                    <Col md={3}>
                        <BoxInfo color='green' title='Trong 1 ngày' content={`${state.revenue[0]?.money || ''} VND`} percen={state.revenue[0]?.percen || 0} />
                    </Col>
                    <Col md={3}>
                        <BoxInfo color='red' title='Trong 1 tuần' content={`${state.revenue[1]?.money || ''} VND`} percen={state.revenue[1]?.percen || 0} />
                    </Col>
                    <Col md={3}>
                        <BoxInfo color='yellow' title='Trong 1 tháng' content={`${state.revenue[2]?.money || ''} VND`} percen={state.revenue[2]?.percen || 0} />
                    </Col>
                    <Col md={3}>
                        <BoxInfo color='blue' title='Trong 1 năm' content={`${state.revenue[3]?.money || ''} VND`} percen={state.revenue[3]?.percen || 0} />
                    </Col>
                </Row>

                <Row className='dashboard-row'>
                    <Col md={12}>
                        <div className='dashboard-title'>
                            Đơn Hàng
                        </div>
                    </Col>

                    <Col md={6}>
                        <Line data={dataChartOrder} options={options} />
                    </Col>

                    <Col md={6} className='dashboadr-order'>
                        <Row>
                            <Col md={4} className='order-box br-r-2'>
                                <Link to={'/admin/order?status=1'}>
                                    <div className='order-icon'><PlaylistAddIcon /></div>
                                    <div className='order-number'>
                                        {state.countOrder[0]?.value}
                                    </div>
                                    <div className='order-title'>
                                        {state.countOrder[0]?.key}
                                    </div>
                                </Link>
                            </Col>

                            <Col md={4} className='order-box br-r-2'>
                                <Link to={'/admin/order?status=2'}>
                                    <div className='order-icon'>
                                        <LocalShippingIcon />
                                    </div>
                                    <div className='order-number'>
                                        {state.countOrder[1]?.value}
                                    </div>
                                    <div className='order-title'>
                                        {state.countOrder[1]?.key}
                                    </div>
                                </Link>
                            </Col>

                            <Col md={4} className='order-box'>
                                <Link to={'/admin/order?status=3'}>
                                    <div className='order-icon'>
                                        <CheckCircleOutlineIcon />
                                    </div>
                                    <div className='order-number'>
                                        {state.countOrder[2]?.value}
                                    </div>
                                    <div className='order-title'>
                                        {state.countOrder[2]?.key}
                                    </div>
                                </Link>
                            </Col>

                            <Col md={4} className='order-box br-t-2 br-r-2'>
                                <Link to={'/admin/order?status=0'}>
                                    <div className='order-icon'>
                                        <CancelIcon />
                                    </div>
                                    <div className='order-number'>
                                        {state.countOrder[3]?.value}
                                    </div>
                                    <div className='order-title'>
                                        {state.countOrder[3]?.key}
                                    </div>
                                </Link>
                            </Col>

                            <Col md={4} className='order-box br-t-2 br-r-2'>
                                <Link to={'/admin/order?status=11'}>
                                    <div className='order-icon'>
                                        <AutorenewIcon />
                                    </div>
                                    <div className='order-number'>
                                        {state.countOrder[4]?.value}
                                    </div>
                                    <div className='order-title'>
                                        {state.countOrder[4]?.key}
                                    </div>
                                </Link>
                            </Col>

                            <Col md={4} className='order-box br-t-2'>
                                <Link to={'/admin/order?status=12'}>
                                    <div className='order-icon'>
                                        <DangerousIcon />
                                    </div>
                                    <div className='order-number'>
                                        {state.countOrder[5]?.value}
                                    </div>
                                    <div className='order-title'>
                                        {state.countOrder[5]?.key}
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className='dashboard-row'>
                    <Col md={12}>
                        <div className='dashboard-title'>
                            Doanh thu
                        </div>
                    </Col>

                    <Col md={6}>
                        <Bar data={dataChartRevenueByDay} options={options1} />
                    </Col>

                    <Col md={6} className='dashboadr-order'>
                        <Bar data={dataChartRevenueByMonth} options={options2} />
                    </Col>
                </Row>

                <Row className='dashboard-row'>
                    <Col md={12}>
                        <div className='dashboard-title mb-20'>
                            Sản phẩm
                        </div>
                    </Col>

                    <Col md={12}>
                        <EnhancedTable headCells={headCells} rows={state.listProduct} />
                    </Col>

                </Row>
            </Container>

        </div >
    )
}