import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        if (res.data.length) {
          setExercises(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function deleteExercise(id) {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data));

    setExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise._id !== id)
    );
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise._id}>
              <td>{exercise.username}</td>
              <td>{exercise.description}</td>
              <td>{exercise.duration}</td>
              <td>{exercise.date.substring(0, 10)}</td>
              <td>
                <Link to={`/edit/${exercise._id}`} className="btn btn-primary">
                  Edit
                </Link>

                <div
                  className="btn btn-danger"
                  onClick={() => deleteExercise(exercise._id)}
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
