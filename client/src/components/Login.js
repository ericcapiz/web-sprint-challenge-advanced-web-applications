import React from "react";
import { axiosWithAuth } from "./axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "login failed",
            err.response.data
          );
        } else {
          console.error("login failed: err: ", err);
        }
      });
  };

  render() {
    return (
      
      <div>
        <h1>Welcome to the Bubble App!</h1>
     
        <form onSubmit={this.login}>
        <label style={{padding:"0", margin:"0 auto"}}>Username:
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder="Username"
            data-testid="username"
          />
          </label>
          
          <label style={{padding:"0", margin:"0 auto"}}>Password:
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="Password"
            data-testid="password"
          />
          </label>
          <button data-testid= "submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
