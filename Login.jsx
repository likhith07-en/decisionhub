import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login() {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const login=(e)=>{
        e.preventDefault();

        if(email==="" || password===""){
            alert("Please enter all fields");
            return;
        }

        localStorage.setItem("userEmail",email);

        navigate("/dashboard");
    }

    return(

        <div className="container">

            <h2>DecisionHub Login</h2>

            <form onSubmit={login}>

                <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <br/>

            <p>
                New User?
                <Link to="/register"> Register</Link>
            </p>

        </div>

    );

}

export default Login;
