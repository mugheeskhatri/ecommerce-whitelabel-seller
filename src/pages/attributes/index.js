


import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import axios from 'axios';
import { API, cloudinaryAPI, cloud_name } from '../../config/api'
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
    Input,
    Select
} from '@windmill/react-ui'
import { borderRadius } from '@mui/system';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineCheck } from 'react-icons/ai';

function Index() {

    const [sizeModal, setSizeModal] = useState(false)
    const [colorModal, setColorModal] = useState(false)
    const [sizes, setSizes] = useState([

    ])
    const [materials, setMaterials] = useState([])
    const [colors, setColors] = useState([

    ])

    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [colorCode, setColorCode] = useState("")


    useEffect(() => {
        axios.get(`${API}/admin/attributes/get`)
            .then((res) => {
                if (res.data.length > 0) {
                    setColors(res.data[0].colors)
                    setMaterials(res.data[0].materials)
                    setSizes(res.data[0].sizes)
                }
                console.log("Atruibute", res.data[0].colors)
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }, [])


    const saveChanges = () => {
        const form = {
            sizes,
            colors,
            materials
        }

        axios.post(`${API}/admin/attributes/add`, form)
            .then((res) => {
                console.log(res.data)
            })

    }




    return (
        <div>
            <PageTitle>Attributes</PageTitle>
            <div className='inputContainer'>
                <div className='product_input'>
                    <div className='flex'>
                        <div style={{ width: "50%" }}>
                            <p className="my-6 text-md font-semibold text-gray-700 dark:text-gray-200">
                                Size Attributes
                            </p>
                        </div>
                        <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            <Button
                                onClick={() => setSizeModal(true)}
                            >
                                + Add Size
                            </Button>
                        </div>
                    </div>
                    <TableContainer
                        className="mb-8 ">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell className="w-50">Size</TableCell>
                                    <TableCell style={{ width: "50%", textAlign: "end" }}>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {sizes.map((v, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell className="w-50 font-semibold text-md text-gray-500 dark:text-gray-400">{v.name}</TableCell>
                                            <TableCell style={{ width: "50%", textAlign: "end" }}>
                                                <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "flex-end" }}>
                                                    <AiOutlineEdit
                                                        size={17} className=" text-gray-600 dark:text-gray-400"
                                                    />
                                                    <AiOutlineDelete
                                                        size={17} className=" text-gray-600 mx-2 dark:text-gray-400"
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div
                        // onClick={() => saveChanges()}
                        className="w-full mt-4 mb-4">

                    </div>
                </div>
                <div className='product_input'>
                    <div className='flex'>
                        <div style={{ width: "50%" }}>
                            <p className="my-6 text-md font-semibold text-gray-700 dark:text-gray-200">
                                Color Attributes
                            </p>
                        </div>
                        <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            <Button
                            onClick={()=> setColorModal(true)}
                            >
                                + Add Color
                            </Button>
                        </div>
                    </div>
                    <TableContainer className="mb-8 size_table_container">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>Color</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>Color Code</TableCell>
                                    <TableCell style={{ textAlign: "end" }}>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {colors.map((v, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell className="font-semibold text-md text-gray-500 dark:text-gray-400">{v.name}</TableCell>
                                            <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <div style={{ width: "60%", backgroundColor: v.code, display: "flex", borderRadius: 5, alignItems: "center", justifyContent: "center", padding: 5 }}>{v.code}
                                                </div></TableCell>
                                            <TableCell style={{ textAlign: "end" }}> <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "flex-end" }}>
                                                <AiOutlineEdit
                                                    size={17} className=" text-gray-600 dark:text-gray-400"
                                                />
                                                <AiOutlineDelete
                                                    size={17} className=" text-gray-600 mx-2 dark:text-gray-400"
                                                />
                                            </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div
                        // onClick={() => saveChanges()}
                        className="w-full mt-4 mb-4">

                    </div>
                </div>

            </div>
            {/* Modal */}

            <Modal style={{ width: '100%' }}
                isOpen={sizeModal}
                onClose={() => setSizeModal(false)}>
                <ModalBody className='px-4 py-2'>
                    <div className='w-full flex'>
                        <Input
                            placeholder="Enter Size Name (in 2 characters) : "
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="mt-1" />
                    </div>
                    <div className='w-100 mt-3'>
                        <Button
                            onClick={() => {
                                setSizes([...sizes, { name: size }])
                                setSize("")
                                setSizeModal(false)
                            }}
                            block>
                            Add Size
                        </Button>
                    </div>
                </ModalBody>
            </Modal>


            {/* Modal */}

            {/* Modal */}

            <Modal style={{ width: '100%' }}
                isOpen={colorModal}
                onClose={() => setColorModal(false)}>
                <ModalBody className='px-4 py-2'>
                    <div className='w-full flex'>
                        <Input
                            placeholder="Enter Color Name:"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="mt-1" />
                    </div>
                    <div className='w-full flex mt-3'>
                        <Input
                            placeholder="Enter Color Code:"
                            value={colorCode}
                            onChange={(e) => setColorCode(e.target.value)}
                            className="mt-1" />
                    </div>
                    <div className='w-100 mt-3'>
                        <Button
                            onClick={() => {
                                setColors([...colors,{name:color,code:colorCode}])
                                setColor("")
                                setColorCode("")
                                setColorModal(false)
                            }}
                            block>
                            Add Color
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <Button
                onClick={() => {
                    saveChanges()
                }}
                block>
                Save Changes
            </Button>
            {/* Modal */}
        </div>
    )
}

export default Index

