import axios from "axios"
import React from "react"

import { useEffect, useState,useRef, MutableRefObject } from "react"
import "../index.css"

type Employee={
    Employee_id:number;
    Name:string;
    skills:string;
    profile:string;
    Experience:string;
    Manager:string;
}

type Softlock={
    requestmessage:string;
    
}


const ManagerHome=()=>{
    
         const [Employee_id,setid]=useState("")
         const [Manager,setManager]=useState("")
         const[softlock,setSoftlock]=useState("")
         const[display,setDisplay]=useState("none")
         const[tabledisplay,settableDisplay]=useState("block")
        async function employeeRead(){
            try{
                const manager = localStorage.getItem("username")
                let response =
                  await axios.get("http://localhost:8000/employees/employeesformanager?manager="+manager)
                  setEmployeeData(response.data)
                
             
              }
            catch(e){
                setEmployeeData([])
            }
        }
      
   
   
    
    async function showform(id:any,manager:any){
        setid(id)
        setManager(manager)
        setDisplay("block")
        settableDisplay("none")
      
    }
    async function closeform(){
      employeeRead();
    }


    

    async function addSoftlockRequest(id:any,manager:any){
        try{
          
       
          const response= await axios.post("http://localhost:8000/employees/softlockrequest?id="+id+"&manager="+manager+"&requestmessage="+softlock)
          alert("Softlock Request Sended Successfully")
          employeeRead();
         
        }
        catch(e){
            alert("Not able to send the softlock request")
        }

    }


    useEffect(()=>{
        employeeRead()
   },[]
       
   )
   
   
   const [employeeData,setEmployeeData] =useState([])
 
      return(
    
    <div>
        <div>
            <br/>
            <h1>Welocome Manager</h1><br/>
            <h5>List of employees available</h5>
        </div>
        <br/>
        <br/>
    <div>
    <table className="table" id="tbl"  style={{display:tabledisplay}}>
    <thead >
        <tr id="tr">
        <th>Employee_id</th>
        <th>Name</th>
        <th>Skills</th>
        <th>Profile</th>
        <th>Experience</th>
        <th>Manager</th>
        <th></th>
        </tr>
    </thead>
    <tbody>
        {
            
            employeeData.map((x:Employee)=>{
            return(
                <tr key={x.Employee_id}>
                    <td>{x.Employee_id}</td>
                    <td>{x.Name}</td>
                    <td id="skills">{x.skills}</td>
                    <td>{x.profile}</td>
                    <td>{x.Experience}</td>
                    <td>{x.Manager}</td>
                    <td>
                    <button type="submit" className="btn btn-primary" onClick={()=>showform(x.Employee_id,x.Manager)
                    }>Request lock</button>
                    </td>
                    
                </tr>
           )
        })
    }
    </tbody>
    </table>
    </div>
  <form id="form1"  style={{display:display}} >
   
    <div  className="alert alert-info">
                        
                            <h1 id="h1">Softlock Request Confirmation</h1>
                            <br/>
                            <br/>
                            <h1>Please confirm the lock request for {Employee_id}</h1>
                            
                            <label>Request Message(message must be atleast 10 char long)</label>
                            <br/>
                             
                            <input id="text1" type="text" value={softlock}
                               onChange={(e)=>{setSoftlock(e.target.value)}}>
                            </input>
                            <br/>
                            <br/>
                           <button type="submit" id="send" className="btn btn-dark" onClick={()=>addSoftlockRequest(Employee_id,Manager)}>Send Request</button>
                           
                           <button type="submit" id="close" className="btn btn-danger" onClick={()=>closeform()}>Close</button> 
                     
                    <br/>
    </div> 
    </form>
 
    </div>
   )

    
}

export default ManagerHome;
 