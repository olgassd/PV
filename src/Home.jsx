import React, { useEffect, useState } from 'react'

export const Home = () => {
  const [users,setusers]=useState([
    {
      firstname:"hamza",
      lastname:"said",
      imageurl:"person.avif"
    },
    {
      firstname:"amine",
      lastname:"amine",
      imageurl:"person.avif"
    },
  ])

  useEffect(()=>{

  })
  return (
    <div className='container'>
        <div className="contentdiv">
            <div className="contentTitle">
                Les employées
            </div>
            <div className="content">
              <div style={{display:'flex',flexWrap:'wrap'}}>
                {
                  users.map((user,index)=>{
                    return <div key={index} style={{
                      padding:"10px",
                      margin:"10px",
                      boxShadow:' 0 0 5px 1px rgba(111,111,111,.3)',
                      borderRadius:"4px"
                    }}>
                      <div style={{width:"150px",height:'150px',overflow:'hidden',display:"flex",alignItems:'center',justifyContent:"center",borderRadius:"20px"}}>
                        <img src={user.imageurl} style={{height:"100%"}} alt="" />
                      </div>
                      <div style={{textAlign:'center',fontWeight:'600',padding:'10px 0 5px'}}>{user.firstname} {user.lastname}</div>
                    </div>
                  })
                }
            </div>
            </div>
        </div>
    </div>
  )
}
