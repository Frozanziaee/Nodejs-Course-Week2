const express = require('express')
const app = express()
const {students} = require('./data')

//**if there are students**
app.get('/', (req, res) => res.status(200).json({students}))

//**if there is students between the provided age**
app.get("/students", (req, res) => {
console.log (req.query)
const ageFilter = req.query.age? req.query.age.split(",") : null
const filteredStudents = []

students.map((student) => {
  if (ageFilter) {
    for (let age of ageFilter) {
      if (student.age >=20 && student.age <=22) {
        filteredStudents.push(student)
      }
    }
  } else {
    filteredStudents.push(null)
  }
})
res.status(200).json({ students: filteredStudents })
})

//**if a student with provided id exits**
app.get("/students/:id", (req, res) => {
  const { id } = req.params
  let student = students.find((student) => student.student_id == id)
  if (student) {
    return res.status(200).json({ student })
  }
  res.status(402).json({ message: `invalid student id ${id}` })
})

//**if a any number of students with provided major exits**
app.get("/students/:id/majors/:major([a-zA-Z0-9%20]+)", (req, res) => {
  const { major } = req.params
  let student = students.filter(
    (student) => student.major.toLowerCase() == major.toLowerCase()
  )
  return res.status(200).json({ student })
})

app.listen(3000, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + 3000
    )
  else console.log("Error occurred, server can't start", error)
})