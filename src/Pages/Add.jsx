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
  const [date, setDate] = useState('');
  const [Fstatus, setFstatus] = useState('');
  const [courses, setCourses] = useState([]);

  const navigation = useNavigate()

  let data = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
  const [record, setRecord] = useState(data)

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setCourses((prevCourses) =>
      checked ? [...prevCourses, value] : prevCourses.filter((course) => course !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      pass,
      gender,
      courses,
      date,
      Fstatus,
      status: 'Deactive'
    }

    let all = [...record, obj]
    localStorage.setItem('user', JSON.stringify(all))
    setRecord(all)
    alert("Record added sucessfully..")
    setName("")
    setemail("")
    setPass("")
    setGender ("")
    setCourses("")
    setDate("")
    setFstatus("")
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
            <form className='p-5 shadow' onSubmit={handleSubmit}>
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
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                <br/>
                <input type="radio" onChange={(e) => setGender("Male")}  /> <span className="me-2">Male</span>
                <input type="radio" onChange={(e) => setGender("Female")} /> <span className="me-2"/> <span>Female</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <div>
                  {[' Html ',  ' css ',  ' bootstrap ',  ' Js ',  ' react.js ',  ' node.js ',  ' php ',  ' angular ',  ' python ',  ' laravel '].map((course) => (
                    <div key={course} style={{ display: 'inline-block', marginRight: '10px' }}>
                      <input
                        type="checkbox"
                        value={course}
                        onChange={handleCourseChange}
                        checked={courses.includes(course)}
                      />
                      <label style={{ marginLeft: '5px' }}>{course}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label><br />
                <input type="date" id="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Select status</label><br />
                <select id="status" className="form-select" onChange={(e) => setFstatus(e.target.value)} value={Fstatus}>
                  <option value="">--- Selected ---</option>
                  <option value="active">Active</option>
                  <option value="unactive">Unactive</option>
                </select>
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
