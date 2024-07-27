const express = require('express')
const app = express()

const { instructors, courses } = require("./data")

app.get('/', (req, res) => {
   res.status(200).json(instructors)
})

app.get("/:id", (req, res) => {
  const id = req.params.id
  const instructor = instructors.find((instr) => instr.instructor_id == id)

  if (instructor) {
    res.status(200).json({ instructor: instructor })
  } else {
    res.status(404).json({ message: `instructor with id(${id}) not found` })
  }
})

app.get("/:id/courses/:courseId", (req, res) => {
  const id = req.params.id
  const courseId = req.params.courseId
  const instructor = instructors.find((instr) => instr.instructor_id == id)

  if (instructor) {
    const existingCourses = courses.filter((course) =>
      course.instructors.includes(instructor.name)
    )

    const course = existingCourses.find(course => course.course_id == courseId)

    if (course) {
      res.status(200).json({ course: course })
    } else {
      res.status(404).json({ message: "course not found" })
    }
  } else {
    res.status(404).json({ message: "instructor not found" });
  }
})

app.get("/instructors/query", (req, res) => {
  console.log (req.query)
  const departmentFilter = req.query.department ? req.query.department.split(",") : null
  const filteredInstructors = []

  instructors.map((instructor) => {
    if (departmentFilter) {
      for (let department of departmentFilter) {
        if (instructor.department.toLowerCase().includes(department.toLowerCase())) {
          filteredInstructors.push(instructor)
        }
      }
    } else {
      filteredInstructors.push(instructor)
    }
  })
  res.status(200).json({ instructors: filteredInstructors })
})

app.listen(3000, () => {
  console.log("Server is lestening on port 3000...")
})
