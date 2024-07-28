const express = require('express')
const app = express()

const { instructors, courses, students } = require("./data")

//if there are courses
app.get("/", (req, res) => {
  res.status(200).json(courses)
})

//courses?tags=tag1,tag2,tag3,tag4
//if tag is given in query string, and there are courses wich has one of the given tags (e.g. tag1, tag2, tag3)
app.get("/courses", (req, res) => {
    const tagsFilter = req.query.tags ? req.query.tags.split(",") : null;
    const filteredcourses = [];
  
    for (let course of courses) {
      if (tagsFilter) {
        for (let tags of tagsFilter) {
          let tagMatches = false;
          course.tags.map((tag) => {
            if (tag.toLowerCase() === tags.toLowerCase()) {
              tagMatches = true;
            }
          })
          if (tagMatches) {
            filteredcourses.push(course)
          }
        }
      } else {
        filteredcourses.push(course)
      }
    }
    res.status(200).json({ courses: filteredcourses })
  })

///courses?level=advanced
//if level is given in query string, and there are courses wich has one of the given level (e.g. advanced, intermediate, beginner)
app.get("/courses/levels", (req, res) => {
  console.log (req.query)
  const levelFilter = req.query.level ? req.query.level.split(",") : null
  const filteredLevels = []

  courses.map((course) => {
    if (levelFilter) {
      for (let level of levelFilter) {
        if (course.level.toLowerCase().includes(level.toLowerCase())) {
          filteredLevels.push(course)
        }
      }
    } else {
      filteredLevels.push(course)
    }
  })
  res.status(200).json({ courses: filteredLevels })
})  

///courses?tags=tag1,tag2,tag3,tag4&level=advanced
//filters and returns courses which are advanced level and have at least one of the provided tags
app.get('/courses/query', (req, res) => {
  const tagsFilter = req.query.tags ? req.query.tags.split(",") : null
  const levelFilter = req.query.level ? req.query.level.split(",") : null
  const filteredcourses = [];

  for (let course of courses) {
    if (tagsFilter) {
      for (let tags of tagsFilter) {
        let tagMatches = false;
        course.tags.map((tag) => {
          if (tag.toLowerCase() === tags.toLowerCase()) {
            tagMatches = true;
          }
        })
        if (tagMatches) {
          filteredcourses.push(course)
        }
      }
    } else {
      filteredcourses.push(course)
    }
  }

  const filteredLevels = []

  courses.map((course) => {
    if (levelFilter) {
      for (let level of levelFilter) {
        if (course.level.toLowerCase().includes(level.toLowerCase())) {
          filteredLevels.push(course)
        }
      }
    } else {
      filteredLevels.push(course)
    }
  })
  res.status(200).json({ courses: filteredcourses, filteredLevels })
})

///courses/:id
//if a course with provided id exits
app.get("/courses/:id", (req, res) => {
  const { id } = req.params
  const course = courses.find((course) => course.course_id == id)

  if (course) {
    return res.status(200).json({ course })
  }
  return res.status(404).json({ message: `invalid course id ${id}` })
})

//## /courses/:id/instructors 
//**if a course with provided id exits**
app.get("/courses/:id/instructors", (req, res) => {
  const { id } = req.params
  const course = courses.find(course => course.course_id == id)

  if (course) {
    const courseInstructors = instructors.filter((instr) =>
      course.instructors.includes(instr.name)
    )
    return res.status(200).json({ instructors: courseInstructors })
  }
  return res.status(404).json({ message: `invalid course id ${id}` })
})

//## /courses/:id/students 
//**if a course with provided id exits**

app.get("/courses/:id/students", (req, res) => {
  const { id } = req.params;
  const course = courses.find((course) => course.course_id == id)

  if (course) {
    const courseStudents = students.filter((student) =>
      student.courses.includes(course.course_name)
    )
    return res.status(200).json({ students: courseStudents })
  }
  return res.status(404).json({ message: `invalid course id ${id}` })
})

app.listen(3000, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + 3000
    )
  else console.log("Error occurred, server can't start", error)
})