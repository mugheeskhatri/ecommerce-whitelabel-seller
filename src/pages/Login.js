import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import axios from 'axios'
import {API} from '../config/api'

function Login() {

  let history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const signin = () => {
    if (email.length == 0 || email === undefined) {
      alert("Please Enter email")
    } else if (password === undefined || password.length == 0) {
      alert("Please Enter password")
    } else if (password.length < 6) {
      alert("The password contains atleast 6 characters")
    } else {

      const form = {
        email,
        password
      }

      axios.post(`${API}/admin/login`, form)
        .then(async (res) => {
          if (res.status === 206) {
            alert("The email you entered is wrong")
          } else if (res.status === 203) {
            alert("The password you entered is wrong")
          } else {
            window.sessionStorage.setItem("admin_token_for_ecommerce",res.data.token)
            history.push("/app")
          }
        })
        .catch((e) => {
          console.log("Error", e)
        })
    }

  }


  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input onChange={(e) => {
                  setEmail(e.target.value)
                }} className="mt-1" type="email" placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input onChange={(e) => {
                  setPassword(e.target.value)
                }} className="mt-1" type="password" placeholder="***************" />
              </Label>


              <Button onClick={signin} className="mt-4" block >Log in</Button>


              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
