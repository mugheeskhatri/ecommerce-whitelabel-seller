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
    const [category , setCategory] = useState()
    useEffect(() => {
        if (props.data != "null" || props.data !== undefined) {
            axios.get(`${API}/product/get/single/${props.data}`)
                .then((response) => {
                    setProduct(response.data)
                    axios.get(`${API}/category/get/single/${response.data.categoryId}`)
                    .then((res)=>{
                        setCategory(res.data)
                    })
                })
        }
    }, [])
    console.log(props.data)


    return (
        <>

            <TableRow key={props.index}>
                <TableCell>
                    <div className="flex items-center text-sm">
                        {product?.image ? <Avatar className="hidden mr-3 md:block" src={product?.image[0]?.src} /> : null}
                        <div>
                            <p className="font-semibold">{product?.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{product.shortDescription}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{category?.name}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{product?.reviews?.length}</span>

                </TableCell>
                <TableCell className='text-xs' style={{ textAlign: "center" }}>
                    {product.stock
                    }pcs
                </TableCell>
                
            </TableRow>

        </>
    )
}

export default ProductTableRow
