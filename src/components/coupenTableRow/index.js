import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../config/api'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';

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
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'

import response from '../../utils/demo/tableData'
import { useHistory } from 'react-router-dom';
// make a copy of the data, for the second table
const response2 = response.concat([])

function ProductTableRow(props) {
    const history = useHistory()
    const [product, setProduct] = useState("")
    const [category, setCategory] = useState()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const startDate = new Date(props.data.startDate)
    const endDate = new Date(props.data.endDate)


    console.log("nmughees", props.data)

    return (
        <>

            <TableRow key={props.index}>
                <TableCell>
                    <div className="flex items-center text-sm">
                        <div>
                            <p className="font-semibold">{props?.data?.title}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{props.data.coupen}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{`${props.data.saleType === "Price" ? "Rs." : ""}${props.data?.percentOrAmount}${props.data.saleType !== "Price" ? "%" : null}`}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-xs">{`${months[startDate.getMonth()]}-${startDate.getDate()}-${startDate.getFullYear()}`}</span>

                </TableCell>
                <TableCell className='text-xs' style={{ textAlign: "center" }}>
                    {`${months[endDate.getMonth()]}-${endDate.getDate()}-${endDate.getFullYear()}`}
                </TableCell>
                <TableCell>
                    <div
                        style={{ justifyContent: "flex-end" }}
                        className="flex space-x-2">
                        <Button
                        onClick={props.onEdit}
                        layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEdit size={18} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={props.deleteCoupen}
                            layout="link" size="icon" aria-label="Delete">
                            <AiOutlineDelete size={17} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ProductTableRow
