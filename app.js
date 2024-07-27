const express = require('express')
const app = express()

const { instructors, courses, students } = require("./data")


// app.get("/courses", (req, res) => {
//   res.status(200).json(courses)
// })

app.get("/courses", (req, res) => {
  console.log (req.query)
  const tagsFilter = req.query.tags ? req.query.tags.split(",") : null
  const filteredcourses = []

  courses.map((course) => {
    if (tagsFilter) {
      for (let tags of tagsFilter) {
        if (course.tags.includes(tags)) {
          filteredcourses.push(course)
        }
      }
    } else {
      filteredcourses.push(course)
    }
  })
  res.status(200).json({ courses: filteredcourses })
})


app.listen(3000, () => {
  console.log("Server is lestening on port 3000...")
})