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
import response from '../../../utils/demo/tableData'
import { useHistory } from 'react-router-dom'
import { Alert } from 'bootstrap';
// make a copy of the data, for the second table
const response2 = response.concat([])

function Cards() {
  const [currentProduct, setCurrentProduct] = useState("")
  const history = useHistory()
  const [categorires, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])
  const getCategory = () => {
    axios.get(`${API}/category/get`)
      .then((response) => {
        setCategories(response.data)

      })

  }
  useEffect(() => {
    getCategory()
  }, [])
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

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  const getProducts = () => {
    axios.get(`${API}/products/get`)
      .then((response) => {
        setProducts(response.data)
      })
  }


  const getProductByCategory = (id) => {
    if (id === "all") {
      getProducts()
    } else {
      axios.get(`${API}/product/get/category/${id}`)
        .then((response) => {
          setProducts(response.data)

        })
    }
  }

  useEffect(() => {
    getProducts()

  }, [])



  const deleteProduct = () => {
    axios.delete(`${API}/admin/delete-product/${currentProduct}`)
      .then((response) => {
        alert("Product Deleted")
        getProducts()
      })
  }


  const selectAll = () => {
    if (!checked) {
      var selectedProduct = []
      for (var i = 0; i < products.length; i++) {
        selectedProduct.push(products[i]._id)
        setSelectedProducts(selectedProduct)
      }
      setChecked(true)
    } else {
      setSelectedProducts([])
      setChecked(false)
    }

  }
  const deleteSelected = () => {
    const form = {
      products: selectedProducts
    }
      axios.post(`${API}/admin/delete/products/multi`, form)
        .then((res) => {
          console.log(res.data)
          Alert(res.data)
          getProducts()
          setSelectedProducts([])
        })
    
  }


  useEffect(()=>{
    if(selectedProducts.length === products.length){
      setChecked(true)
    }else{
      setChecked(false)
    }
  },[selectedProducts,products])

  console.log("selected",selectedProducts)

  return (
    <>
      <div className='w-full flex my-5'>
        <div style={{ width: "50%" }}>
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">All Products</h1>
        </div>
        <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
          {selectedProducts.length > 0 ? <Button
            onClick={deleteSelected}
            className='mx-3'>
            Delete
          </Button> : null}
          <Select
            onChange={(e) => getProductByCategory(e.target.value)}
            style={{ width: "40%", marginRight: 20 }}
            className="mt-1">
            <option value="all">All</option>
            {categorires?.map((v, i) => {
              return (
                <option value={v._id}>{v.name}</option>
              )
            })}
          </Select>
          <Button
            onClick={() => history.push("/app/new-product")}
          >
            + Add New
          </Button>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <div className='px-2 py-6 flex ' style={{ justifyContent: "center" }}>
                <div
                  className={checked ? 'bg-purple-600' : null}
                  onClick={selectAll}
                  style={{ width: 18, height: 18, borderWidth: .5, borderColor: "gray" }}>
                  {checked ? <BsCheck2
                    size={15}
                    color="white"
                  /> : null}
                </div>
              </div>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell style={{ textAlign: "center" }}>Reviews</TableCell>
              <TableCell style={{ textAlign: "center" }}>Stock</TableCell>
              <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {products.map((v, i) => {

              return (
                <ProductTableRow
                  deleteProduct={() => {
                    setCurrentProduct(v._id)
                    setIsModalOpen(true)
                  }}
                  setSelectedProducts={setSelectedProducts}
                  selectedProducts={selectedProducts}
                  data={v}
                  index={i}
                />
              )
            })}
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


      {/* Modal */}

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
      </Modal>


      {/* Modal */}


    </>
  )
}

export default Cards
