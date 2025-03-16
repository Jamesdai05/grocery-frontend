const Login = () => {
  return (
    <div className="flex justify-center items-center p-12 md:p-16 min-h-[80vh] my-auto">
      <div className="w-full max-w-sm bg-slate-300 m-auto flex items-center flex-col p-4">
        <h2>Log In</h2>
        <form className="flex flex-col items-center w-full p-4 my-4">
          <div className="flex justify-between mb-4 items-center">
            <label htmlFor="email" className="w-[100px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter your email"
              className="border-1 text-md p-2"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="w-[100px]">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter the password"
              className="border-1 text-md p-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
