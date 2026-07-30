import "../App.css";

function Dashboard(){

    const email=localStorage.getItem("userEmail");

    return(

        <div className="container">

            <h1>DecisionHub</h1>

            <hr/>

            <h3>Welcome</h3>

            <p>{email}</p>

            <br/>

            <h3>Role Based Modules</h3>

            <ul>

                <li>Create Decision Board</li>

                <li>Vote on Polls</li>

                <li>Compare Options</li>

                <li>Community Discussion</li>

                <li>Analytics Dashboard</li>

                <li>Reports</li>

            </ul>

        </div>

    );

}

export default Dashboard;
