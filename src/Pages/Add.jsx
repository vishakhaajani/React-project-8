import React, { useState } from 'react'
import Header from '../Component/Header'
import { json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Add = () => {

  const [name, setName] = useState("")
  const [email, setemail] = useState("")
  const [pass, setPass] = useState("")
  const [status, setStatus] = useState("")
  const [gender , setGender] = useState("")
  const [course , setCourse] = useState("")

  const navigation = useNavigate()

  let data = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
  const [record, setRecord] = useState(data)

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      pass,
      gender,
      course,
      status: 'Deactive'
    }

    let all = [...record, obj]
    localStorage.setItem('user', JSON.stringify(all))
    setRecord(all)
    alert("Record added sucessfully..")
    setName("")
    setemail("")
    setPass("")
    setGender("")
    setCoure("")
    setTimeout(() => {
      navigation('/')
    }, 2000);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto mt-5 ">
            <form className='p-5' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name || ""} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => setemail(e.target.value)} value={email || ""} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPass(e.target.value)} value={pass || ""} />
              </div>
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                <br/>
                <input type="radio" onChange={(e) => setGender("Male")}  /> <span className="me-2">Male</span>
                <input type="radio" onChange={(e) => setGender("Female")} /> <span className="me-2"/> <span>Female</span>
              </div>
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Course</label>
                <br/>
                <input type="checkbox" onChange={(e) => setCourse("html")}  /> <span className="me-2">html</span>
                <input type="checkbox" onChange={(e) => setCourse("css")}  /> <span className="me-2">css</span>
                <input type="checkbox" onChange={(e) => setCourse("bootstrap")}  /> <span className="me-2">bootstrap</span>
                <input type="checkbox" onChange={(e) => setCourse("js")}  /> <span className="me-2">js</span>
                <input type="checkbox" onChange={(e) => setCourse("react js")}  /> <span className="me-2">react js</span>
                <input type="checkbox" onChange={(e) => setCourse("node js")}  /> <span className="me-2">node js</span>
                <input type="checkbox" onChange={(e) => setCourse("php")}  /> <span className="me-2">php</span>
                <input type="checkbox" onChange={(e) => setCourse("angular")}  /> <span className="me-2">angular</span>
                <input type="checkbox" onChange={(e) => setCourse("python")}  /> <span className="me-2">python</span>
                <input type="checkbox" onChange={(e) => setCourse("laravel")}  /> <span className="me-2">laravel</span>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
