


const Profile = () => {
  return (
      <div className="container mx-auto p-4 border-amber-100 border-1">
          Profile
          <form action="" className="form-container">
              <div className="form-control">
                  <label htmlFor="username">Username</label>
                  <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter username"
                      className="form-input"
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="form-input"
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter the password"
                      className="form-input"
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="confirm password">Confirm Password</label>
                  <input
                      type="password"
                      name="confirm password"
                      id="confirm password"
                      placeholder="Enter the password"
                      className="form-input"
                  />
              </div>
          </form>
      </div>
  );
}
export default Profile