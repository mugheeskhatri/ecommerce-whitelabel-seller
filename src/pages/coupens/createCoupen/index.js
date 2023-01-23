


import React, { useState, useEffect } from 'react'
import {
    Input, HelperText, Label, Textarea, Pagination,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@windmill/react-ui'
import PageTitle from '../../../components/Typography/PageTitle'
import { Button } from '@windmill/react-ui'
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { API, cloudinaryAPI, cloud_name } from '../../../config/api'
import TextField from '@mui/material/TextField';
import { async } from '@firebase/util';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Select from 'react-select'

function NewProduct() {

    const [saleTitle, setTitle] = useState("")
    const [saleType, setSaleType] = useState("Percentage")
    const [salePrice, setSalePrice] = useState("")
    const [saleStart, setSaleStart] = useState(new Date())
    const [description, setDescription] = useState("")
    const [saleEnd, setSaleEnd] = useState(new Date())
    const [saleSlider, setSaleSlider] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState("")

    useEffect(() => {
        axios.get(`${API}/category/get`)
            .then((response) => {
                setCategoryId(response.data[0]?._id)
                setCategoryList(response.data)
            })

    }, [])

    useEffect(() => {
        saleEnd.setDate(saleEnd.getDate() + 1)
        saleEnd.setHours(0)
        saleEnd.setMinutes(0)
        saleEnd.setSeconds(0)
        saleEnd.setMilliseconds(0)
        saleStart.setHours(0)
        saleStart.setMinutes(0)
        saleStart.setSeconds(0)
        saleStart.setMilliseconds(0)
    }, [saleEnd, saleStart])



    const createSale = () => {
        if (saleTitle === undefined || saleTitle.length === 0) {
            alert("Please Enter Title")
        } else if (saleType === undefined || saleType.length === 0) {
            alert("Please Select Sale Type")
        } else if (salePrice === undefined || salePrice.length === 0) {
            alert("Please Enter how much percentage or price you want in sale")
        } else if (saleEnd.getTime() - saleStart.getTime() < 1) {
            alert("Invalid Sale Time")
        } else if (Number(saleEnd.getTime() - new Date().getTime()) < 1) {
            alert("You Enter Sale Date Which was gone")
        } else {
            setIsModalOpen(true)
        }
    }




    const confirm = (allDeal) => {
        const form = {
            discountType: saleType,
            percentOrAmount: salePrice,
            startDate: saleStart,
            endDate: saleEnd,
            title: saleTitle,
            description,
            allDeal: allDeal
        }
        axios.post(`${API}/admin/coupen/create`, form)
            .then(async (res) => {
                console.log(res.data)
            })
    }


    const onFileSelect = async (file) => {
        let form = new FormData()
        form.append("image", file)
        axios.post(`${API}/upload`, form)
            .then((res) => {
                console.log(res.data.secure_url)
                setSaleSlider(res.data.secure_url)
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }

    const deleteImage = () => {
        axios.delete("https://res.cloudinary.com/dnoyzcu1u/image/upload/v1664352797/saleImage/wnrwlv2gi6bpfdxzveum.jpg")
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <>
            <PageTitle>Create Sale</PageTitle>

            <div>
                <div className='inputContainer'>
                    <Label className="product_input mt-4">
                        <span>Sale Title<span style={{ fontSize: 11, color: "gray" }}> It will be show to costumer where sale on</span></span>
                        <Input
                            placeholder="Enter Title"
                            value={saleTitle}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1" />


                    </Label>
                    <button onClick={deleteImage}>Delete aimage</button>
                    <Label
                        className=" product_input mt-4">
                        <span>Sale By</span>
                        <Select
                            onChange={(e) => setSaleType(e.value)}
                            options={[{ label: "Percentage", value: "Percentage" }, { label: "Price", value: "Price" }]}
                            className="mt-1" />
                    </Label>

                    <Label className="product_input mt-4">
                        <span>Enter how much percent or price</span>

                        <Input
                            placeholder="Enter Percent or price"
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                            className="mt-1" />
                    </Label>
                    <Label className="product_input mt-4">
                        <span>Sale Start Date Time</span>

                        <div className='w-full border py-2 mt-2 px-2'>
                            <DatePicker
                                className='calender'
                                selected={saleStart} onChange={(date: Date) => setSaleStart(date)} />
                        </div>
                    </Label>
                    <Label className="product_input mt-4">
                        <span>Sale End Date Time</span>
                        <div className='w-full border py-2 mt-2 px-2'>
                            <DatePicker
                                className='calender'
                                selected={saleEnd} onChange={(date: Date) => setSaleEnd(date)} />
                        </div>

                    </Label>
                    <Label className="mt-4" style={{ width: "100%" }}>
                        <span>Sale Slider Image</span>
                        <Label className="mt-1  ">
                            <div className='block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>

                                <input
                                    name="image"
                                    type='file'
                                    onChange={(e) => onFileSelect(e.target.files[0])}
                                />
                            </div>
                        </Label>
                    </Label>
                    <Label className="w-full mt-4">
                        <span>Discription (optional)</span>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1" rows="6" placeholder="Enter description for sale if you want" />
                    </Label>
                    <div className="w-full mt-4 mb-4">
                        <Button
                            onClick={() => createSale()}
                            block>Create Sale</Button>
                    </div>
                </div>
            </div>

            {/* Modal */}

            <Modal style={{ width: '100%' }} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalBody className='px-4 py-2'>
                    <div style={{ width: "60%", margin: "auto" }}>
                        <p style={{ textAlign: "center" }} className='text-xl font-semibold text-gray-700 dark:text-gray-200'>
                            Are you want to delete all discounts when user want coupen discount?
                        </p>
                    </div>
                    <div style={{ width: "100%", display: "flex", marginTop: 20, justifyContent: "space-around", flexWrap: "wrap" }}>
                        <div className='w-40 mt-3'>
                            <Button
                                onClick={() => {
                                    confirm("true")
                                    setIsModalOpen(false)
                                }}
                                block>
                                Yes
                            </Button>
                        </div>
                        <div
                            onClick={() => {
                                confirm("false")
                                setIsModalOpen(false)
                            }}
                            className='w-40 mt-3'>
                            <Button block>
                                No
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>


            {/* Modal */}

        </>
    )
}

export default NewProduct
