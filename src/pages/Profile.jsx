
const Profile = () => {
    return(
        <div className="container flex flex-col md:flex-row gap-6 mx-auto p-2 border-amber-100">
            <div className="md:w-4/12 w-full">
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
                    <div className="profile-btn">
                        <button type="submit" className="btn-primary btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <div className="md:w-8/12 w-full">
                <h1 className="text-2xl font-bold">My Orders</h1>
            </div>
        </div>
    );
}
export default Profile