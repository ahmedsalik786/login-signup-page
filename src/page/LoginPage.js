
import React, { useState } from "react";
import logo from "../undraw_authentication_re_svpt 1.png";
import { Input, Button } from "antd";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth,db, } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



function LoginPage() {
    const [flag, setFlag] = useState(true);
    const [username, setUsername] = useState("salik");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    console.log(flag);

    function handleLogin() {
        console.log(username + " " + email + " " + password);
    }


    async function createDoc(user) {
        //make sure that the doc with the uid dones not already
        //create doc
       
        if (!user) return;
    
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);
        if (!userData.exists()) {
          try {
            await setDoc(doc(db, "users", user.uid), {
              name: user.displayName ? user.displayName : username,
              email: user.email,
              createdAt: new Date(),
            });
           
          } catch (error) {
            
          }
        }
      }

    function handleSignUp() {
        console.log(
            "name",
            username,
            "email",
            email,
            "pw",
            password,

        );

        if (   username !== "" && email !== "" && password !== "") {

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("user", user);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    createDoc(user);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;


                });
        } else {

        }

    }
    

    function handleLogin() {
        
        console.log("email", email);
        console.log("password", password);
    
        if (password !== "" && email !== "") {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              
              console.log("User Logged in", user);
             
              setEmail("");
              setPassword("");
              navigate("/dashboard");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        }
      }

    return (
        <>
            {flag ? (
                <>
                    <div className="main-container">
                        <div className="left">
                            <img src={logo} alt="" />
                        </div>
                        <div className="right">
                            <p style={{ fontSize: "20px", fontWeight: "700" }}>Login</p>
                            <div className="input-container">
                                <label htmlFor="Login Id">Enter Login Id</label>
                                <Input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Mail id"
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="Login Id">Enter Password</label>
                                <Input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="checkbox">
                                <div className="input-checkbox">
                                    <Input
                                        type="checkbox"
                                        className="tik"
                                        id="Remember"
                                        name="Remember"
                                        value="Remember"
                                    />
                                    <label style={{ fontSize: "10px", }} htmlFor="vehicle1">
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <div>
                                        <label
                                            style={{ fontSize: "10px", color: "orange" }}
                                            htmlFor=""
                                        >
                                            forget Password
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox">
                                <div className="input-checkbox">
                                    <Input
                                        type="checkbox"
                                        className="tik"
                                        id="Remember"
                                        name="Remember"
                                        value="Remember"
                                    />
                                    <label style={{ fontSize: "10px" }} htmlFor="vehicle1">
                                        Agree to <span style={{ color: "orange" }}>Term & Conditions</span>
                                    </label>
                                </div>
                                <div>{/* <label style={{ fontSize: "10px" }} htmlFor="">forget Password</label> */}</div>
                            </div>
                            <div className="input-container">
                                <Button className="btn" onClick={handleLogin}>
                                    Login
                                </Button>
                            </div>

                            <p style={{ cursor: "pointer" }} onClick={() => setFlag(false)}>
                                Don't have an account ? <span style={{ color: "orange" }}> Register here</span>
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="main-container">
                        <div className="left">
                            <img src={logo} alt="" />
                        </div>
                        <div className="right">
                            <p style={{ fontSize: "20px", fontWeight: "700" }}>SignUp</p>
                            <div className="input-container">
                                <label htmlFor="Login Id">Enter Name</label>
                                <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Name" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="Login Id">Enter Login Id</label>
                                <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Mail id" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="Login Id">Enter Password</label>
                                <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                            </div>

                            <div className="input-container">
                                <Button className="btn" onClick={handleSignUp}>
                                    SignUp
                                </Button>
                            </div>

                            <p style={{ cursor: "pointer" }} onClick={() => setFlag(true)}>
                                Already have an account ? <span style={{ color: "orange" }}>Login</span>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default LoginPage;
