import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import { AiOutlineAppstoreAdd  } from 'react-icons/ai';

import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'
import { useHistory } from 'react-router-dom'
import axios from "axios"
import { API } from '../config/api'



function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)
  const history = useHistory()
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [logo, setLogo] = useState("")
  const [orderNotification, setNotificationOrder] = useState(0)
  const [notifications, setNotifications] = useState(0)



  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const logout = () => {
    window.sessionStorage.removeItem('admin_token_for_ecommerce')
    history.push("/")
  }

  useEffect(() => {
    axios.get(`${API}/admin/appearance/get`)
      .then((res) => {
        setLogo(res.data.logo)
      })
    axios.get(`${API}/admin/orders/get`)
      .then((res) => {
        const localOrders = window.localStorage.getItem('ecommerce_orders')
        if (localOrders !== null && localOrders !== undefined && localOrders !== "" && localOrders !== "null") {
          setNotificationOrder(res.data.length - localOrders)
        } else {
          setNotificationOrder(res.data.length)
        }
      })

  }, [])




  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={()=> history.push("/app/new-product")}
              aria-label="Toggle color mode"
            >
              <AiOutlineAppstoreAdd className="w-5 h-5" aria-hidden="true" />
            </button>
          </li>
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              {notifications + orderNotification > 0 ? <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span> : null}
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Notifications</span>
                {notifications > 0 ? <Badge type="danger">{notifications}</Badge> : null}
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setNotificationOrder(0)
                  handleNotificationsClick()
                  history.push("/app/orders")
                }}
                tag="a" href="#" className="justify-between">
                <span>Orders</span>
                {orderNotification > 0 ? <Badge type="danger">{orderNotification}</Badge> : null}
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={logo}
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={() => logout()}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
