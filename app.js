const express = require('express')
const app = express()
const {students} = require('./data')

app.get('/', (req, res) => res.status(200).json({students}))

app.get('/students', (req, res) =>{
  const {age} = req.query
  let filteredStudents = students

  if(age){
    const [minAge, maxAge] =age.split('-')
    filteredStudents = students.filter(
      (student) => student.age >= minAge && student.age <= maxAge
    )
  }
  res.status(200).json({students: filteredStudents})
})

app.get("/students/:id", (req, res) => {
  const { id } = req.params
  let student = students.find((student) => student.student_id == id)
  if (student) {
    return res.status(200).json({ student })
  }
  res.status(402).json({ message: `invalid student id ${id}` })
})

app.get("/students/:id/majors/:major([a-zA-Z0-9%20]+)", (req, res) => {
  const { major } = req.params
  let student = students.filter(
    (student) => student.major.toLowerCase() == major.toLowerCase()
  )
  return res.status(200).json({ student })
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000....')
})