import React, { useState, useEffect } from 'react'
import { Input, HelperText, Label, Textarea } from '@windmill/react-ui'
import PageTitle from '../../../components/Typography/PageTitle'
import { Button } from '@windmill/react-ui'
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { API, cloudinaryAPI, cloud_name } from '../../../config/api'
import Select from 'react-select'
import { useParams } from 'react-router-dom';


function NewProduct() {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [name, setName] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [productId, setProductId] = useState("")
  const [regularPrice, setRegularPrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [stock, setStock] = useState("")
  const [material, setMaterial] = useState([{
    materialName: "",
    element: ""
  }])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [materials, setMaterials] = useState([])
  const params = useParams()
  const [differentSizes, setDifferentSizes] = useState("")
  const [differentColors, setDifferentColors] = useState("")
  const [productImage, setProductImage] = useState([{
    src: ""
  }])
  const [categoryList, setCategoryList] = useState([])
  const [differentMaterial, setDifferentMaterial] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [sizeAttributes, setSizeAttributes] = useState([{
    size: "",
    price: ""
  }])
  const [colorAttributes, setColorAttributes] = useState([
    {
      colorName: "",
      colorCode: "",
      image: ""
    }
  ])

  useEffect(() => {
    axios.get(`${API}/admin/attributes/get`)
      .then((res) => {
        var data = []
        console.log("Data", res.data[0].sizes)
        for (var i = 0; i < res.data[0].sizes.length; i++) {
          data.push({ label: res.data[0].sizes[i].name, value: res.data[0].sizes[i].name })
          setSizes(data)
        }
      })
  }, [])



  useEffect(() => {
    axios.get(`${API}/category/get`)
      .then((response) => {
        response.data.map((v) => {
          const data = categoryList
          data.unshift({ label: v.name, value: v._id })
          setCategoryList(data)
        })
      })

  }, [])


  const addColor = () => {
    const colors = [...colorAttributes, {
      colorName: "",
      colorCode: "",
      image: ""
    }]
    setColorAttributes(colors)
  }


  const minusColorInput = (i) => {
    const list = [...colorAttributes];
    list.splice(i, 1);
    setColorAttributes(list);
  }

  const [selectedCategory, setSelectedCategory] = useState()

  const addSize = () => {
    const size = [...sizeAttributes, {
      size: "",
      price: ""
    }]
    setSizeAttributes(size)
  }

  const minusSizeInput = (i) => {
    const list = [...sizeAttributes];
    list.splice(i, 1);
    setSizeAttributes(list);
  }

  const addMaterial = () => {
    const size = [...material, {
      materialName: "",
      element: ""
    }]
    setMaterial(size)
  }

  const minusMaterial = (i) => {
    const list = [...material];
    list.splice(i, 1);
    setMaterial(list);
  }
  const minusImage = (i) => {
    const list = [...productImage];
    list.splice(i, 1);
    setProductImage(list);
  }


  const chanegDifferentSizeInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizeAttributes];
    list[index][name] = value;
    setSizeAttributes(list);
  }

  const chanegDifferentColorsInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...colorAttributes];
    list[index][name] = value;
    setColorAttributes(list);
  }


  const changeDifferentMaterialInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...material];
    list[index][name] = value;
    setMaterial(list);
  }


  const addProductImage = () => {
    const image = [...productImage, {
      src: "",
    }]
    setProductImage(image)
  }



  const editProduct = () => {
    if (name === undefined | name.length == 0) {
      alert("Please Enter Product Name")
    } else if (salePrice === undefined || salePrice.length == 0) {
      alert("Please Enter Sale Price")
    } else if (stock === undefined || stock.length == 0) {
      alert("Please Enter Stock Details")
    } else {

      const form = {
        name,
        shortDescription,
        longDescription,
        stock,
        regularPrice,
        salePrice,
        categoryId,
        differentSizes,
        differentColors,
        colorAttributes,
        sizeAttributes,
        material,
        image: productImage
      }
      axios.post(`${API}/admin/edit-product/${productId}`, form)
        .then((res) => {
          alert(res.data)
        })
    }

  }

  useEffect(() => {
    axios.get(`${API}/product/get/single/${params.id}`)
      .then((response) => {
        setName(response.data.name)
        setShortDescription(response.data.shortDescription)
        setLongDescription(response.data.longDescription)
        setDifferentColors(response.data.differentColors)
        setDifferentSizes(response.data.differentSizes)
        setColorAttributes(response.data.colorAttributes)
        setSizeAttributes(response.data.sizeAttributes)
        setRegularPrice(response.data.regularPrice)
        setSalePrice(response.data.salePrice)
        setStock(response.data.stock)
        setProductId(response.data._id)
        setDifferentMaterial(response.data.differentMaterial)
        if (response.data.categoryId !== null && response.data.categoryId !== undefined && response.data.categoryId !== "" && response.data.categoryId !== "null")
          axios.get(`${API}/category/get/single/${response.data.categoryId}`)
            .then((res) => {
              setSelectedCategory({ label: res.data.name, value: res.data._id })
            })
      })

  }, [])
  console.log(differentSizes, "sizes")
  const onFileSizeSelect = async (file, index) => {

    let form = new FormData()
    form.append("image", file)
    axios.post(`${API}/upload`, form)
      .then((res) => {
        const list = [...sizeAttributes];
        list[index].chartImage = res.data.secure_url;
        setSizeAttributes(list);
        console.log(sizeAttributes)
      })
      .catch((e) => {
        console.log("Err", e)
      })
  }


  useEffect(() => {
    axios.get(`${API}/category/get`)
      .then((response) => {
        response.data.map((v) => {
          const data = categoryList
          data.unshift({ label: v.name, value: v._id })
          setCategoryList(data)
        })
      })

  }, [])
  const onFileSelect = async (file, index) => {

    let form = new FormData()
    form.append("image", file)
    axios.post(`${API}/upload`, form)
      .then((res) => {
        const list = [...productImage];
        list[index].src = res.data.secure_url;
        setProductImage(list);
      })
      .catch((e) => {
        console.log("Err", e)
      })
  }
  console.log("differentmaterial", differentMaterial)
  const onFileColorSelect = async (file, index) => {

    let form = new FormData()
    form.append("image", file)
    axios.post(`${API}/upload`, form)
      .then((res) => {
        const list = [...colorAttributes];
        list[index].src = res.data.secure_url;
        setColorAttributes(list);
      })
      .catch((e) => {
        console.log("Err", e)
      })
  }
  console.log(categoryId)


  return (
    <>
      <PageTitle>Add New Product</PageTitle>
      <div className='inputContainer'>

        <Label className="product_input mt-4">
          <span>Product Title</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1" />

        </Label>
        <Label className="product_input mt-4">
          <span>Short Description</span>
          <Input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="mt-1" />
        </Label>
        <Label className="mt-4 product_input">
          <span>Reglar Price</span>
          <Input
            type="number"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
            className="mt-1" />
        </Label>
        <Label className="mt-4 product_input">
          <span>Sale Price</span>
          <Input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            className="mt-1" />
        </Label>
        <Label className="mt-4 product_input">
          <span>Stock</span>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1" />
        </Label>
        {selectedCategory ? <Label

          className=" product_input mt-4">
          <span>Categories</span>
          <Select
            defaultValue={{ label: selectedCategory.label, value: selectedCategory?.value }}
            onChange={(e) => setCategoryId(e.value)}
            options={categoryList} />
        </Label> : null}
        <Label className=" product_input mt-4">
          <span>Different Colors</span>
          <Select
            defaultValue={{ label: differentColors, value: differentColors }}
            onChange={(e) => setDifferentColors(e.value)}
            options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} >
          </Select>
        </Label>
        <Label className=" product_input mt-4">
          <span>Different Sizes ?</span>
          <Select
            defaultValue={{ label: differentSizes, value: differentSizes }}
            onChange={(e) => setDifferentSizes(e.value)}
            options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} >
          </Select>
        </Label>
        <Label className=" product_input mt-4">
          <span>Different Material ?</span>
          <Select
            defaultValue={{ label: differentMaterial, value: differentMaterial }}
            onChange={(e) => setDifferentMaterial(e.value)}
            options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} >
          </Select>
        </Label>
      </div>


      {/* different Colors */}


      {differentColors === "Yes" ?
        <div style={{ width: "100%", borderBottomColor: "gray", borderBottomWidth: .5, paddingBottom: 5 }}>
          <div style={{ width: "100%", display: "flex", borderTopColor: "gray", borderTopWidth: .5, marginTop: 15, paddingTop: 10, paddingBottom: 10, }}>
            <div style={{ width: "50%", }}>
              <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Color Details</h1>
            </div>
            <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>

              <Button
                onClick={() => addColor()}
              >+ Add Color</Button>
            </div>
          </div>

          {colorAttributes.map((v, i) => {
            return (
              < div className='inputContainer ' >
                <Label className="mt-4 product_input_33">
                  <span>Color Name</span>
                  <Input
                    name="colorName"
                    value={colorAttributes[i].colorName}
                    onChange={(e) => chanegDifferentColorsInput(e, i)}
                    className="mt-1" />
                </Label>
                <Label className="mt-4 product_input_33">
                  <span>Color Code</span>
                  <Input
                    name="colorCode"
                    value={colorAttributes[i].colorCode}
                    onChange={(e) => chanegDifferentColorsInput(e, i)}
                    className="mt-1" />
                </Label>
                <Label className="mt-4 product_input_33">
                  <span>Color Product Image</span>
                  <Label className="mt-4 ">
                    <div className='block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>

                      <input
                        name='image'
                        type="file"
                        onChange={(e) => onFileColorSelect(e.target.files[0], i)}
                      />
                    </div>
                  </Label>
                </Label>
                {colorAttributes.length > 1 ? <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                  <button
                    className='iconbtn'
                    style={{ padding: 5 }}
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
        : null}


      {/* different Colors */}





      {/* different Sizes */}


      {differentSizes === "Yes" ?
        <div style={{ width: "100%", borderBottomColor: "gray", borderBottomWidth: .5, paddingBottom: 5 }}>
          <div style={{ width: "100%", display: "flex", borderTopColor: "gray", borderTopWidth: .5, marginTop: 15, paddingTop: 10, paddingBottom: 10, }}>
            <div style={{ width: "50%", }}>
              <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Size Details</h1>
            </div>
            <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>

              <Button
                onClick={() => addSize()}
              >+ Add Size</Button>
            </div>
          </div>

          {sizeAttributes.map((v, i) => {
            return (
              < div className='inputContainer ' >
                <Label className="mt-4 product_input_33">
                  <span>Size</span>
                  <Select
                    className='block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'
                    defaultValue={{ label: sizeAttributes[i].size, value: sizeAttributes[i].size }}
                    onChange={(e) => {
                      const list = [...sizeAttributes];
                      list[i].size = e.value;
                      setSizeAttributes(list);
                    }}
                    options={sizes} >
                  </Select>
                </Label>
                <Label className="mt-4 product_input_33">
                  <span>Price of this size</span>
                  <Input
                    type="number"
                    name="price"
                    value={sizeAttributes[i].price}
                    onChange={(e) => chanegDifferentSizeInput(e, i)}
                    className="mt-1" />
                </Label>
                <Label className="mt-4 product_input_33">
                  <span>Size Chart Image</span>
                  <div className='block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>

                    <input
                      type='file'
                      name="image"
                      onChange={(e) => onFileSizeSelect(e.target.files[0], i)}
                    />
                  </div>
                </Label>
                {sizeAttributes.length > 1 ? <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                  <button
                    className='iconbtn'
                    style={{ padding: 5 }}
                    onClick={() => minusSizeInput(i)}
                  >
                    <AiOutlineDelete size={20} color="gray"

                    />
                  </button>
                </div> : null}
              </div>
            )
          })}
        </div>
        : null}


      {/* different Sizes */}


      {/* different material */}


      {differentMaterial === "Yes" ?
        <div style={{ width: "100%", borderBottomColor: "gray", borderBottomWidth: .5, paddingBottom: 5 }}>
          <div style={{ width: "100%", display: "flex", borderTopColor: "gray", borderTopWidth: .5, marginTop: 15, paddingTop: 10, paddingBottom: 10, }}>
            <div style={{ width: "50%", }}>
              <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Material Details</h1>
            </div>
            <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>

              <Button
                onClick={() => addMaterial()}
              >+ Add Material</Button>
            </div>
          </div>

          {material.map((v, i) => {
            return (
              < div className='inputContainer ' >
                <Label className="mt-4 product_input">
                  <span>Material</span>
                  <Input
                    name="materialName"
                    value={material[i].materialName}
                    onChange={(e) => changeDifferentMaterialInput(e, i)}
                    className="mt-1" />
                </Label>
                <Label className="mt-4 product_input">
                  <span>Element</span>
                  <Input
                    name="element"
                    value={material[i].element}
                    onChange={(e) => changeDifferentMaterialInput(e, i)}
                    className="mt-1" />
                </Label>

                {material.length > 1 ? <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                  <button
                    className='iconbtn'
                    style={{ padding: 5 }}
                    onClick={() => minusMaterial(i)}
                  >
                    <AiOutlineDelete size={20} color="gray"

                    />
                  </button>
                </div> : null}
              </div>
            )
          })}
        </div>
        : null}


      {/* different Material */}






      <div className='mt-3' style={{ width: "100%", paddingBottom: 5 }}>
        <div style={{ width: "100%", display: "flex", }}>
          <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
            <h1 className='text-xm text-gray-700 dark:text-gray-200'>Product Image ( Recommended Size)</h1>
          </div>
          <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>

            <Button
              onClick={() => addProductImage()}
            >+ Add Image</Button>
          </div>
        </div>

        {productImage.map((v, i) => {
          return (
            < div className='flex' >
              <Label style={{ width: "90%" }} className={i > 0 ? "mt-4" : ""}>
                <Label className="mt-4 ">
                  <div className='block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1'>

                    <input
                      type="file"
                      name="image"
                      onChange={(e) => onFileSelect(e.target.files[0], i)}
                    />
                  </div>
                </Label>
              </Label>
              {productImage.length > 1 ? <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                <button
                  className='iconbtn'
                  style={{ padding: 5, marginLeft: 10 }}
                  onClick={() => minusImage(i)}
                >
                  <AiOutlineDelete size={20} color="gray"

                  />
                </button>
              </div> : null}
            </div>
          )
        })}
      </div>



      <Label className="mt-4">
        <span>Discription</span>
        <Textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="mt-1" rows="6" placeholder="Enter some long form content." />
      </Label>
      <div className="mt-4 mb-4">
        <Button
          onClick={() => editProduct()}
          block>Edit Product</Button>
      </div>
    </>
  )
}

export default NewProduct
