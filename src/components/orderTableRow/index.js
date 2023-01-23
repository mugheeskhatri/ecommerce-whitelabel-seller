import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../config/api'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import Select from 'react-select'
import PageTitle from '../Typography/PageTitle'
import SectionTitle from '../Typography/SectionTitle'
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
    Modal,
    ModalBody,
    Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'

import response from '../../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function OrderTableRow(props) {

    const [categoryName, setCategoryName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderStatus, setOrderStatus] = useState(props.data.status)
    useEffect(() => {
        axios.get(`${API}/category/get/single/${props.data.categoryId}`)
            .then((response) => {
                setCategoryName(response.data.name)
            })
    }, [])

    console.log(props.data)

    const updateStatus = () => {
        axios.patch(`${API}/admin/order/update/${props.data._id}`, { ...props.data, status: orderStatus })
            .then((res) => {
                alert("Order Status Updated")
            })
    }



    return (
        <>

            <TableRow key={props.index}>
                <TableCell>
                    <div className="flex items-center text-sm">
                        <Avatar className="hidden mr-3 md:block" src={props.data.image} />
                        <div>
                            <p className="font-semibold">{props.data.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{props.data.city}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{props.data.phone}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-xs">Rs.{Number(props.data.grossAmount) + Number(props.data.deliveryCharge) - Number(props.data.discount)
                    }</span>

                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{props.data.orderNumber}</span>

                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{orderStatus}</span>

                </TableCell>
                <TableCell style={{ textAlign: "center" }}>

                    <span className='text-xs'>

                        {props.data.payment
                        }
                    </span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <div className="flex items-center space-x-2">
                        <Button
                        onClick={props.onEyeClick}
                        layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEye size={18} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={() => orderStatus !== "Cancelled" && orderStatus !== "Delivered" ? setIsModalOpen(true) : null}
                            layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEdit size={18} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={props.deleteOrder}
                            layout="link" size="icon" aria-label="Delete">
                            <AiOutlineDelete size={17} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
            {/* Modal */}

            <Modal style={{ width: '100%', height: 300, }} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalBody>
                    <Select
                        defaultValue={{ label: props?.data?.status, value: props.data.status }}
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
                            onClick={() => setIsModalOpen(false)}
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

export default OrderTableRow
