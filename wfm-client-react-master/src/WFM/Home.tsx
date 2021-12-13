import axios from "axios"
import React from "react"


import {useEffect,useState} from "react"




const WFMHome=()=>{
    const [Employee_id,setid]=useState("")
    const[display,setDisplay]=useState("none")
    const[tabledisplay,settableDisplay]=useState("block")
    const[status,setstatus]=useState("")
    const [viewData,setViewData] =useState([{Employee_id:"",Requestee:"",EmployeeManager:"",RequestDescription:"",Status:""}])
    type Employee={
        Employee_id:number;
        Requestee:string;
        RequestDate:Date;
        EmployeeManager:string;
        RequestDescription:string;
        
    }
    

    async function showdetails(id:any){
        setid(id)
        setDisplay("block")
        settableDisplay("none")
   
            try{
                 let response =
                await axios.get("http://localhost:8000/employees/viewdetails?id="+id)
                setViewData(response.data)
             
             }
                     
            catch(e){
                       setViewData([])
                   }
               }
    
    
    async function closeform(){
        employeeRead();
      }
        
    async function employeeRead(){
        try{
            const wfm_manager = localStorage.getItem("username")
            let response =
              await axios.get("http://localhost:8000/employees/employeesforwfm_manager?wfm_manager="+wfm_manager)
              setEmployeeData(response.data)
            
              setid(response.data.Employee_id)
         
          }
          
        catch(e){
            setEmployeeData([])
        }
    }
  
            async function statusupdate(){
                try{
                
                    let response =
                      await axios.put("http://localhost:8000/employees/statusupdate?status="+status+"&id="+Employee_id)
                     setViewData(response.data)
                     alert("Softlock request confirmed")
                  
                  }
                  
              catch(e){
                   setViewData([])
               }
           }                                
    useEffect(()=>{
        employeeRead()
       
   },[]
       
   )

  
   const [employeeData,setEmployeeData] =useState([])
   return(
        
        <div>
         <table className="table" id="tbl" style={{display:tabledisplay}}>
         
        <div>
            <br/>
            <h1>Welcome WFM_Manager</h1><br/>
           <h5>Requests awaiting for approval</h5>
        </div>
        <br/>
        <br/>
    
    <thead >
        <tr id="tr" >
        <th>Employee_id</th>
        <th>Requestee</th>
        <th>Requeste Date</th>
        <th>Employee Manager</th>
        <th></th>
        </tr>
    </thead>
    <tbody>
        {
            employeeData.map((x:Employee)=>{
              return(
                <tr >
                    <td>{x.Employee_id}</td>
                    <td>{x.Requestee}</td>
                    <td>{x.RequestDate}</td>
                    <td>{x.EmployeeManager}</td>
                    <td>
                    <button type="submit" className="btn btn-primary" onClick={()=>showdetails(x.Employee_id)
                    }>View Details</button>
                    </td>
                    
                </tr>
                 )
            })
        }
    </tbody>
    </table>
    <div>
    <form  style={{display:display}} >
                      <h1>Soft lock Request Confirmation</h1>
                      <h5>Status update for Request lock</h5>
                      <br/>
                      <br/>
                    <label id="label">Employee_id:</label>
                     <input type="number" readOnly value={(Employee_id)}/>
                     <br/>
                     <br/>
                    <label id="label"> Requestee: </label>
                    <input type="text" value={(viewData[0]).Requestee}readOnly/>
                    <br/>
                    <br/>
                    <label id="label"> Employee Manager: </label>
                    <input type="text" value={(viewData[0]).EmployeeManager} readOnly/> 
                    <br/>
                    <br/>
                    <label id="label"> Request Description: </label>
                    <input type="text" value={(viewData[0]).RequestDescription} readOnly/> 
                    <br/>
                    <br/>
                    <label id="label"> Status: </label>
                    <select value={status} onChange={(e)=>{setstatus(e.target.value)}}>
                        <option >Approved</option>
                        <option>Rejected</option>
                    </select>
                    <br/>
                  <br/>
                  <br/>
                    <button type="submit" id="send" className="btn btn-dark" onClick={()=>statusupdate()}>Send Request</button>
                    <button type="submit" id="close" className="btn btn-danger" onClick={()=>closeform()}>Close</button> 
                    </form>
    </div>
    </div>            
               
   )
 }


export default WFMHome;
