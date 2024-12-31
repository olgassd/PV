import React, { useEffect, useState } from 'react'
import ApiManager from '../Api'
import { IoMdAddCircle } from "react-icons/io";
import { MdEdit,MdDelete  } from "react-icons/md";

export const Users = () => {
    const [Utilisateurs,setUtilisateurs]=useState([])
    const [form,setform]=useState({firstname:"",lastname:"",email:"",username:"",password:"",confirmPassword:""})
    const [desId,setdesId]=useState(0);
    const [showAddEdit,setShowAddEdit]=useState(false)
    const [isdelete,setIsDelete]=useState(false)
    const [message,setMessage]=useState("")
    const [role,setrole]=useState(0)
    const getUtilisateurs=()=>{
        ApiManager.get("/api/private/admins?firstname=&lastname=&username=&page=0&size=10&sort=username,asc").then((res)=>{
            setUtilisateurs(res.data.data.content)
            console.log(res.data.data);
        }).catch((e)=>{console.log(e);
        })
    }

    useEffect(()=>{
        getUtilisateurs()
    },[])

    const handleform=(e)=>{
        const {name,value}=e.target;
        setform({...form,[name]:value})
    }

    const postDes=(e)=>{
        e.preventDefault()

        var adddata ={
            firstname:form.firstname,
            lastname:form.lastname,
            email:form.email,
            username:form.username,
            password:form.password,
            rolesId:[role]
        }

        var editdata ={
            firstname:form.firstname,
            lastname:form.lastname,
            email:form.email,
            username:form.username,
            rolesId:[role]
        }
        
        if(desId==0){
            if(form.firstname&&form.lastname&&form.email&&form.username&&form.password&&form.password==form.confirmPassword ){
                ApiManager.post("/api/private/admins/create",adddata).then(res=>{
                    console.log(res.data);
                    setShowAddEdit(false)
                    setform({firstname:"",lastname:"",email:"",username:"",password:"",confirmPassword:""})
                    getUtilisateurs()
                    setMessage("")
                }).catch((e)=>{console.log(e);
                })
            }else if(!form.firstname||!form.lastname||!form.email||!form.username||form.password){
                setMessage("tous les champs sont obligatoires")
            }else if(form.password!=form.confirmPassword){
                setMessage("passwords not match")
            }
        }else{
            ApiManager.put("/api/private/admins/"+desId+"/update",editdata).then(res=>{
                console.log(res.data);
                setShowAddEdit(false)
                setform({firstname:"",lastname:"",email:"",username:"",password:"",confirmPassword:""})
                getUtilisateurs()
                setMessage("")
            }).catch((e)=>{console.log(e);
            })
        }
    }

    const deleteDes=(e)=>{
        e.preventDefault()
        ApiManager.delete("/api/private/admins/"+desId+"/delete").then(res=>{
            console.log(res.data);
            setShowAddEdit(false)
            setIsDelete(false)
            getUtilisateurs()
            setMessage("")
        })
    }

  return (
    <div className="container">
      <div className="contentdiv">
                <div className='contentTitle' style={{display:"flex",justifyContent:'space-between'}}>
                  <div style={{margin:"auto 0"}}>
                    Gestion d'utilisateur
                  </div>
                  <div style={{width:"100px",cursor:'pointer',borderRadius:'4px',padding:'10px',display:"flex",background:'#f08011',color:'white',alignItems:'center',justifyContent:"center"}} onClick={()=>{setShowAddEdit(true);setdesId(0);setform({firstname:"",lastname:"",email:"",username:"",password:"",});setMessage('')}}>
                      <span>Ajouter</span>
                      <IoMdAddCircle style={{fontSize:'22px',padding:"0 0 0 10px",margin:"auto 0"}}/>
                  </div>
                  </div>
            
            <div className="home_content">
                <div className="home_ticketHeader">
                    <div className="home_ticketHeaderItem" style={{width:"15%"}}>Nom et prenom</div>
                    <div className="home_ticketHeaderItem" style={{width:"15%"}}>Nom d'utilisateur</div>
                    <div className="home_ticketHeaderItem" style={{width:"50%"}}>Email</div>
                    <div className="home_ticketHeaderItem" style={{width:"10%"}}>Actions</div>
                </div>
                {Utilisateurs.map((des,index)=>(<div className="home_ticketRow" key={index}>
                    <div className="home_ticketItem" style={{width:"15%"}}>{des.firstname} {des.lastname}</div>
                    <div className="home_ticketItem" style={{width:"15%"}}>{des.username}</div>
                    <div className="home_ticketItem" style={{width:"50%"}}>{des.email}</div>
                    <div className="home_ticketItem" style={{width:"10%",display:'flex'}}>
                        <div onClick={()=>{setShowAddEdit(true);setdesId(des.id);
                            setform(des);setrole(des.rolesId)
                        }}>
                            <MdEdit style={{fontSize:'22px',padding:'5px',margin:'0 5px 0 0',border:"1px solid rgba(111,111,111,.3)",borderRadius:'4px'}}/>
                        </div>
                        <div onClick={()=>{setIsDelete(true);setdesId(des.id)}}>
                            <MdDelete style={{fontSize:'22px',padding:'5px',border:"1px solid rgba(111,111,111,.3)",borderRadius:'4px'}}/>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
        <div style={{position:"fixed",width:'100%',height:'100%',display:showAddEdit?'flex':"none",top:'0',right:'0',alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)"}}>
            <form onSubmit={postDes} style={{background:'white',padding:'10px',borderRadius:'5px'}}>
                <div>
                    <input style={{padding:'10px',width:"360px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}} type="text" placeholder='Nom' name='firstname' value={form.firstname} onChange={handleform} />
                    <input style={{padding:'10px',width:"360px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}} type="text" placeholder='Prenom' name='lastname' value={form.lastname} onChange={handleform} />
                </div>
                <div>
                </div>
                <div>
                    <input style={{padding:'10px',width:"360px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}} type="text" placeholder='Email' name='email' value={form.email} onChange={handleform} />
                    <input style={{padding:'10px',width:"360px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}} type="text" placeholder="Nom d'Utilisateur" name='username' value={form.username} onChange={handleform} />
                </div>
                {desId==0?<div>
                    <input style={{padding:'10px',width:"360px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}} type="password" placeholder='password' value={form.password} name='password' onChange={handleform} />
                    <input style={{padding:'10px',width:"360px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}} type="password" placeholder="confirmPassword" name='confirmPassword' onChange={handleform} />
                </div>:<></>}
                <div>
                  <select onChange={(e)=>setrole(e.target.value)} style={{padding:'10px',width:"382px",margin:'5px',borderRadius:'4px',border:'1px solid rgba(111,111,111,.3)'}}>
                    <option value={1}>Admin</option>
                    <option value={2}>Consultant</option>
                  </select>
                </div>
                <div style={{padding:'10px',textAlign:'center',fontWeight:600,color:'red'}}>{message}</div>
                <div style={{display:'flex'}}>
                    <button style={{padding:'5px 10px',margin:'5px',width:'100px',border:'1px solid rgba(111,111,111,.2)',background:'#f08011',color:'white',borderRadius:'4px'}} type='submit'>{desId==0?"Ajouter":"Modifier"}</button>
                    <div style={{padding:'5px 10px',textAlign:'center',margin:'5px',width:'90px',cursor:'pointer',border:'1px solid rgba(111,111,111,.2)',borderRadius:'4px'}} onClick={()=>{setIsDelete(false);setShowAddEdit(false);setdesId(0);setform(({name:'',email:''}))}}>Annuler</div>
                </div>
            </form>
        </div>
        <div style={{position:"fixed",width:'100%',height:'100%',display:isdelete?'flex':"none",top:'0',right:'0',alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)"}}>
            <form onSubmit={deleteDes} style={{background:'white',padding:'10px',borderRadius:'5px'}}>
                <div style={{margin:'5px',width:'300px'}}>Supprimer ce Utilisateurs</div>
                <button style={{padding:'5px 10px',margin:'5px',width:'100px',border:'1px solid rgba(111,111,111,.2)',background:'red',color:'white',borderRadius:'4px'}} onClick={()=>{ApiManager.delete("/api/Utilisateurs/"+desId).then((res)=>{getUtilisateurs();setIsDelete(false),setdesId(0)})}}>Supprimer</button>
                <button style={{padding:'5px 10px',margin:'5px',width:'100px',border:'1px solid rgba(111,111,111,.2)',borderRadius:'4px'}} onClick={()=>{setIsDelete(false);setShowAddEdit(false);setdesId(0);setMessage('')}}>Annuler</button>
            </form>
        </div>
    </div>

  )
}
