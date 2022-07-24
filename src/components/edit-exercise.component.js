import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: "",
    date: "",
  });

  const { id } = useParams();

  function fetchData() {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setExercise(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function changeUsername(e) {
    setExercise((prevExercise) => ({
      ...prevExercise,
      username: e.target.value,
    }));
  }

  function changeDescription(e) {
    setExercise((prevExercise) => ({
      ...prevExercise,
      description: e.target.value,
    }));
  }

  function changeDuration(e) {
    setExercise((prevExercise) => ({
      ...prevExercise,
      duration: e.target.value,
    }));
  }

  function changeDate(e) {
    setExercise((prevExercise) => ({
      ...prevExercise,
      date: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const updatedExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    axios
      .post(
        `http://localhost:5000/exercises/update/${exercise._id}`,
        updatedExercise
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={exercise.username}
            onChange={changeUsername}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={exercise.description}
            onChange={changeDescription}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={exercise.duration}
            onChange={changeDuration}
            required
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={exercise.date.substring(0, 10)}
            onChange={changeDate}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Exercise Log"
            className="btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
}
