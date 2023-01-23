import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../config/api'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
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
  ModalBody
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import OrderTableRow from '../../components/orderTableRow'

import response from '../../utils/demo/tableData'
import { useHistory } from 'react-router-dom'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Cards() {
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  const [orders, setOrders] = useState([])
  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])



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

  const getOrders = () => {
    axios.get(`${API}/admin/orders/get`)
      .then((response) => {
        setOrders(response.data)
        window.localStorage.setItem('ecommerce_orders',response.data.length)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getOrders()

  }, [])



  const deleteOrder = (id) => {
    axios.delete(`${API}/admin/order/delete/${id}`)
      .then((response) => {
        alert("Order Deleted")
        getOrders()
      })

  }
  const history = useHistory()


  return (
    <>
      <PageTitle>All Orders</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Costumer Name & City</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell style={{ textAlign: "center" }}>Amount</TableCell>
              <TableCell style={{ textAlign: "center" }}>Order No.</TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }}>Payment</TableCell>
              <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {orders.map((v, i) => {

              return (
                <OrderTableRow
                  onEyeClick={() => history.push(`/app/orderDetail/${v._id}`)}
                  deleteOrder={() => deleteOrder(v._id)}
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





    </>
  )
}

export default Cards
