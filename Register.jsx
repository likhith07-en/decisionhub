import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../App.css";

function Register(){

    const navigate=useNavigate();

    const[user,setUser]=useState({

        name:"",
        email:"",
        password:"",
        role:"USER"

    });

    const change=(e)=>{

        setUser({

            ...user,
            [e.target.name]:e.target.value

        });

    }

    const register=(e)=>{

        e.preventDefault();

        console.log(user);

        alert("Registration Successful");

        navigate("/");

    }

    return(

        <div className="container">

            <h2>Register</h2>

            <form onSubmit={register}>

                <input
                name="name"
                placeholder="Name"
                onChange={change}
                />

                <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={change}
                />

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={change}
                />

                <select
                name="role"
                value={user.role}
                onChange={change}
                >

                    <option value="USER">User</option>

                    <option value="MODERATOR">Moderator</option>

                    <option value="ADMIN">Admin</option>

                </select>

                <button>

                    Register

                </button>

            </form>

            <br/>

            <Link to="/">Already have an account?</Link>

        </div>

    );

}

export default Register;
