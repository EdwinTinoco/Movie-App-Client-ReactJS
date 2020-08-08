import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

import Logo from '../../../static/assets/images/logo/logo-1.png'


export default function SignUp(props) {
   const [userFirstName, setUserFirstName] = useState('')
   const [userLastName, setUserLastName] = useState('')
   const [userAddress, setUserAddress] = useState("")
   const [userZipCode, setUserZipCode] = useState('')
   const [userPhoneNumber, setUserPhoneNumber] = useState('')
   const [userGrade, setUserGrade] = useState("")
   const [userEmail, setUserEmail] = useState('')
   const [userPassword, setUserPassword] = useState("")
   const [messageUser, setMessageUser] = useState("")

   const handleSubmitRegisterNewUser = () => {
      event.preventDefault();

      if (userGrade === "") {
         setMessageUser(
            "You need to select an option for grade"
         )
      } else {
         axios
            .post(
               'https://class-cash-api-ejlt.herokuapp.com/add-user',
               {
                  users_first_name: userFirstName,
                  users_last_name: userLastName,
                  users_address: userAddress,
                  users_zip_code: userZipCode,
                  users_phone_number: userPhoneNumber,
                  users_grades_id: parseInt(userGrade),
                  users_email: userEmail,
                  users_password: userPassword,
                  users_active: "Y"
               },
            )
            .then(response => {
               console.log("new user", response.data)

               setUserFirstName('')
               setUserLastName('')
               setUserAddress('')
               setUserZipCode('')
               setUserPhoneNumber('')
               setUserGrade("")
               setUserEmail('')
               setUserPassword('')
               setMessageUser("User Added Succesfully!")
            })
            .catch(error => {
               console.log('handleSubmitRegisterNewUser error', error)
            })
      }
   }


   return (
      <div className="signup-main-wrapper">
         <div className="have-an-account">
            <div className="title">
               <p>Already have an account?</p>
            </div>

            <Link to="/auth">
               <div className="login-button">
                  Login
               </div>
            </Link>
         </div>

         <div className="signup-form-wrapper">
            <div className="left-side">
               <div className="logo">
                  <img src={Logo} alt='Logo' />
               </div>
            </div>
            <div className="right-side">
               <p>Sign up</p>

               <form onSubmit={handleSubmitRegisterNewUser} className="signup-form">
                  <input type='text'
                     value={userFirstName}
                     onChange={({ target }) => { setUserFirstName(target.value) }}
                     className='new-entry-input'
                     placeholder='First Name'
                     required
                  >
                  </input>

                  <input type='text'
                     value={userLastName}
                     onChange={({ target }) => { setUserLastName(target.value) }}
                     className='new-entry-input'
                     placeholder='Last Name'
                     required
                  >
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userAddress}
                     onChange={({ target }) => { setUserAddress(target.value) }}
                     placeholder='Address'
                     required
                  >
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userZipCode}
                     onChange={({ target }) => { setUserZipCode(target.value) }}
                     placeholder='Zip Code'
                     required
                  >
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userPhoneNumber}
                     onChange={({ target }) => { setUserPhoneNumber(target.value) }}
                     placeholder='Phone number'
                     required
                  >
                  </input>

                  <select className='new-entry-input new-entry-select'
                     value={userGrade}
                     onChange={({ target }) => { setUserGrade(target.value) }}>
                     <option value=''>Select an option</option>
                     <option value={1}>First Grade</option>
                     <option value={11}>Second Grade</option>
                     <option value={21}>Third Grade</option>
                     <option value={31}>Fourth Grade</option>
                     <option value={41}>Fifth Grade</option>
                  </select>

                  <input type='email'
                     className='new-entry-input'
                     value={userEmail}
                     onChange={({ target }) => { setUserEmail(target.value) }}
                     placeholder='Email'
                     required
                  >
                  </input>

                  <input type='password'
                     className='new-entry-input'
                     value={userPassword}
                     onChange={({ target }) => { setUserPassword(target.value) }}
                     placeholder='Password'
                     required
                  >
                  </input>

                  <div className="message">
                     <p>{messageUser}</p>
                  </div>

                  <button type='submit' className='add-button'>Sign up</button>
               </form>
            </div>

         </div>

      </div>
   )
}