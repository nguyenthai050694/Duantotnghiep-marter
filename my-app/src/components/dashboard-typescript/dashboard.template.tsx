import React, { useState } from 'react'
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

    const labels = ["25/1", "26/1", "27/1", "28/1", "29/1", "30/1"];
    const labels2 = ["01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Số đơn hàng",
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

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

    const data1 = {
        labels: labels,
        datasets: [
            {
                label: "Doanh thu",
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
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

    const data2 = {
        labels: labels2,
        datasets: [
            {
                label: "Doanh thu",
                backgroundColor: "#0d6efd",
                borderColor: "#0d6efd",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };


    const [value, setValue] = React.useState(0);

    function createData(name: any, calories: any, fat: any, carbs: any) {
        return {
            name,
            calories,
            fat,
            carbs,
        };
    }

    const rows = [
        createData('Cupcake', 305, 3.7, 67),
        createData('Donut', 452, 25.0, 51),
        createData('Eclair', 262, 16.0, 24),
        createData('Frozen yoghurt', 159, 6.0, 24),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Honeycomb', 408, 3.2, 87),
        createData('Ice cream sandwich', 237, 9.0, 37),
        createData('Jelly Bean', 375, 0.0, 94),
        createData('KitKat', 518, 26.0, 65),
        createData('Lollipop', 392, 0.2, 98),
        createData('Marshmallow', 318, 0, 81),
        createData('Nougat', 360, 19.0, 9),
        createData('Oreo', 437, 18.0, 63),
    ];


    const headCells = [
        {
            id: 'name',
            align: 'center',
            disablePadding: true,
            label: 'Mã sản phẩm',
        },
        {
            id: 'calories',
            align: 'left',
            disablePadding: false,
            label: 'Tên sản phẩm',
        },
        {
            id: 'fat',
            align: 'right',
            disablePadding: false,
            label: 'Số lượng bán',
        },
        {
            id: 'carbs',
            align: 'right',
            disablePadding: false,
            label: 'Doanh thu',
        },
    ];



    return (
        <div className='main-page dashboard'>

            <Container>
                <Row className='dashboard-row'>
                    <Col md={12}>
                        <Box sx={{ width: 500 }}>
                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction label={`${state.count[0] && state.count[0].name}(${state.count[0] && state.count[0].count})`} icon={<PeopleIcon />} />
                                <BottomNavigationAction label={`${state.count[1] && state.count[1].name}(${state.count[1] && state.count[1].count})`} icon={<StorageIcon />} />
                                <BottomNavigationAction label={`${state.count[2] && state.count[2].name}(${state.count[2] && state.count[2].count})`} icon={<EmailIcon />} />
                            </BottomNavigation>
                        </Box>
                    </Col>
                </Row>
                <Row className='dashboard-row'>
                    <Col md={3}>
                        <BoxInfo color='green' title='Trong 1 ngày' content={`${state.revenue[0]?.money} VND`} percen={state.revenue[0]?.percen} />
                    </Col>
                    <Col md={3}>
                        <BoxInfo color='red' title='Trong 1 tuần' content={`${state.revenue[1]?.money} VND`} percen={state.revenue[1]?.percen} />
                    </Col>
                    <Col md={3}>
                        <BoxInfo color='yellow' title='Trong 1 tháng' content={`${state.revenue[2]?.money} VND`} percen={state.revenue[2]?.percen} />
                    </Col>
                    <Col md={3}>
                        <BoxInfo color='blue' title='Trong 1 năm' content={`${state.revenue[3]?.money} VND`} percen={state.revenue[3]?.percen} />
                    </Col>
                </Row>

                <Row className='dashboard-row'>
                    <Col md={12}>
                        <div className='dashboard-title'>
                            Đơn Hàng
                        </div>
                    </Col>

                    <Col md={6}>
                        <Line data={data} options={options} />
                    </Col>

                    <Col md={6} className='dashboadr-order'>
                        <Row>
                            <Col md={6} className='order-box'>
                                <Link to={'#'}>
                                    <div className='order-number'>
                                        3
                                    </div>
                                    <div className='order-title'>
                                        Đơn hàng mới
                                    </div>
                                </Link>
                            </Col>

                            <Col md={6} className='order-box'>
                                <Link to={'#'}>
                                    <div className='order-number'>
                                        3
                                    </div>
                                    <div className='order-title'>
                                        Chờ giao hàng
                                    </div>
                                </Link>
                            </Col>

                            <Col md={6} className='order-box'>
                                <Link to={'#'}>
                                    <div className='order-number'>
                                        3
                                    </div>
                                    <div className='order-title'>
                                        Đã giao hàng
                                    </div>
                                </Link>
                            </Col>

                            <Col md={6} className='order-box'>
                                <Link to={'#'}>
                                    <div className='order-number'>
                                        3
                                    </div>
                                    <div className='order-title'>
                                        Đơn hủy
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
                        <Bar data={data1} options={options1} />
                    </Col>

                    <Col md={6} className='dashboadr-order'>
                        <Bar data={data2} options={options2} />
                    </Col>
                </Row>

                <Row className='dashboard-row'>
                    <Col md={12}>
                        <div className='dashboard-title'>
                            Sản phẩm
                        </div>
                    </Col>

                    <Col md={12}>
                        <EnhancedTable headCells={headCells} rows={rows} />
                    </Col>

                </Row>
            </Container>

        </div >
    )
}