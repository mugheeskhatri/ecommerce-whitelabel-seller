import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../config/api'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import Rating from 'react-star-review';

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
    Pagination,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'

import response from '../../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function OrderTableRow(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [user, setUser] = useState("")
    const [product, setProduct] = useState("")
    const date = new Date(props.data.createdDate)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", , "July", "Aug", "Sep", "Oct", "Nov", "Dec"]


    useEffect(() => {
        axios.get(`${API}/user/getSingle/${props.data.userId}`)
            .then((response) => {
                setUser(response.data)
            })
    }, [])

    useEffect(() => {
        axios.get(`${API}/product/get/single/${props.data.productId}`)
            .then((response) => {
                setProduct(response.data)
            })
    }, [])





    return (
        <>

            <TableRow key={props.index}>
                <TableCell>
                    <div className="flex items-center text-sm">
                        <Avatar className="hidden mr-3 md:block" src={user.image} />
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{props.data.message.length > 30 ? `${props.data.message.slice(0, 30)}....` : props.data.message}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{product.name}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-xs">{props.data.stars}</span>

                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-xs">{`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</span>

                </TableCell>
                <TableCell>
                    <div
                        style={{ justifyContent: "flex-end" }}
                        className="flex space-x-2 ">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEye size={18} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={props.deleteReview}
                            layout="link" size="icon" aria-label="Delete">
                            <AiOutlineDelete size={17} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>






            {/* Modal */}

            <Modal style={{ width: '100%' }} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalBody>
                    <div className='w-full reviewModal'>
                        <div className='w-50'>
                            <img
                                style={{ width: "100%", height: 200 }}
                                src={'data:image/jpeg;base64,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'}
                            />
                        </div>
                        <div className='w-50'>
                            <div style={{ paddingLeft: 10, marginTop: 20, display: "flex" }}>
                                <div style={{ width: "50%" }}>
                                    <Rating
                                        size={20}
                                        rating={props.data.stars} />
                                </div>
                                <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <p style={{ fontSize: 12 }} className="text-gray-700 dark:text-gray-200">
                                        {`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}
                                    </p>
                                </div>
                            </div>
                            <div style={{ paddingLeft: 10, marginTop: 25 }}>
                                <p style={{ fontSize: 13 }} className="text-gray-700 dark:text-gray-200">
                                    {props.data.message}
                                </p>
                            </div>
                            <div style={{ alignItems: "center", paddingLeft: 10, marginTop: 25 }} className='flex'>
                                <img
                                    style={{ width: 25, height: 25, borderRadius: 100 }}
                                    src={user.image}
                                />
                                <p style={{ marginLeft: 10 }} className="text-xm font-semibold text-gray-700 dark:text-gray-200">
                                    {user.name}
                                </p>
                            </div>

                        </div>
                    </div>
                </ModalBody>
            </Modal>


            {/* Modal */}
        </>
    )
}

export default OrderTableRow
