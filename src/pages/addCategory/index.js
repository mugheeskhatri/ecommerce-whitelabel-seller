import React, { useState, useEffect } from 'react'
import { Input, Label } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';

import {
    Button,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, } from '../../icons'
import response from '../../utils/demo/tableData'

import axios from "axios"
import { API } from '../../config/api'





function Category() {
    const response2 = response.concat([])
    const [pageTable1, setPageTable1] = useState(1)
    const [pageTable2, setPageTable2] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [shortDescription, setShortDesctription] = useState("")
    const [allCategory, setAllCategory] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [mainCategoryData, setMainCategoryData] = useState([])
    const [key, setKey] = useState()

    const [dataTable1, setDataTable1] = useState([])
    const [dataTable2, setDataTable2] = useState([])

    const [categoryName, setCategoryName] = useState("")
    const [categoryImage, setCategoryImage] = useState("")
    const [sliderImage, setSliderImage] = useState([
        {
            src: ""
        }
    ])





    const getCategory = () => {
        axios.get(`${API}/category/get`)
            .then((response) => {
                setAllCategory(response.data)

            })

    }
    const addCategory = () => {

        if (categoryName === undefined || categoryName.length == 0) {
            alert("Please Enter Category name")
        } else {
            const form = {
                name: categoryName,
                categoryImage,
                images: sliderImage,
                shortDescription
            }
            setIsModalOpen(false)
            axios.post(`${API}/admin/add-category`, form)
                .then((response) => {
                    alert(response.data)
                    getCategory()
                })


        }

    }



    const onFileSelect = async (file) => {

        let form = new FormData()
        form.append("image", file)
        axios.post(`${API}/upload`, form)
            .then((res) => {
                setCategoryImage(res.data.secure_url)
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }

    const onSliderFileSelect = async (file, index) => {

        let form = new FormData()
        form.append("image", file)
        axios.post(`${API}/upload`, form)
            .then((res) => {
                const list = [...sliderImage];
                list[index].src = res.data.secure_url;
                setSliderImage(list);
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }



    const addInput = () => {
        const sliderInput = [...sliderImage, { src: "" }]
        setSliderImage(sliderInput)
    }

    const minusInput = (i) => {
        const list = [...sliderImage];
        list.splice(i, 1);
        setSliderImage(list);
    }

    const sliderImageUpload = (e, i) => {
        const list = [...sliderImage]
        list.splice(i, 1, { src: e.target.files })
        setSliderImage(list)
        console.log(e.target.files[0])
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

    const sendCatregory = () => {

    }


    useEffect(() => {
        getCategory()
    }, [])
    const filtered = categoryData.filter(function (x) {
        return x !== undefined;
    });

    const removeData = () => {
    }


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

                    <PageTitle>Add Category</PageTitle>
                </div>
                <div style={{ width: "40%", }}>
                    <div
                        style={{ width: "100%", marginTop: 28, display: "flex", justifyContent: "flex-end" }}
                    >

                    </div>

                </div>
            </div>
            <div>
                <Label className='mt-5'>
                    <span>Category Name</span>
                    <Input type="text"
                        name="name"
                        value={categoryName}
                        className="mt-1"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Label>
                <Label className='mt-5'>
                    <span>Short Description</span>
                    <Input type="text"
                        name="description"
                        value={shortDescription}
                        className="mt-1"
                        onChange={(e) => setShortDesctription(e.target.value)}
                    />
                </Label>
                <Label className='mt-3'>
                    <span>Category Image</span>
                    <div className='block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>
                        <label htmlFor='file'>Choose file:</label>{' '}
                        <input
                            name="image"
                            type='file'
                            onChange={(e) => onFileSelect(e.target.files[0])}
                        />
                    </div>
                </Label>

                <div style={{ width: "100%", display: "flex", marginTop: 10, alignItems: "center" }}>
                    <div style={{ width: "60%" }}>

                        <span className='block text-sm text-gray-700 dark:text-gray-400 mt-3'>Slider Image</span>
                    </div>
                    <div style={{ width: "40%", display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={() => addInput()}
                        >+ Add Slider Image</Button>
                    </div>
                </div>
                {sliderImage?.map((v, i) => {
                    return (
                        <div className='mt-6 block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>
                            <label htmlFor='file'>Choose file:</label>{' '}
                            <input
                                name="image"
                                type='file'
                                onChange={(e) => onSliderFileSelect(e.target.files[0], i)}
                            />

                            {sliderImage?.length > 1 ? <button
                                className='iconbtn'
                                style={{ padding: 5, float: "right" }}
                                onClick={() => minusInput(i)}
                            >
                                <AiOutlineDelete size={20} color="gray"

                                /></button> : null}
                        </div>
                    )
                })}

                <div style={{ display: "flex", marginTop: 5 }}>

                    {sliderImage.map((v, i) => {
                        return (
                            <img
                                style={{ width: 80, height: 60, marginLeft: 10 }}
                                aria-hidden="true"
                                src={v.src}
                                alt="Office"
                            />
                        )
                    })}
                </div>

                <Button onClick={() => addCategory()} className="mt-4" style={{ width: '100%' }}>Add Category</Button>
            </div>
        </>
    )
}

export default Category
