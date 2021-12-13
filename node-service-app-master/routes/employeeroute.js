var express= require("express");
const sequelize = require("../orm/connection");
var route = express.Router();
var model = require('../orm/model')
const { QueryTypes } = require('sequelize');
const { employees } = require("../orm/model");
const req = require("express/lib/request");


route.get("/employeesformanager",async function(request,response){
   const manager = request.query.manager

try{
   const employeesdetails = await sequelize.query(`SELECT employees.employee_id as "Employee_id", employees.name as "Name", group_concat(skills.name) as "skills", profile.name as "profile", employees.experience as "Experience", employees.manager as "Manager"   FROM employees 
   join skillmap on skillmap.employee_id =  employees.employee_id 
   join skills on skills.skillid = skillmap.skillid 
   join profile on profile.profile_id = employees.profile_id where employees.lockstatus ="not_requested" AND Manager=? group by employees.employee_id `,
   { replacements :[manager],  type: QueryTypes.SELECT});

 

   response.json(
       employeesdetails
   )
}
catch(e)
{
   console.log(e)
        response.status(500)
}
})

route.get("/employeesforwfm_manager",async function(request,response){
 
   const wfm_manager = request.query.wfm_manager
   
try{

   const employeesrequested = await sequelize.query( `Select softlock.employee_id as "Employee_id", softlock.manager as "Requestee", softlock.reqdate as "RequestDate",employees.wfm_manager as "EmployeeManager"
    FROM employees join softlock on softlock.employee_id = employees.employee_id 
    where softlock.status ="waiting" AND softlock.managerstatus="awaiting confirmation" AND employees.wfm_manager=?`,
   

   { replacements: [wfm_manager],  type: QueryTypes.SELECT});
   response.json(
      employeesrequested
   )
}
catch(e)
{
   console.log(e)
        response.status(500)
}
})

route.post("/softlockrequest",async function(request,response){
   const employee_id= request.query.id
   const manager = request.query.manager
   const requestmessage = request.query.requestmessage
try{
   console.log(requestmessage);
   const softlockmessage = await sequelize.query('Insert into softlock (employee_id,manager,reqdate,status,lastupdated,requestmessage,managerstatus)' +
   'values (?,?,CURDATE(),"waiting",CURDATE(),?,"awaiting confirmation") ',

   { replacements: [employee_id,manager,requestmessage],  type: QueryTypes.INSERT});

   const updatelockstatus= await sequelize.query(`Update employees set employees.lockstatus = "request_waiting" 
   where employees.employee_id=? `,

  { replacements: [employee_id],  type: QueryTypes.UPDATE});

   response.json(
       softlockmessage
     
   )
}
catch(e)
{
   console.log(e)
        response.status(500)
}
})

route.get("/viewdetails",async function(request,response){ 
   try{
   const employee_id = request.query.id

   const viewemployeedetails = await sequelize.query(`Select ${employee_id} as "Employee_id", softlock.manager as "Requestee", 
   employees.wfm_manager as "EmployeeManager", softlock.requestmessage as "RequestDescription", softlock.status as "Status"  
   FROM employees join softlock on softlock.employee_id = employees.employee_id where softlock.employee_id = ${employee_id} `,

   { type: QueryTypes.SELECT});

   
   response.json(
     viewemployeedetails
   )
}
catch(e)
{
   console.log(e)
        response.status(500)
}
})


route.put("/statusupdate",async function(request,response){
   const status = request.query.status
   const employee_id = request.query.id
try{


   const Requestupdate = await sequelize.query('Update softlock set softlock.status = ? '+
   'where softlock.employee_id=? ',

   { replacements: [status,employee_id],  type: QueryTypes.UPDATE});
 
   const lockstatusupdate = await sequelize.query('Update employees set employees.lockstatus = "locked" '+
   'where employees.employee_id=? ',

   { replacements: [employee_id],  type: QueryTypes.UPDATE});

   response.json(
      
       Requestupdate
     
   )
}
catch(e)
{
   console.log(e)
        response.status(500)
}
})

module.exports=  route


