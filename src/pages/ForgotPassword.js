import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import '../styles/auth.css'
import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import axios from "axios"
import {API} from '../config/api';






function ForgotPassword() {

  const history = useHistory()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const submit = () => {
    if (email === undefined || email.length == 0) {
      alert("Please Enter Email")
    } else if (validateEmail(email) === false) {
      alert("Please Enter valid Email")
    } else {
      const form = {
        email,
        otp
      }
      axios.post(`${API}/admin/forgot-password`, form)
        .then(async (res) => {
          if (res.status === 205) {
            alert("The email you entered is wrong")
          } else {
            localStorage.setItem("ecommerceEmail", email);
            alert("OTP Sent to your email")
            history.push("/OTP")
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1" placeholder="Please Enter your email" />
              </Label>
              <Button
                onClick={() => submit()}
                block className="mt-4">
                Get OTP
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
