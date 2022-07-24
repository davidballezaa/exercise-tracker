import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateExercise() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length) {
        setUsers(res.data.map((user) => user.username));
      }
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: e.target.username.value,
      description: e.target.description.value,
      duration: e.target.duration.value,
      date: e.target.date.value,
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select className="form-control" name="username" required>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            required
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            required
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input type="date" name="date" required className="form-control" />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
}
