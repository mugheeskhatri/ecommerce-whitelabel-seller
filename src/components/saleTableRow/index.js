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
    const [categoryName, setCategoryName] = useState("")
    // useEffect(() => {
    //     if (props.data.categoryId != "null") {
    //         axios.get(`${API}/category/get/single/${props.data.categoryId}`)
    //             .then((response) => {
    //                 setCategoryName(response?.data?.name)
    //             })
    //     }
    // }, [])

    console.log(props.data)

    return (
        <>

            <TableRow key={props.index}>
                <TableCell>
                    <div className="flex items-center text-sm">
                        {/* <Avatar className="hidden mr-3 md:block" src={props.data.image[0]?.src} /> */}
                        <div>
                            <p className="font-semibold">{props.data.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{props.data.discountType}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{props.data.percentOrAmount}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{props.data.startDate}</span>

                </TableCell>
                <TableCell className='text-xs' style={{ textAlign: "center" }}>
                    {props.data.endDate
                    }
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <div className="flex items-center space-x-2">
                        <Button layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEye size={20} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={props.deleteProduct}
                            layout="link" size="icon" aria-label="Delete">
                            <AiOutlineDelete size={20} className=" text-gray-600 dark:text-gray-400" />

                        </Button>
                    </div>
                </TableCell>
            </TableRow>

        </>
    )
}

export default ProductTableRow
