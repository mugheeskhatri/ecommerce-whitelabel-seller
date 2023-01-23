import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

import { useHistory } from 'react-router-dom'
// make a copy of the data, for the second table
import productNormalCard from '../../assets/img/productNormal.jpeg'
import productImageBoxCard from '../../assets/img/productImageBox.jpeg'
import productLandCard from '../../assets/img/productCardLand.jpeg'

//import cart cards images
import cartNormalCard from '../../assets/img/cartNormalCard.jpeg'
import cartBigCard from '../../assets/img/cartBigCard.jpeg'
import cartSwipeCard from '../../assets/img/cartSwipeCard.jpeg'




function Cards() {


    const [selectedProductCard, setSelectedProductCard] = useState("")
    const [selectedCategoryCard, setSelectedCategoryCard] = useState("")
    const [selectedForm, setSelectedForm] = useState("")
    const [selectedCartCard , setSelectedCartCard] = useState("")
    const [selectedHomeLayout, setSelectedHomelayout] = useState("")
    const [productCard, setProductCard] = useState([
        {
            name: "normal",
            image: productNormalCard
        },
        {
            name: "imageBox",
            image:productImageBoxCard
        },
        {
            name: "landCard",
            image: productLandCard
        },
    ])
    const [cartCard, setCartCard] = useState([
        {
            name: "swipeCard",
            image: cartSwipeCard
        },
        {
            name: "normalCard",
            image: cartNormalCard
        },
        {
            name: "bigCard",
            image: cartBigCard
        },
    ])
    const [categoryCard, setCategoryCard] = useState([
        {
            name: "swipeCard",
            image: cartSwipeCard
        },
        {
            name: "normalCard",
            image: cartNormalCard
        },
        {
            name: "bigCard",
            image: cartBigCard
        },
    ])
    
    const [forms, setForms] = useState([
        {
            name: "box",
            image: "box"
        },
        {
            name: "box",
            image: "box"
        },
        {
            name: "box",
            image: "box"
        },
    ])
    const [homeLayout, setHomeLayout] = useState([
        {
            name: "portait",
            image: "box"
        },
        {
            name: "box",
            image: "box"
        },
        {
            name: "rectangle",
            image: "box"
        },
    ])


    const savechanges = () => {
        const form = {
            productCard: selectedProductCard,
            categoryCard: selectedCategoryCard,
            form: selectedForm,
            homeLayout: selectedHomeLayout
        }

        console.log(form)

    }




    return (
        <>
            <div className='w-full flex my-5'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Application Layout</h1>
                </div>

            </div>

            {/* product card */}

            <div className='w-full'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Product Cards</h1>
                </div>
                <div className='flex_custom mt-3'>
                    {productCard.map((v, i) => {
                        return (
                            <div
                                onClick={() => setSelectedProductCard(v.name)}
                                className='w_33_custom p-1'>
                                <div 
                                     style={{opacity : v.name === selectedProductCard ? .4 : 1}}
                                >
                                    <img 
                                    className='mob'
                                    src={v.image}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* product card */}


            {/* cart card */}

            <div className='w-full mt-4'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Cart Cards</h1>
                </div>
                <div className='flex_custom mt-3'>
                    {cartCard.map((v, i) => {
                        return (
                            <div
                                onClick={() => setSelectedCartCard(v.name)}
                                className='w_33_custom p-1'>
                                <div 
                                     style={{opacity : v.name === selectedCartCard ? .4 : 1}}
                                >
                                    <img 
                                    className='mob'
                                    src={v.image}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            {/* cart card */}



              {/* category card */}

              <div className='w-full mt-4'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Category Cards</h1>
                </div>
                <div className='flex_custom mt-3'>
                    {categoryCard.map((v, i) => {
                        return (
                            <div
                                onClick={() => setSelectedCategoryCard(v.name)}
                                className='w_33_custom p-1'>
                                <div className='mob'
                                     style={{opacity : v.name === selectedCategoryCard ? .4 : 1}}
                                >
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            {/* category card */}


            {/* forms  */}


            <div className='w-full mt-4'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Form Layouts</h1>
                </div>
                <div className='flex_custom mt-3'>
                    {forms.map((v, i) => {
                        return (
                            <div
                                onClick={() => setSelectedForm(v.name)}
                                className='w_33_custom p-1'>
                                <div className='mob'
                                     style={{opacity : v.name === selectedForm ? .4 : 1}}
                                >
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            {/* forms  */}



            {/* home screen Layout */}


            <div className='w-full mt-4'>
                <div style={{ width: "50%" }}>
                    <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Home Screen Layout</h1>
                </div>
                <div className='flex_custom mt-3'>
                    {homeLayout.map((v, i) => {
                        return (
                            <div
                                onClick={() => setSelectedHomelayout(v.name)}
                                className='w_33_custom p-1'
                                
                                >
                                <div
                                style={{opacity : v.name === selectedHomeLayout ? .4 : 1}}
                                className='mob'>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            {/* home screen Layout */}


            <div className='w-full my-4'>
                <Button
                    onClick={() => savechanges()}
                    block>Save Changes</Button>
            </div>

            {/* Modal */}
            {/* 
            <Modal style={{ width: '100%' }} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalBody className='px-4 py-2'>
                    <div style={{ width: "60%", margin: "auto" }}>
                        <p style={{ textAlign: "center" }} className='text-xl font-semibold text-gray-700 dark:text-gray-200'>
                            Are you Sure you want to delete this product from your app?
                        </p>
                    </div>
                    <div style={{ width: "100%", display: "flex", marginTop: 20, justifyContent: "space-around", flexWrap: "wrap" }}>
                        <div className='w-40 mt-3'>
                            <Button
                                onClick={() => {
                                    deleteProduct()
                                    setIsModalOpen(false)
                                }}
                                block>
                                Confirm
                            </Button>
                        </div>
                        <div
                            onClick={() => setIsModalOpen(false)}
                            className='w-40 mt-3'>
                            <Button block>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal> */}


            {/* Modal */}


        </>
    )
}

export default Cards
