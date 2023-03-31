import axios from "axios";
import { useEffect, useState } from "react";
import Markup from "./markup";

const Container = () => {
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
    // fetch("api/1.0/users", {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body)
    // })
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
    <Markup 
      submit={submit}
      onChange={onChange}
      data={data}
      disabled={disabled}
    />
  );
};

export default Container;
