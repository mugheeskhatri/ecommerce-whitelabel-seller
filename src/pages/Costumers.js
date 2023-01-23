import React, { useState, useEffect } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
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
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/tableData'
import axios from 'axios'
import { API } from '../config/api'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Cards() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", , "July", "Aug", "Sep", "Oct", "Nov", "Dec"]


  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  const [users , setUsers] = useState([])
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


  useEffect(() => {
    axios.get(`${API}/user/get-users/all`)
      .then((res) => {
        console.log(res.data)
        setUsers(res.data)
      })
  }, [])




  return (
    <>

      <PageTitle>All Costumers</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell style={{textAlign:"center"}}>Phone</TableCell>
              <TableCell style={{textAlign:"center"}}>Orders</TableCell>
              <TableCell style={{textAlign:"center"}}>Order Amount</TableCell>
              <TableCell style={{textAlign:"center"}}>Join Date</TableCell>
              <TableCell style={{ display: "flex", justifyContent: "flex-end" }}>Actions</TableCell>            </tr>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => {
              const date = new Date()
             return (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar className="hidden mr-3 md:block" src={user.image} alt="User avatar" />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell style={{textAlign:"center"}}>
                    <span className="text-xs">{user.phone}</span>
                  </TableCell>
                  <TableCell style={{textAlign:"center"}}>
                    <span>{user.orders.length}</span>
                  </TableCell>
                  <TableCell style={{textAlign:"center"}}>
                    <span>{user.orders.length}</span>
                  </TableCell>
                  <TableCell style={{textAlign:"center"}}>
                    <span className="text-xs">{`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</span>
                  </TableCell>
                  <TableCell >
                      <div style={{justifyContent:"flex-end"}} className="flex space-x-2">
                          <Button layout="link" size="icon" aria-label="Edit">
                              <AiOutlineEye size={18} className=" text-gray-600 dark:text-gray-400" />
                          </Button>
                          <Button layout="link" size="icon" aria-label="Edit">
                              <AiOutlineEdit size={18} className=" text-gray-600 dark:text-gray-400" />
                          </Button>
                          <Button
                              // onClick={props.deleteProduct}
                              layout="link" size="icon" aria-label="Delete">
                              <AiOutlineDelete size={17} className=" text-gray-600 dark:text-gray-400" />
                          </Button>
                      </div>
                  </TableCell>
                </TableRow>
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
