import React, { useState, useEffect } from 'react'
import { Input, Label } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';

import {
    Button, Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Avatar,
    Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, } from '../../icons'
import response from '../../utils/demo/tableData'

import axios from "axios"
import { API, cloudinaryAPI, cloud_name } from '../../config/api'
import { useHistory } from 'react-router-dom';





function Category() {
    const response2 = response.concat([])
    const [pageTable1, setPageTable1] = useState(1)
    const [pageTable2, setPageTable2] = useState(1)
    const [allCategory, setAllCategory] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [dataTable1, setDataTable1] = useState([])
    const [dataTable2, setDataTable2] = useState([])
    const history = useHistory()






    const getCategory = () => {
        axios.get(`${API}/category/get`)
            .then((response) => {
                setAllCategory(response.data)

            })

    }

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
    useEffect(() => {
        setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
    }, [pageTable1])
    useEffect(() => {
        setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])



    useEffect(() => {
        getCategory()
    }, [])
    const filtered = categoryData.filter(function (x) {
        return x !== undefined;
    });


    const deleteCategory = (id) => {
        axios.delete(`${API}/admin/delete-category/${id}`)
            .then((response) => {
                alert("Category Deleted")
                getCategory()
            })
    }


    return (
        <>
            <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "60%" }}>

                    <PageTitle>All Categories</PageTitle>
                </div>
                <div style={{ width: "40%", }}>
                    <div
                        style={{ width: "100%", marginTop: 28, display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button onClick={() => history.push("/app/create/category")}
                        >+ Add New</Button>
                    </div>

                </div>
            </div>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Category</TableCell>
                            {/* <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell> */}
                            <TableCell style={{ textAlign: "center" }}>Slider Images</TableCell>
                            <TableCell style={{ textAlign: "center" }}> No of Products</TableCell>
                            <TableCell style={{ display: "flex", justifyContent: "flex-end" }}>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {allCategory?.map((e, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <Avatar className="hidden mr-3 md:block" src={e.categoryImage} />
                                            <div>
                                                <p className="font-semibold">{e.name}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{e.shortDescription}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <div style={{
                                            width: "100%", display: "flex"
                                        }}>
                                            {e.images ? e?.images?.map((v, index) => {
                                                return v.src !== "" ? (
                                                    <div style={{ width: 50, height: 40, marginLeft: 10 }}>
                                                        <img
                                                            key={i}
                                                            src={v.src}
                                                            style={{ width: "100%", height: "100%" }}
                                                        />

                                                    </div>
                                                ) : null
                                            }) : null}
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center", }}>
                                        <span className="text-sm">{e?.products?.length}</span>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <div style={{ justifyContent: "flex-end" }} className="flex space-x-2">
                                            <Button layout="link" size="icon" aria-label="Edit">
                                                <AiOutlineEye size={20} className=" text-gray-600 dark:text-gray-400" />
                                            </Button>
                                            <Button layout="link" size="icon" aria-label="Edit">
                                                <AiOutlineEdit size={20} className=" text-gray-600 dark:text-gray-400" />
                                            </Button>
                                            <Button
                                                onClick={() => deleteCategory(e._id)}
                                                layout="link" size="icon" aria-label="Delete">
                                                <AiOutlineDelete size={20} className=" text-gray-600 dark:text-gray-400" />

                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable2}
                        label="Table navigation"
                    />
                </TableFooter>

            </TableContainer>
        </>
    )
}

export default Category
