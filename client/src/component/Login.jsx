import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram ,AiFillTwitterCircle } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";

function Login() {
  const navigate = useNavigate();

  const [userRegistration, SetRegistration] = useState({
    email: "",
    password: "",
  });

  const handelinput = (e) => {
    const n = e.target.name;
    const v = e.target.value;
    SetRegistration({ ...userRegistration, [n]: v });
  }
  const PostData = async (e) => {
    e.preventDefault();

    const { email, password } = userRegistration;
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials:"include",
      body: JSON.stringify({
        email, password
      })

    });
   

    const data = await res.json();
   

    if (res.status === 400 || res.status === 422 || !data) {
      window.alert("Login failed");
    }
    else {
      window.alert("Logged in SuccessFuly");
      navigate("/cal");
    }
  }
  return (
    <>
      <section class="vh-80 section" >
        <div class="container-fluid h-custom" style={{ marginTop: "100px" }}>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://static.vecteezy.com/system/resources/previews/002/437/945/large_2x/illustration-of-a-login-account-free-vector.jpg"
                class="img-fluid" alt="Sample image" />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form method='POST'>
              <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p class="lead fw-normal mb-0 me-3">Sign In With</p>
                                    <button type="button" class="btn btn-light btn-floating mx-1 r1">
                                        <i class="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" class="btn btn-light btn-floating mx-1">
                                        <i class="fab fa-twitter"></i>
                                    </button>
                                    <button type="button" class="btn btn-light btn-floating mx-1">
                                        <i class="fab fa-linkedin-in"></i>
                                    </button>
                                </div>

                <div class="divider d-flex  my-4" >
                  <h4 class=" fw-bold mx-0 mb-0" >Sign Using email</h4>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1" class="para"> Enter Email address </label>
                  <input type="email" class="form-control form-control-sm hi" id="exampleInputEmail1" autoComplete="off" aria-describedby="emailHelp" value={userRegistration.email} onChange={handelinput} required name="email" />
                </div>
                <br />
                <div class="form-group">
                  <label for="exampleInputPassword1" class="para">Enter Password </label>
                  <input type="password" class="form-control form-control-sm hi" id="exampleInputPassword1" autoComplete="off" value={userRegistration.password} onChange={handelinput} required name="password" />
                </div>
                <br />
                <div class="d-flex justify-content-between align-items-center">
                  <div class="form-check mb-0">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label class="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" class="text-body">Forgot password?</a>
                </div>
                <button type="submit" class="btn btn-light btn-outline-secondary btn-block btt" onClick={PostData}>Sign in</button>
              </form>
            </div>
          </div>
        </div>


      </section>



    </>
  )
}

export default Login;