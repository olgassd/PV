import React, { useContext, useState } from 'react'
import { FaUser,FaLock, FaCheck  } from "react-icons/fa";
import { useAuth } from './AuthProvider';

export const Login = () => {
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const [remember,setremember]=useState("")
    const [message,setmessage]=useState("")
    const auth = useAuth();
    const loginpost=(e)=>{
        e.preventDefault()
        var data={
            username:username,
            password:password,
            grantType:"password"
        }
        auth.loginAction(data,setmessage);
        
    }

  return (
    <div style={{display:'flex',justifyContent:"center", paddingTop:"100px"}}>
        <form onSubmit={loginpost} style={{width:"500px",boxShadow:"0 0 4px 1px rgba(111,111,111,.3)",padding:"10px",background:'white'}}>
            <div style={{display:'flex'}}>
                <img src="cedamus.png" style={{width:"100px",margin:"10px auto"}} alt="" />
            </div>
            <div style={{position:'relative'}}>
                <FaUser style={{position:'absolute',left:"20px",top:'32px',fontSize:'20px'}}/>
                <input type="text" placeholder='Username' onChange={(e)=>{setusername(e.target.value)}} style={{width:"87%",fontSize:'18px',padding:"4% 1% 4% 10%",borderRadius:'10px',margin:"2% 1%",border:"1px solid rgba(111,111,111,.3)",}} />
            </div>
            <div style={{position:'relative'}}>
                <FaLock style={{position:'absolute',left:"20px",top:'32px',fontSize:'20px'}}/>
                <input type="password" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} style={{width:"87%",fontSize:'18px',padding:"4% 1% 4% 10%",borderRadius:'10px',margin:"2% 1%",border:"1px solid rgba(111,111,111,.3)",}} />
            </div>
            <div style={{padding:"10px 2%",display:"flex"}}>
                <div type="checkbox" name="" onClick={()=>{setremember(!remember)}} style={{width:"22px",height:'22px',border:"1px solid rgba(111,111,111,.3)",borderRadius:"5px",display:'flex',background:remember?"red":"white"}} >
                <FaCheck style={{margin:"auto",color:'white'}} />
                </div>
                <label onClick={()=>{setremember(!remember)}} style={{paddingLeft:'16px',margin:"auto 0",cursor:'pointer'}}>
                    Remember me
                </label> 
            </div>
            <button type="submit" value="Connexion" style={{display:"block",width:"98%",padding:"12px 0",fontSize:'18px',margin:"2% 1%",border:"1px solid red",borderRadius:"4px",background:"red",color:"white",textAlign:"center",cursor:'pointer'}} >Connexion</button>
            <div style={{textAlign:"center",padding:'10px',color:'red'}}>
                {message}
            </div>
        </form>
    </div>
  )
}
