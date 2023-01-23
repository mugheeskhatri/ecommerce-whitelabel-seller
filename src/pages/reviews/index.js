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
  
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import ReviewtableRow from '../../components/reiewTableRow'
import response from '../../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])


function Cards() {
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  const [reviews, setReviews] = useState([])
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

  const getReviews = () => {
    axios.get(`${API}/review/get`)
      .then((response) => {
        setReviews(response.data)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getReviews()

  }, [])



  const deleteReview = (id) => {
    axios.delete(`${API}/review/delete/${id}`)
      .then((response) => {
        alert("Review Deleted")
        getReviews()
      })
  }


  return (
    <>
      <PageTitle>All Reviews</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>User Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell style={{ textAlign: "center" }}>Stars</TableCell>
              <TableCell style={{ textAlign: "center" }}>Date</TableCell>
              <TableCell style={{justifyContent:"flex-end"}} className="flex">Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {reviews.map((v, i) => {

              return (
                <ReviewtableRow
                deleteReview={() => deleteReview(v._id)}
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
