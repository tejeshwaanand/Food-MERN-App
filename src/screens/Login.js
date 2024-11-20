import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [credential, setcredential] = useState({ email: "", password: "" });
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.error);
    }
    if (json.success) {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
    }
  };
  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    {/* <Link to="/">
                      <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="175" height="57" />
                    </Link> */}
                    <Link className="navbar-brand fs-1 " to="/">
                      Wofood
                    </Link>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                    Enter your details to login
                  </h2>
                  <form onSubmit={handlesubmit}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            required
                            value={credential.email}
                            onChange={onchange}
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            value={credential.password}
                            onChange={onchange}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">
                          New to Wofood{" "}
                          <Link
                            to="/signup"
                            className="link-primary text-decoration-none"
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
