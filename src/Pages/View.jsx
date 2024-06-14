import React from 'react'
import Header from '../Component/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const View = () => {
  const navigation = useNavigate()
  
  let data = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
  const [record, setRecord] = useState(data)
  const [mdelete, setMdelete] = useState([])
  const [filteredRecord, setFilteredRecord] = useState(data)
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [mStatus, setmStatus] = useState([])

  const handleDelete = (id) => {
    let remove = record.filter((val) => val.id !== id)
    localStorage.setItem('user', JSON.stringify(remove))
    setRecord(remove)
    setFilteredRecord(remove)
    alert("Record deleted successfully.")
  }

  const mulDelete = () => {
    if (mdelete.length === 0) {
      alert("At least one row select")
      return false
    }

    let deleteRecord = record.filter(val => !mdelete.includes(val.id))
    localStorage.setItem('user', JSON.stringify(deleteRecord))
    alert("Records deleted.")
    setRecord(deleteRecord)
    setFilteredRecord(deleteRecord)
  }

  const mulStatus = () => {
    if (mStatus.length === 0) {
      alert("At least one row select")
      return false
    }

    let allstatus = record.map((val) => {
      if (mStatus.includes(val.id)) {
        val.status = val.status === "Deactive" ? "Active" : "Deactive"
      }
      return val
    })
    localStorage.setItem('user', JSON.stringify(allstatus))
    alert("Status updated.")
    setRecord(allstatus)
    setFilteredRecord(allstatus)
  }

  const handlecheckDelete = (id, checked) => {
    let all = [...mdelete]
    if (checked) {
      all.push(id)
    } else {
      all = all.filter(val => val !== id)
    }
    setMdelete(all)
  }

  const handlecheckStatus = (id, checked) => {
    let all = [...mStatus]
    if (checked) {
      all.push(id)
    } else {
      all = all.filter(val => val !== id)
    }
    setmStatus(all)
  }

  const filterData = (status) => {
    const updatedRecords = record.filter((val) => val.status.toLowerCase() === status.toLowerCase())
    setFilteredRecord(status === '' ? record : updatedRecords)
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch(value)
    const filtered = record.filter((val) =>
      val.name.toLowerCase().includes(value)
    )
    setFilteredRecord(filtered)
  }

  const handleSort = (e) => {
    const value = e.target.value
    setSortOrder(value)
    setFilteredRecord(sortRecords(filteredRecord, value))
  }

  const sortRecords = (records, order) => {
    if (order === 'az') {
      return [...records].sort((a, b) => a.name.localeCompare(b.name))
    } else if (order === 'za') {
      return [...records].sort((a, b) => b.name.localeCompare(a.name))
    }
    return records
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-11 mx-auto mt-5">
            <form className="mb-3 mt-3 d-flex align-items-center">
              <div className="col-lg-4">
                <select className="p-1 form-select" onChange={(e) => filterData(e.target.value)}>
                  <option value="">--- Select ---</option>
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </select>
              </div>
              <div className="col-lg-4 me-3">
                <input
                  type="text"
                  className="ms-3 form-control"
                  placeholder="Search here"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <div className="col-lg-4">
                <select className="ms-3 p-1 form-select" onChange={handleSort}>
                  <option value="">--- Select Sort ---</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </form>
            
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">Srno</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Course</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col">Fstatus</th>
                  <th scope="col">Action</th>
                  <th scope="col">
                    <button className="btn btn-sm btn-danger" onClick={() => mulDelete()}>Delete</button>
                  </th>
                  <th scope="col">
                    <button className="btn btn-sm btn-warning" onClick={() => mulStatus()}>Status</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredRecord.map((val, index) => {
                    return (
                      <tr key={val.id}>
                        <td>{index + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.gender}</td>
                        <td>{val.courses.join(',')}</td>
                        <td>
                          <button className='btn btn-sm btn-warning mx-2'>{val.status}</button>
                        </td>
                        <td>{val.date}</td>
                        <td>{val.Fstatus}</td>
                        <td>
                          <button className='btn btn-sm btn-danger mx-2' onClick={() => handleDelete(val.id)}>Delete</button>
                          <button className='btn btn-sm btn-success mx-2' onClick={() => navigation('./edit', { state: val })}>Edit</button>
                        </td>
                        <td>
                          <input type="checkbox" onChange={(e) => handlecheckDelete(val.id, e.target.checked)} />
                        </td>
                        <td>
                          <input type="checkbox" onChange={(e) => handlecheckStatus(val.id, e.target.checked)} />
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
