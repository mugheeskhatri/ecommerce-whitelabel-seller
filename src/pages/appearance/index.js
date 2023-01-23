


import React, { useState, useEffect } from 'react'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { Button } from '@windmill/react-ui'
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { API, cloudinaryAPI, cloud_name } from '../../config/api'

import { borderRadius } from '@mui/system';


function NewProduct() {


    const [contrastBackgroundColor, setContrastBackgroundColor] = useState("")
    const [primaryLightColor, setPrimaryLightColor] = useState("")
    const [logo, setLogo] = useState("")
    const [currency, setCurrency] = useState("Rs")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [primaryColor, setPrimaryColor] = useState("")
    const [secondaryColor, setSecondaryColor] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [appName, setAppName] = useState("")
    const [appTagline, setAppTagline] = useState("")


    const curerncies = [
        {
            name: "Rupees",
            key: "Rs"
        },
        {
            name: "Dollar",
            key: "$"
        },
        {
            name: "Riyal",
            key: "Rl"
        },
        {
            name: "Dirhum",
            key: "AED"
        },
    ]

    const [sliderImages, setSliderImages] = useState([
        {
            src: ""
        }
    ])

    useEffect(() => {
        console.log("mughees")
        axios.get(`${API}/admin/appearance/get`)
            .then((response) => {
                if (response.data.length !== 0) {
                    setBackgroundColor(response.data.backgroundColor)
                    setPrimaryColor(response.data.primaryColor)
                    setSecondaryColor(response.data.secondaryColor)
                    setLogo(response.data.logo)
                    setSliderImages(response.data.sliderImages)
                    setContrastBackgroundColor(response.data.contrastBackgroundColor)
                    setCurrency(response.data.currency)
                    setPrimaryLightColor(response.data.primaryLightColor)
                    setAppName(response.data.appName)
                    setAppTagline(response.data.appTagline)
                }
            })

    }, [])

    const addColor = () => {
        const colors = [...sliderImages, {
            src: "",
        }]
        setSliderImages(colors)
    }


    const minusColorInput = (i) => {
        const list = [...sliderImages];
        list.splice(i, 1);
        setSliderImages(list);
    }


    const onFileSelect = async (file) => {
        let form = new FormData()
        form.append("image", file)
        axios.post(`${API}/upload`, form)
            .then((res) => {
                setLogo(res.data.url)
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }




    const onFileColorSelect = async (file, index) => {

        let form = new FormData()
        form.append("image", file)
        axios.post(`${API}/upload`, form)
            .then((res) => {
                const list = [...sliderImages];
                list[index].src = res.data.secure_url;
                setSliderImages(list);
            })
            .catch((e) => {
                console.log("Err", e)
            })
    }

    const saveChanges = () => {
        const form = {
            backgroundColor,
            secondaryColor,
            primaryColor,
            sliderImages,
            logo,
            contrastBackgroundColor,
            primaryLightColor,
            currency,
            appName,
            appTagline
        }
        axios.post(`${API}/admin/appearance/create-update`, form)
            .then((response) => {
                alert(response.data)
            })
    }



    return (
        <div>
            <PageTitle>Appearance</PageTitle>
            <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                App name and Tagline :
            </p>
            <div className='inputContainer'>
                <Label className="product_input mt-4">
                    <span>Application Name:<span style={{ fontSize: 11, color: "gray" }}> Basic backgrounds like cards etc</span></span>
                    <div className='w-full flex'>
                        <Input
                            value={appName}
                            onChange={(e) => setAppName(e.target.value)}
                            className="mt-1" />
                    </div>
                </Label>
                <Label className="product_input mt-4">
                    <span>Application Tagline:<span style={{ fontSize: 11, color: "gray" }}> Basic backgrounds like cards etc</span></span>
                    <div className='w-full flex'>
                        <Input
                            value={appTagline}
                            onChange={(e) => setAppTagline(e.target.value)}
                            className="mt-1" />
                    </div>
                </Label>
            </div>


            <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Logo : <span className='text-sm text-gray-700 dark:text-gray-200'>(Recommended size : 512px x 512px)</span>
            </p>
            <Label className="mt-4 ">
                <div className='block w-full text-xm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>

                    <input
                        name="image"
                        type='file'
                        onChange={(e) => onFileSelect(e.target.files[0])}
                    />
                </div>
            </Label>
            <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Images For Slider :
            </p>
            <div className='mt-3' style={{ width: "100%", paddingBottom: 5 }}>
                <div style={{ width: "100%", display: "flex", }}>
                    <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
                        <h1 className='text-xm text-gray-700 dark:text-gray-200'>Slider Image ( Recommended Size)</h1>
                    </div>
                    <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>

                        <Button
                            onClick={() => addColor()}
                        >+ Add Image</Button>
                    </div>
                </div>

                {sliderImages?.map((v, i) => {
                    return (
                        < div
                            key={i}
                            style={{ padding: 2 }}
                            className='flex' >
                            <div
                                style={{ width: "80%" }}
                                className='block text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>

                                <input
                                    name="image"
                                    type='file'
                                    onChange={(e) => onFileColorSelect(e.target.files[0], i)}
                                />
                            </div>
                            {sliderImages.length > 1 ? <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                                <button
                                    className='iconbtn'
                                    style={{ padding: 5, }}
                                    onClick={() => minusColorInput(i)}
                                >
                                    <AiOutlineDelete size={20} color="gray"

                                    />
                                </button>
                            </div> : null}
                        </div>
                    )
                })}
            </div>


            <div className='flex mt-4 mb-4'>
                <div>
                    <p className='mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                        Logo Preview
                    </p>
                    <div className='mt-4' style={{ width: 150, height: 150, borderWidth: 1, borderColor: "gray", borderRadius: 12 }}>
                        <img
                            style={{ width: "100%", height: "100%", borderRadius: 12 }}
                            src={logo}
                        />
                    </div>
                </div>
            </div>

            <div className=' mt-4 mb-4'>
                <p className='mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                    Slider Preview
                </p>
                <div className='inputContainer'>
                    {sliderImages.map((v, i) => {
                        return (
                            <div className='mt-4' style={{ width: 220, height: 150, marginLeft: 10, borderWidth: 1, borderColor: "gray", borderRadius: 12 }}>
                                <img
                                    style={{ width: "100%", height: "100%", borderRadius: 12 }}
                                    src={v.src}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Colors :
            </p>
            <div className='inputContainer'>
                <Label className="product_input mt-4">
                    <span>Background Color</span>
                    <div className='w-full flex'>
                        <div
                            style={{ width: "60%" }}
                        >
                            <Input
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="mt-1" />
                        </div>
                        <div className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" style={{ backgroundColor: backgroundColor, width: "38%", marginLeft: "2%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Sample
                        </div>
                    </div>
                </Label>
                <Label className="product_input mt-4">
                    <span>Contrast Background Color</span>
                    <div className='w-full flex'>
                        <div
                            style={{ width: "60%" }}
                        >
                            <Input
                                value={contrastBackgroundColor}
                                onChange={(e) => setContrastBackgroundColor(e.target.value)}
                                className="mt-1" />
                        </div>
                        <div className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" style={{ backgroundColor: backgroundColor, width: "38%", marginLeft: "2%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Sample
                        </div>
                    </div>
                </Label>

                <Label className="product_input mt-4">
                    <span>Primary Color:<span style={{ fontSize: 11, color: "gray" }}> Basic backgrounds like cards etc</span></span>
                    <div className='w-full flex'>
                        <div
                            style={{ width: "60%" }}
                        >
                            <Input
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="mt-1" />
                        </div>
                        <div className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" style={{ backgroundColor: primaryColor, width: "38%", marginLeft: "2%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Sample
                        </div>
                    </div>
                </Label>
                <Label className="product_input mt-4">
                    <span>Primary Light Color:<span style={{ fontSize: 11, color: "gray" }}> Basic backgrounds like cards etc</span></span>
                    <div className='w-full flex'>
                        <div
                            style={{ width: "60%" }}
                        >
                            <Input
                                value={primaryLightColor}
                                onChange={(e) => setPrimaryLightColor(e.target.value)}
                                className="mt-1" />
                        </div>
                        <div className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" style={{ backgroundColor: primaryLightColor, width: "38%", marginLeft: "2%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Sample
                        </div>
                    </div>
                </Label>

                <Label className="product_input mt-4">
                    <span>Secondary Color:<span style={{ fontSize: 11, color: "gray" }}> Like Buttons etc</span></span>
                    <div className='w-full flex'>
                        <div
                            style={{ width: "60%" }}
                        >
                            <Input

                                value={secondaryColor}
                                onChange={(e) => setSecondaryColor(e.target.value)}
                                className="mt-1" />
                        </div>
                        <div className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" style={{ backgroundColor: secondaryColor, width: "38%", marginLeft: "2%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Sample
                        </div>
                    </div>
                </Label>



                <Label
                    value={currency}
                    onChange={(e) => setCurrency(e.target.name)}
                    className=" product_input mt-4">
                    <span>Currency</span>
                    <Select className="mt-1">
                        {curerncies?.map((v, i) => {
                            return (
                                <option
                                    name={v.key}
                                    key={i}
                                >{v.name}</option>
                            )
                        })}
                    </Select>
                </Label>

            </div>




            <div>

                <div
                    onClick={() => saveChanges()}
                    className="w-full mt-4 mb-4">
                    <Button
                        block>Save Changes</Button>
                </div>

            </div>
        </div>
    )
}

export default NewProduct
