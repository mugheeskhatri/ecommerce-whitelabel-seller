import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import '../styles/auth.css'
import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import axios from "axios"
import {API} from '../config/api';





function CreateNewPassword() {

  const history = useHistory()

  const [email, setEmail] = useState(window.localStorage.getItem("ecommerceEmail"))
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const submit = () => {
    if (password.length < 6) {
      alert("Password Contains atleast 6 characters")
    } else if (password !== confirmPassword) {
      alert("Your both password do not matched")
    } else {

      const form = {
        email,
        password
      }
      axios.post(`${API}/admin/new-passsword`, form)
        .then(async (res) => {
         alert("Password Changed")
         history.push("/login")
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create New password
              </h1>

              <Label>
                <span>New Password</span>
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1" placeholder="New password" />
              </Label>
              <Label className="mt-3">
                <span>Confirm Password</span>
                <Input
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1" placeholder="Confirm password" />
              </Label>

              <Button
                onClick={() => submit()}
                block className="mt-4">
                Create New Password
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPassword
