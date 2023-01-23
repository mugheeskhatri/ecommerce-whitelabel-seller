import React, { useState, useEffect } from 'react'
import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'
import { app, realtimedb } from '../config/firebase'
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import axios from 'axios'
import { API } from '../config/api'

// import {
//   doughnutOptions,
//   lineOptions,
//   doughnutLegends,
//   lineLegends,
// } from '../utils/demo/chartsData'

function Dashboard() {
  const state = useSelector(state => state)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [cancelledOrders, setCancelledOrders] = useState(0)
  const [page, setPage] = useState(1)
  const [totalSales, setTotalSales] = useState(0)
  const [data, setData] = useState([])
  const [user, setUser] = useState()
  const [name, setName] = useState()
  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])
  useEffect(() => {
    axios.get(`${API}/user/get-users/all`)
      .then((res) => {
        setTotalUsers(res.data.length)
      })
    axios.get(`${API}/admin/orders/get`)
      .then((res) => {
        setTotalOrders(res.data.length)
        res.data.map((v) => {
          var amount = totalSales
          amount += (Number(v.deliveryCharge) + Number(v.netAmount))
          setTotalSales(amount)
        })

      })
    axios.get(`${API}/admin/order/get/cancelled`)
      .then((res) => {
        setCancelledOrders(res.data.length)
      })
  }, [])

  useEffect(() => {
    user ?
      setName(user.userName) : setName("")
  }, [name])
  console.log(name)
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Users" value={totalUsers}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Orders" value={totalOrders}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Sales" value={totalSales}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Cancelled Orders" value={cancelledOrders}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Dashboard</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>


    </>
  )
}

export default Dashboard
