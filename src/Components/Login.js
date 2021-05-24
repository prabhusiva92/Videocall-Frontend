import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

function Login(props) {
    const history = useHistory()

    //Change Endpoint to local Host if You are runnign along with backend
    const url ="http://localhost:4040/"
    // const url ="https://task1-backend.herokuapp.com/"


    //State for storing Login Input & Pasword Feilds
    const [LoginUsername, setLoginUsername] = useState("")
    const [LoginPassword, setLoginPassword] = useState("")


    //State for Storing Register Input & password Feilds
    const [RegisterUsername , setRegisterUsername] = useState("")
    const [RegisterPassword1 , setRegisterPassword1] = useState("")
    const [RegisterPassword2 , setRegisterPassword2] = useState("")
    

    //Handle Submit button on Login Tab
    async function submitLogin(e){

        e.preventDefault();

        console.log("name :",LoginUsername)
        console.log("Password :",LoginPassword)

        //Fetching Username & password and Sending to server with type Login
        try{
            let output = await fetch(url,{
                method:"POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({name : LoginUsername,password : LoginPassword, SubmitType:"Login"})
            })

            let value = await output.json();

            //Checking if returning value from DB is empty when running Find
            if(Object.keys(value.dataUser).length === 0){
                alert("User Not Found")
            }else{
                //If Hash & password comparing is true Server Sends Result
                if(value.result === true){
                    console.log("Sucessfully Logging in")
                    history.push('/dashboard')
                    console.log(value.dataUser)
                    props.setUserID(value.dataUser[0]._id)
                }
                else{
                    alert("Password Incorrect")
                }
            }
        }catch(err){
            console.log(err)
        }

    }

     //Handle Submit button on Register Tab
    async function submitRegister(e){

        e.preventDefault();

        //Checking if both Password are same when user enters before sending to DB
        if(RegisterPassword1 === RegisterPassword2){
            try{

                //Sending UserName & Password to Store in DB
                let output = await fetch(url,{
                    method:"POST",
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify({name : RegisterUsername,password : RegisterPassword1, SubmitType:"Register"})
                })
    
                let value = await output.json();
                console.log("Value in Register : ",value)

                alert("User Sucessfully Registered")
                alert("You Can Login Now")

                //Clearing Input Feilds after sending data to server
                setRegisterUsername("")
                setRegisterPassword1("")
                setRegisterPassword2("")

            }catch(err){
                console.log(err)
            }
        }else{
            alert("Passwords Do Not Match")
        }
            }

    return (
        <div id="main">
            {/* Login Tab for User Login */}
            <div className="content">
                <div className="heading">Login</div>
                <div>
                    <input type="text" id="LoginName"  placeholder="Enter Your User Name" onChange={e => setLoginUsername(e.target.value)} ></input>
                </div>
                <div>
                    <input type="password" id="LoginPassword"  placeholder="Enter Your Password" onChange={e => setLoginPassword(e.target.value)}></input>
                </div>
                {/* <div>
                <input type="text" id="RoomId"  placeholder="Enter A Room ID" onChange={e => props.setLoginRoomID(e.target.value)} ></input>
                </div> */}
                    <button type="submit" id="btn" onClick={submitLogin}>Submit</button>
            </div>

            {/* Registration  Tab for User Registration */}
            <div className="content">
                <div className="heading">Registration</div>
                <div>
                    <input type="text" id="RegisterName"  placeholder="Enter A User Name" onChange={e => setRegisterUsername(e.target.value)} value={RegisterUsername}></input>
                </div>
                <div>
                    <input type="password" id="RegisterPassword1"  placeholder="Enter A Password" onChange={e => setRegisterPassword1(e.target.value)} value={RegisterPassword1} ></input>
                </div>
                <div>
                    <input type="password" id="RegisterPassword2"  placeholder="Enter The Password Again" onChange={e => setRegisterPassword2(e.target.value)} value={RegisterPassword2} ></input>
                </div>
                    <button type="submit" id="btn1" onClick={submitRegister}>Submit</button>
            </div>
        </div>
    )
}

export default Login
