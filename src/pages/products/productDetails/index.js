import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../../config/api'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFilter } from 'react-icons/ai';
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
    Select
} from '@windmill/react-ui'
import ProductTableRow from '../../../components/allProductTableRow'
import { BsCheck2 } from 'react-icons/bs';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import response from '../../../utils/demo/tableData'
import { useHistory, useParams } from 'react-router-dom'
import Rating from 'react-star-review';
import { Alert } from 'bootstrap';
// make a copy of the data, for the second table
const response2 = response.concat([])

function Cards() {
    const [currentProduct, setCurrentProduct] = useState("")
    const history = useHistory()
    const [category, setCategory] = useState([])
    const params = useParams()
    const productId = params.id


    const getProductData = () => {
        axios.get(`${API}/product/get/single/${productId}`)
            .then((res) => {
                console.log("res", res.data)
                setCurrentProduct(res.data)
                if (res.data.categoryId !== null && res.data.categoryId !== "null" && res.data.categoryId !== undefined && res.data.categoryId !== "") {
                    axios.get(`${API}/category/get/single/${res.data.categoryId}`)
                        .then((res) => {
                            console.log(res.data)
                            setCategory(res.data)
                        })
                } else {
                    console.log("Categry id not found")
                }

            })
    }



    useEffect(() => {
        getProductData()
    }, [])








    const deleteProduct = () => {
        axios.delete(`${API}/admin/delete-product/${currentProduct}`)
            .then((response) => {
                alert("Product Deleted")
                // getProducts()
            })
    }



    return (
        <>
            <div className='w-full flex my-5'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Product Details</h1>
                </div>
                <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    <div className='text-xl text-gray-700 dark:text-gray-200'>
                        {currentProduct?.stock}Pcs in stock
                    </div>
                    <Button
                        className='mx-4'
                        onClick={() => history.push("/app/new-product")}
                    >
                        <AiOutlineEdit
                            style={{ marginRight: 3 }}
                            size={20} />
                        Edit
                    </Button>
                    <Button
                        onClick={() => history.push("/app/new-product")}
                    >

                        Delete
                        <AiOutlineDelete
                            style={{ marginLeft: 3 }}
                            size={20}
                        />
                    </Button>
                </div>
            </div>

            <div className='product_detail_container'>
                <div className='slider_container'>
                    <Carousel
                    >
                        {currentProduct?.image?.map((v, i) => {
                            return (
                                <div style={{ width: "100%", height: 300 }}>
                                    <img style={{ width: "100%", height: "100%" }} src={v.src} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
                <div className='product_detail_text_container px-4'>
                    <div className='w-full flex'>
                        <div className='w-50 '
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <Rating
                                size={20}
                                rating={4}
                                 />
                            <div className='text-md mt-1 mx-2 text-gray-700 dark:text-gray-200'>
                                (5)
                            </div>
                        </div>
                        <div className='w-50'
                            style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                        >
                            <div className='text-2xl mt-3 font-semibold text-gray-700 dark:text-gray-200'>
                                ${currentProduct.salePrice}
                            </div>
                        </div>
                    </div>
                    <div className='text-2xl mt-3 font-semibold text-gray-700 dark:text-gray-200'>
                        {currentProduct.name}
                    </div>
                    <div className='text-md text-gray-700 dark:text-gray-200'>
                        {currentProduct.shortDescription}
                    </div>
                    <div className='text-xl mt-3 font-semibold text-gray-700 dark:text-gray-200'>
                        Description:
                    </div>
                    <div className='text-md text-gray-700 dark:text-gray-200'>
                        {currentProduct?.longDescription}
                    </div>
                </div>
            </div>

            <div className='w-100'>
                <div className='inputContainer'>
                    {currentProduct.differentSizes === "Yes" &&
                        <div className='product_input'>
                            <div className='text-2xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                Size Detais:
                            </div>
                            <TableContainer
                                className="mb-8 mt-1">
                                <Table>
                                    <TableHeader>
                                        <tr>
                                            <TableCell className="w-50">Size</TableCell>
                                            <TableCell style={{ width: "50%", textAlign: "end" }}>Price</TableCell>
                                        </tr>
                                    </TableHeader>
                                    <TableBody>
                                        {currentProduct?.sizeAttributes?.map((v, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell className="w-50 font-semibold text-md text-gray-500 dark:text-gray-400">{v?.size}</TableCell>
                                                    <TableCell style={{ width: "50%", textAlign: "end" }}>
                                                        {v?.price}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }

                    {currentProduct.differentColors === "Yes" &&
                        <div className='product_input'>
                            <div className='text-2xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                Color Detais:
                            </div>
                            <TableContainer
                                className="mb-8 mt-1">
                                <Table>
                                    <TableHeader>
                                        <tr>
                                            <TableCell >Color</TableCell>
                                            <TableCell >Color Image</TableCell>
                                            <TableCell >Color Price</TableCell>
                                        </tr>
                                    </TableHeader>
                                    <TableBody>
                                        {currentProduct?.colorAttributes?.map((v, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell className="w-50 font-semibold text-md text-gray-500 dark:text-gray-400">{v?.colorName}</TableCell>
                                                    <TableCell style={{ width: "50%", textAlign: "end" }}>
                                                        <img
                                                            src={v?.image}
                                                            style={{ width: 70, height: 55 }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: "50%", textAlign: "end" }}>
                                                        {v?.price}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }
                    {currentProduct.differentMaterial === "Yes" &&
                        <div className='product_input'>
                            <div className='text-2xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                Material Detais:
                            </div>
                            <TableContainer
                                className="mb-8 mt-1">
                                <Table>
                                    <TableHeader>
                                        <tr>
                                            <TableCell className="w-50">Material</TableCell>
                                            <TableCell style={{ width: "50%", textAlign: "end" }}>Material Item</TableCell>
                                        </tr>
                                    </TableHeader>
                                    <TableBody>
                                        {currentProduct?.material?.map((v, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell className="w-50 font-semibold text-md text-gray-500 dark:text-gray-400">{v?.materialName}</TableCell>
                                                    <TableCell style={{ width: "50%", textAlign: "end" }}>
                                                        {v?.element}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    }
                </div>

                <div className='w-100'>
                    <div className='text-2xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                        Reviews :
                    </div>
                    <div className='w-full overflow-hidden rounded-lg shadow-xs mb-8 mt-1 p-3'>
                        <div className='inputContainer'>
                            <div className='product_input'>
                                <div className='text-xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                    Muhammad Mughees
                                </div>
                            </div>
                            <div
                                style={{ display: "flex", justifyContent: "flex-end" }}
                                className='product_input'>
                                <Rating
                                    size={20}
                                    rating={4.5} />
                            </div>
                        </div>
                        <div className='text-md mt-2 text-gray-700 dark:text-gray-200'>
                            This is very best product i have used many products but it was highly appreciated
                        </div>

                    </div>
                    <div className='w-full overflow-hidden rounded-lg shadow-xs mb-8 mt-1 p-3'>
                        <div className='inputContainer'>
                            <div className='product_input'>
                                <div className='text-xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                    Muhammad Mughees
                                </div>
                            </div>
                            <div
                                style={{ display: "flex", justifyContent: "flex-end" }}
                                className='product_input'>
                                <Rating
                                    size={20}
                                    rating={4.5} />
                            </div>
                        </div>
                        <div className='text-md mt-2 text-gray-700 dark:text-gray-200'>
                            This is very best product i have used many products but it was highly appreciated
                        </div>

                    </div>
                    <div className='w-full overflow-hidden rounded-lg shadow-xs mb-8 mt-1 p-3'>
                        <div className='inputContainer'>
                            <div className='product_input'>
                                <div className='text-xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                    Muhammad Mughees
                                </div>
                            </div>
                            <div
                                style={{ display: "flex", justifyContent: "flex-end" }}
                                className='product_input'>
                                <Rating
                                    size={20}
                                    rating={4.5} />
                            </div>
                        </div>
                        <div className='text-md mt-2 text-gray-700 dark:text-gray-200'>
                            This is very best product i have used many products but it was highly appreciated
                        </div>

                    </div>
                    <div className='w-full overflow-hidden rounded-lg shadow-xs mb-8 mt-1 p-3'>
                        <div className='inputContainer'>
                            <div className='product_input'>
                                <div className='text-xl mt-2 font-semibold text-gray-700 dark:text-gray-200'>
                                    Muhammad Mughees
                                </div>
                            </div>
                            <div
                                style={{ display: "flex", justifyContent: "flex-end" }}
                                className='product_input'>
                                <Rating
                                    size={20}
                                    rating={3.5} />
                            </div>
                        </div>
                        <div className='text-md mt-2 text-gray-700 dark:text-gray-200'>
                            This is very best product i have used many products but it was highly appreciated
                        </div>

                    </div>
                </div>

            </div>





        </>
    )
}

export default Cards
