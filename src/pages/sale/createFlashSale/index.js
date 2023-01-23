


import React, { useState, useEffect } from 'react'
import { Input, HelperText, Label, Textarea } from '@windmill/react-ui'
import PageTitle from '../../../components/Typography/PageTitle'
import { Button } from '@windmill/react-ui'
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { API, cloudinaryAPI, cloud_name } from '../../../config/api'
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";



function NewProduct() {

  const [selected, setSelected] = useState([]);

  const [saleTitle, setTitle] = useState("")
  const [saleType, setSaleType] = useState("Percentage")
  const [products, setProducts] = useState([])
  const [saleCategory, setSaleCategory] = useState(["All"])
  const [salePrice, setSalePrice] = useState("")
  const [saleStart, setSaleStart] = useState(new Date())
  const [description, setDescription] = useState("")
  const [saleEnd, setSaleEnd] = useState(new Date())
  const [saleSlider, setSaleSlider] = useState([{
    src: ""
  }])
  const [categoryList, setCategoryList] = useState([])
  const [categoryId, setCategoryId] = useState("")


  useEffect(() => {
    axios.get(`${API}/products/get`)
      .then((response) => {
        response.data.map((v) => {
          const data = categoryList
          data.unshift({
            label: v.name, value: v._id
          })
          setCategoryList(data)
        })
      })



  }, [])
  console.log(categoryList)

  const addColor = () => {
    const colors = [...saleSlider, {
      src: "",
    }]
    setSaleSlider(colors)
  }


  const minusColorInput = (i) => {
    const list = [...saleSlider];
    list.splice(i, 1);
    setSaleSlider(list);
  }

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
  console.log(selected, "Seleced")


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
    } else if (selected.length === 0) {
      alert("Please Select Items")
    } else {
      const form = {
        title: saleTitle,
        discountType: saleType,
        description,
        sliderImage: saleSlider,
        startDate: saleStart,
        endDate: saleEnd,
        products: selected,
        percentOrAmount: salePrice
      }
      axios.post(`${API}/admin/flashSale/create`, form)
        .then((res) => {
          console.log(res.data)
        })

    }
  }

  console.log(saleStart)
  const onFileColorSelect = async (file, index) => {

    let apiUrl = cloudinaryAPI;

    let form = new FormData()
    form.append("file", file)
    form.append("upload_preset", "saleImage")
    form.append("cloud_name", cloud_name)


    const instance = axios.create()


    const res = await instance.post(
      apiUrl,
      form
    )
      .then((res) => {
        const list = [...saleSlider];
        list[index].src = res.data.secure_url;
        setSaleSlider(list);
      })
      .catch((e) => {
        console.log("Err", e)
      })
  }

  return (
    <>
      <PageTitle>Create Flash Sale</PageTitle>

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
              className="mt-1"
              type="number"
            />
          </Label>
          <Label
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className=" product_input mt-4">
            <span>Products</span>
            <div>
              <Select
                isMulti
                closeMenuOnSelect={false}
                onChange={(e) => setSelected(e)}
                options={categoryList} />
            </div>
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

            {saleSlider?.map((v, i) => {
              return (
                < div
                  key={i}
                  className='flex' >
                  <Label style={{ width: "90%" }} className={i > 0 ? "mt-4" : ""}>
                    <Label className="mt-4 ">

                        <input
                          type="file"
                          onChange={(e) => onFileColorSelect(e.target.files[0], i)}
                        />

                    </Label>
                  </Label>
                  {saleSlider.length > 1 ? <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                    <button
                      className='iconbtn'
                      style={{ padding: 5, marginLeft: 10 }}
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
    </>
  )
}

export default NewProduct
