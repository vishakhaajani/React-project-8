import React from 'react'
import Header from '../Component/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const View = () => {

  const navigation = useNavigate()
  
  let data = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
  const [record , setRecord] = useState(data)

  const [mdelete , setMdelete] = useState("")
  const [mStatus , setmStatus] = useState("")

  const handleDelete = (id) => {
    let remove = record.filter((val) => val.id != id)
    localStorage.setItem('user',JSON.stringify(remove))
    setRecord(remove)
    alert("record delete sucessfully..")
  }


  const mulDelete = () => {
    if(mdelete.length == 0){
      alert("At least one row select")
      return false;
    }

    let deleteRecord = record.filter(val => !mdelete.includes(val.id))
    localStorage.setItem('user',JSON.stringify(deleteRecord))
    alert("record deleted...")
    setRecord(deleteRecord)
  }

  
  const mulStatus = () => {
    if(mStatus.length == 0){
      alert("At least one row select")
      return false;
    }

    let allstatus = record.map((val) => {
      if(mStatus.includes(val.id)){
        if(val.status == "Deactive"){
          val.status = "Active"
        }
        else{
          val.status = "Deactive"
        }
      }
      return val
    })
    localStorage.setItem('user',JSON.stringify(allstatus))
    alert("status update...")
    setRecord(allstatus)
  }

  const handlecheckDelete = (id , checked) => {
    let all = [...mdelete]
    if(checked){
      all.push(id)
    }
    else{
      all = all.filter(val => val != id)
    }
    setMdelete(all)
  }

  const handlecheckStatus = (id , checked) => {
    let all = [...mStatus]
    if(checked){
      all.push(id)
    }
    else{
      all = all.filter(val => val != id)
    }
    setmStatus(all)
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-11 mx-auto mt-5">
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">Srno</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Course</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  <th scope="col">
                    <button className = "btn btn-sm btn-danger" onClick={() => mulDelete()}>Delete</button>
                  </th>
                  <th scope="col">
                    <button className = "btn btn-sm btn-warning" onClick={() => mulStatus()}>Status</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                  {
                    record.map((val) => {
                      return (
                        <tr key={val.id}>
                          <td>{val.id}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>{val.gender}</td>
                          <td>{val.course}</td>
                          <td>
                            <button className='btn btn-sm btn-warning mx-2'>{val.status}</button>
                          </td>
                          <td>
                            <button className='btn btn-sm btn-danger mx-2' onClick={() => handleDelete(val.id)}>Delete</button>
                            <button className='btn btn-sm btn-success mx-2' onClick={() => navigation('./edit' , {state:val})}>Edit</button>
                          </td>
                          <td>
                            <input type="checkbox" onChange={(e) => handlecheckDelete(val.id , e.target.checked)} />
                          </td>
                          <td>
                            <input type="checkbox" onChange={(e) => handlecheckStatus(val.id , e.target.checked)} />
                          </td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default View
