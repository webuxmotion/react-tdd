const Markup = ({
    submit,
    onChange,
    data,
    disabled,
}) => {

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

export default Markup;
