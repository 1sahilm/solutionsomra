import Link from "next/link";
import Head from "next/head";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession, getSession } from "next-auth/client";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const router = useRouter();
  const isSuperAdmin = true;

  // const[session,loading] = useSession();
  // useEffect(()=>{
  //   if(session){
  //       router.push("/")
  //   }

  // },[session])

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);

  const toastrRef = useRef(); //init toastr ref
  const [count, setCount] = useState(0);
  const [toasterData, setToasterData] = useState({
    position: "topEnd",
    status: "Primary",
    duration: 5000,
    hasIcon: true,
    destroyByClick: true,
    preventDuplicates: false,
  });

  async function login(e) {
    e.preventDefault();

    const getLoginStatus = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!getLoginStatus?.error) {
      toast("you're successfully logged in")

      router.push("/");
    }
    toast("Enter Correct username and password")
  }

  return (
    <div className="bg-img">
      <Head>
        <link
          rel="canonical"
          href="https://aldi.github.io/bulma-login-template/"
        />
        <title>Login Page</title>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma-social@1/bin/bulma-social.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.0/css/all.min.css"
        />
      </Head>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <div className="box">
                <ToastContainer/>
                <p className="subtitle is-4">Please login to proceed.</p>
                <br />
                <form>
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <span className="icon is-medium is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <span className="icon is-medium is-right">
                        <i className="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  {/* <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div> */}
                  <button
                    className="button is-block is-info is-large is-fullwidth"
                    onClick={login}
                  >
                    Login
                  </button>
                  <br />
                  {/* <p className="subtitle is-5">Login using Social Media</p> */}
                  {/* <div className="buttons is-centered" style={{marginBottom:"0"}}>
                  <a href="#" className="button is-medium is-facebook">
                    <span className="icon">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </span>
                  </a>
                  <a href="#" className="button is-medium is-twitter">
                    <span className="icon">
                      <i className="fab fa-twitter fa-lg"></i>
                    </span>
                  </a>
                  <a href="#" className="button is-medium is-github">
                    <span className="icon">
                      <i className="fab fa-github fa-lg"></i>
                    </span>
                  </a>
                </div> */}
                </form>
              </div>
              {/* <p className="has-text-grey">
              <a href="#">Sign Up</a> &nbsp;·&nbsp; <a href="#">Forgot Password</a> &nbsp;·&nbsp;
              <a href="#">Need Help?</a>
            </p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
