import axios from "axios";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  });
  
  const [disabled, setDisabled] = useState(true);

  const onChange = (event) => {
    const { id, value } = event.target;

    setData(prev => ({
        ...prev,
        [id]: value
    }))
  }

  const submit = (event) => {
    event.preventDefault();
    const { username, email, password } = data;

    const body = {
      username,
      email,
      password,
    };

    axios.post("api/1.0/users", body);
  };

  useEffect(() => {
    if (!data.password && !data.passwordRepeat) {
        setDisabled(true);
    } else {
        if (data.password === data.passwordRepeat) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
  }, [data.password, data.passwordRepeat]);

  return (
    <>
      <form onSubmit={submit}>
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            onChange={onChange} 
            value={data.username}
        />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            onChange={onChange} 
            value={data.email}
            type="email" 
        />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={onChange}
            value={data.password}
          />
        </div>

        <div>
          <label htmlFor="passwordRepeat">Password Repeat</label>
          <input
            id="passwordRepeat"
            type="password"
            onChange={onChange}
            value={data.passwordRepeat}
          />
        </div>

        <div>
          <button disabled={disabled}>
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
