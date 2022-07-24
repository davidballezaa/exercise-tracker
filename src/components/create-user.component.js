import axios from "axios";

export default function CreateUser() {
  function onSubmit(e) {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
    };

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    e.target.username.value = "";
  }
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            name="username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
}
