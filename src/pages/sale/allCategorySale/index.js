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
import SaleTableRow from '../../../components/saleTableRow'

import response from '../../../utils/demo/tableData'
import { useHistory } from 'react-router-dom'
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
  const [sales, setSales] = useState([])
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

 const getSale = () => {
    axios.get(`${API}/categorySale/get`)
    .then((response)=>{
      setSales(response.data)
    })
 }



  useEffect(() => {
    getSale()

  }, [])



  const deleteProduct = () => {
    axios.delete(`${API}/admin/categorySale/delete/${currentProduct}`)
      .then((response) => {
        alert("Sale Deleted")
        getSale()
      })
  }


  return (
    <>
      <div className='w-full flex my-5'>
        <div style={{ width: "50%" }}>
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">All Sales</h1>
        </div>
        <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
          <Select
            // onChange={(e) => getProductByCategory(e.target.value)}
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
            onClick={() => history.push("/app/categorySale")}
          >
            + Add New
          </Button>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Sale Title</TableCell>
              <TableCell>Sale By</TableCell>
              <TableCell style={{ textAlign: "center" }}>Start Date</TableCell>
              <TableCell style={{ textAlign: "center" }}>End Date</TableCell>
              <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {sales.map((v, i) => {
              return (
                <SaleTableRow
                  deleteProduct={() => {
                    setCurrentProduct(v._id)
                    setIsModalOpen(true)
                  }}
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
              Are you Sure you want to delete this Sale from your app?
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
