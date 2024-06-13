import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { json, useLocation, useNavigate } from 'react-router-dom'

const Add = () => {

    const location = useLocation()

    const navigation = useNavigate()

  const [name , setName] = useState("")
  const [email , setemail] = useState("")
  const [pass , setPass] = useState("")

  let data = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
  const [record , setRecord] = useState(data)

  useEffect(() => {
    setName(location.state.name)
    setemail(location.state.email)
    setPass(location.state.pass)
  },[location.state])

  const handleSubmit = (e) => {
    e.preventDefault();

    let up = record.map((val) => {
        if (val.id == location.state.id){
            val.name = name
            val.email = email
            val.pass = pass
        }
        return val
    })
      localStorage.setItem('user',JSON.stringify(up))
      setRecord(up)
      alert("Record update sucessfully..")
      setName("")
      setemail("")
      setPass("")
      setTimeout(() => {
        navigation('/')
      },2000)
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto mt-5">
            <form className='p-5' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name || ""} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control"  onChange={(e) => setemail(e.target.value)} value={email || ""} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPass(e.target.value)} value={pass || ""} />
              </div>
              <button type="submit" className="btn btn-primary">update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
