import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../config/api'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import Select from 'react-select'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
    Modal,
    ModalBody
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import OrderTableRow from '../../components/orderTableRow'

import response from '../../utils/demo/tableData'
import { useParams } from 'react-router-dom'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Cards() {
    // setup pages control for every table
    const [pageTable1, setPageTable1] = useState(1)
    const [pageTable2, setPageTable2] = useState(1)
    const [orders, setOrders] = useState([])
    // setup data for every table
    const [dataTable1, setDataTable1] = useState([])
    const [dataTable2, setDataTable2] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)


    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length

    // pagination change control
    function onPageChangeTable1(p) {
        setPageTable1(p)
    }

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
    }, [pageTable1])
    const [order, setOrder] = useState()
    const params = useParams()

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

    const getOrders = () => {
        axios.get(`${API}/order/getbyId/${params.id}`)
            .then((response) => {
                console.log(response.data)
                setOrder(response.data)
            })
    }

    useEffect(() => {
        getOrders()

    }, [])

    const [orderStatus, setOrderStatus] = useState(order?.status)


    const deleteOrder = (id) => {
        axios.delete(`${API}/admin/order/delete/${id}`)
            .then((response) => {
                alert("Order Deleted")
                getOrders()
            })

    }

    const updateStatus = () => {
        axios.patch(`${API}/admin/order/update/${order?._id}`, { ...order, status: orderStatus })
            .then((res) => {
                alert("Order Status Updated")
            })
    }

    return (
        <>

            <div className='w-full flex px-5 flex' >
                <div className='w-50'>
                    <PageTitle>Order Details</PageTitle>
                </div>
                <div className='w-50 flex py-6' style={{ justifyContent: "flex-end" }} >
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        disabled={orderStatus !== "Cancelled" && orderStatus !== "Delivered" ? false : true}>
                        Update Status
                    </Button>
                </div>
            </div>
            
            {/* order Details */}

            <div className='w-full p-3'>
                <div className='w-full p-3 border shadow'>
                    <div>
                        <h1 className='my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Order Details</h1>
                    </div>
                    <div className='flex'>
                        <div className='w_66'>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Order Number</p>
                        </div>
                        <div style={{ width: "34%", textAlign: "end" }}>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{order?.orderNumber}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w_66'>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Order Created Date</p>
                        </div>
                        <div style={{ width: "34%", textAlign: "end" }}>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{order?.orderNumber}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w_66'>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Order Status</p>
                        </div>
                        <div style={{ width: "34%", textAlign: "end" }}>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{order?.status}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w_66'>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Payment Method</p>
                        </div>
                        <div style={{ width: "34%", textAlign: "end" }}>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{order?.payment}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w_66'>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Coupen No.</p>
                        </div>
                        <div style={{ width: "34%", textAlign: "end" }}>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{order?.coupen}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w_66'>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Description</p>
                        </div>
                        <div style={{ width: "34%", textAlign: "end" }}>
                            <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{order?.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* order Details */}
            <div className='container flex_custom'>
                <div className='w_66 p-3'>
                    <div className='w-full border shadow p-3'>
                        <div>
                            <h1 className='my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Product Details</h1>
                        </div>
                        {order?.products ? order?.products?.map((v, i) => {
                            return (
                                <div className='flex'>
                                    <div style={{ width: "65%" }}>
                                        <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>{`${v.name} x ${v.quantity}`}</p>
                                    </div>
                                    <div style={{ width: "35%", textAlign: "end" }}>
                                        <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{v.price}</p>
                                    </div>
                                </div>
                            )
                        }) : null}
                        <div className='flex' style={{ borderTopWidth: .5, bordertTopColor: "gray" }}>
                            <div style={{ width: "65%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Sub Total</p>
                            </div>
                            <div style={{ width: "35%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{order?.grossAmount}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div style={{ width: "65%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Shipping Cost</p>
                            </div>
                            <div style={{ width: "35%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>+ {order?.deliveryCharge}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div style={{ width: "65%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Discount</p>
                            </div>
                            <div style={{ width: "35%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>- {order?.discount}</p>
                            </div>
                        </div>
                        <div className='flex' style={{ borderTopWidth: .5, bordertTopColor: "gray" }}>
                            <div style={{ width: "65%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Total</p>
                            </div>
                            <div style={{ width: "35%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'> {Number(order?.grossAmount) + Number(order?.deliveryCharge) - Number(order?.discount)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w_33_custom p-3'>
                    <div className='w-full border shadow p-3'>
                        <div>
                            <h1 className='my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200'>User Details</h1>
                        </div>
                        <div className='flex' >
                            <div style={{ width: "40%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Name</p>
                            </div>
                            <div style={{ width: "60%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{order?.name}</p>
                            </div>
                        </div>
                        <div className='flex' >
                            <div style={{ width: "40%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Phone</p>
                            </div>
                            <div style={{ width: "60%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{order?.phone}</p>
                            </div>
                        </div>
                        <div className='flex' >
                            <div style={{ width: "40%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>City</p>
                            </div>
                            <div style={{ width: "60%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{order?.city}</p>
                            </div>
                        </div>
                        <div className='flex' >
                            <div style={{ width: "40%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Address</p>
                            </div>
                            <div style={{ width: "60%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{order?.address}</p>
                            </div>
                        </div>
                        <div className='flex' >
                            <div style={{ width: "40%" }}>
                                <p className='my-1 text-xl  text-gray-700 dark:text-gray-200'>Email</p>
                            </div>
                            <div style={{ width: "60%", textAlign: "end" }}>
                                <p className='my-1 text-xl text-gray-700 dark:text-gray-200'>{order?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


            {/* Modal */}

            <Modal style={{ width: '100%', height: 300, }} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalBody>
                    <Select
                        defaultValue={{ label: order?.status, value: order?.status }}
                        onChange={(e) => setOrderStatus(e.value)}
                        options={[{ label: "Pending", value: "Pending" }, { label: "Delivered", value: "Delivered" }, { label: "Cancelled", value: "Cancelled" }]} >
                    </Select>
                    <div style={{ width: "100%", display: "flex", marginTop: 20, justifyContent: "space-around", flexWrap: "wrap" }}>
                        <div className='w-40 mt-3'>
                            <Button
                                onClick={() => {
                                    updateStatus()
                                    setIsModalOpen(false)
                                }}
                                block>
                                Confirm
                            </Button>
                        </div>
                        <div
                            onClick={() => {
                                setIsModalOpen(false)
                                setOrderStatus(order?.status)
                            }}
                            className='w-40 mt-3'>
                            <Button block>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>


            {/* Modal */}

        </>
    )
}

export default Cards
