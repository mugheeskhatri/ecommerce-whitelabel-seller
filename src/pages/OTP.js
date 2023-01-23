import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import '../styles/auth.css'
import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import {API} from '../config/api';
import axios from "axios"






function ForgotPassword() {

  const history = useHistory()

  const [email, setEmail] = useState(window.localStorage.getItem("ecommerceEmail"))
  const [otp, setOtp] = useState("")

  const submit = () => {
    if (otp.length === 0 || otp === undefined) {
      alert("Enter OTP")
    } else {
      const form = {
        email,
        otp
      }
      axios.post(`${API}/admin/verify-otp`, form)
        .then(async (res) => {
          if (res.status === 205) {
            alert("The OTP you entered is wrong")
          } else {
            alert("OTP Success")
            history.push("/new-password")
          }
        })
        .catch((e) => {
          console.log("Error", e)
        })

      history.push("/new-password")
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
              <Label className="mt-2">
                <span>Enter OTP</span>
                <OtpInput
                  value={otp}
                  onChange={(e) => setOtp(e)}
                  numInputs={4}
                  separator={<span>-</span>}
                  containerStyle="otpInputContainer"
                  inputStyle="otpInput"
                  isInputNum={true}
                />
              </Label>

              <Button
                onClick={() => submit()}
                block className="mt-4">
                Recover password
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
