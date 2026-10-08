import { useEffect,useState } from "react";
import axios from "axios";

function App() {

  const [name,setName] = useState([]);
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [students, setStudents] = useState([]);

  const getStudents = () => {
    axios
    .get("https://advwebpractical-server.vercel.app/students")
    .then((response) => {
      setStudents(response.data);
    })
  };

  useEffect(() => {
    getStudents();
  },[]);

  const clearForm = () => {
    setName("");
    setAge("");
    setCourse("");
    setEditingId(null);
  };

  const addStudent = () => {
    axios
    .post("https://advwebpractical-server.vercel.app/students", {
      name:name,
      course:course,
      age:age
    })
    .then(() => {
      getStudents();
      clearForm();
    })
  };

  const updateStudent = () => {
    axios
    .put(`https://advwebpractical-server.vercel.app/students/${editingId}`, {
      name:name,
      course:course,
      age:age
    })
    .then(() => {
      getStudents();
      clearForm();
    })
  };

  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(student._id);
  };

  const deleteStudent = (id) => {
    axios
    .delete(`https://advwebpractical-server.vercel.app/students/${id}`)
    .then(() => {
      getStudents();
    })
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <p>Name:{""}
        <input 
        type = "text"
        value = {name}
        onChange = {(event) => {
          setName(event.target.value)}} 
        />
      </p>

      <p>Course:{""}
        <input 
        type = "text"
        value = {course}
        onChange = {(event) => {
          setCourse(event.target.value)}} 
        />
      </p>

      <p>Age:{""}
        <input 
        type = "number"
        value = {age}
        onChange = {(event) => {
          setAge(event.target.value)}} 
        />
      </p>

      {editingId === null ? (
        <button onClick={addStudent}>Add Student</button>
      ):
      (
        <>
        <button onClick={updateStudent}>Edit Student</button>
        <button onClick={clearForm}>Cancel</button>
        </>
      )}
      
      <h2>Students</h2>

      {students.map((student) => (
        <div key = {student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => editStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;