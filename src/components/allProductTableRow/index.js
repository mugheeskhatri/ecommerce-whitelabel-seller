import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../config/api'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineCheck } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';

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
import { fr } from 'faker/lib/locales';
import { prototype } from 'chart.js';
// make a copy of the data, for the second table
const response2 = response.concat([])

function ProductTableRow(props) {


    const [checked, setChecked] = useState(false)
    const history = useHistory()
    const [product, setProduct] = useState("")
    const [category, setCategory] = useState()
    useEffect(() => {
        axios.get(`${API}/category/get/single/${props.data.categoryId}`)
            .then(async (res) => {
                await setCategory(res.data)
            })
    }, [])


    useEffect(() => {
        if (props.selectedProducts.length == 0) {
            setChecked(false)
        } else {
            for (var i = 0; i < props.selectedProducts.length; i++) {
                if (props.selectedProducts[i] === props.data._id) {
                    setChecked(true)
                    break;
                }
            }
        }
    }, [props.selectedProducts])


    // useEffect(() => {
    //     for (var i = 0; i < props.selectedProducts.length; i++) {
    //         if (props.selectedProducts[i] === props.data._id) {
    //             setChecked()
    //         }
    //     }
    // }, [])







    const select = () => {
        if (checked) {
            const filetered = props.selectedProducts.filter(product => product !== props.data._id)
            props.setSelectedProducts(filetered)
            setChecked(false)
        } else {
            const products = [...props.selectedProducts]
            products.push(props.data._id)
            setChecked(true)
            props.setSelectedProducts(products)
        }
    }




    return (
        <>

            <TableRow key={props.index}>
                <div className='px-2 py-6 flex ' style={{ justifyContent: "center" }}>
                    <div
                        className={checked ? 'bg-purple-600' : null}
                        onClick={select}
                        style={{ width: 18, height: 18, borderWidth: .5, borderColor: "gray" }}>
                        {checked ? <BsCheck2
                            size={15}
                            color="white"
                        /> : props.checkedAll ? <BsCheck2
                            size={15}
                            color="white"
                        /> : null}
                    </div>
                </div>
                <TableCell>
                    <div className="flex items-center text-sm">
                        {props.data?.image ? <Avatar className="hidden mr-3 md:block" src={props.data?.image[0]?.src} /> : null}
                        <div>
                            <p className="font-semibold">{props.data?.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{props.data?.shortDescription}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{category?.name}</span>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <span className="text-sm">{props.data?.reviews?.length}</span>

                </TableCell>
                <TableCell className='text-xs' style={{ textAlign: "center" }}>
                    {props.data?.stock
                    }pcs
                </TableCell>
                <TableCell>
                    <div className="flex items-center space-x-2">
                        <Button
                        onClick={()=>{
                            history.push(`/app/product-details/${props.data._id}`)
                        }}
                        layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEye size={18} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={() => {
                                history.push(`/app/edit-product/${props.data._id}`)
                            }}
                            layout="link" size="icon" aria-label="Edit">
                            <AiOutlineEdit size={18} className=" text-gray-600 dark:text-gray-400" />
                        </Button>
                        <Button
                            onClick={props.deleteProduct}
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
