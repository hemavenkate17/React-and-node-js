const e = require('cors');
const Sequelize = require('sequelize');
var sequelize=require('./connection');

var user=sequelize.define('user',{
    username:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
},{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
});


var employees =sequelize.define('employees',{
    employee_id:{
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    status:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    wfm_manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    lockstatus:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    experience:{
      type: Sequelize.INTEGER,
      allowNull:false
    },
   profile_id:{
      type: Sequelize.INTEGER,
      allowNull:false
    }
  },{
  
timestamps: false,

createdAt: false,

updatedAt: false
});

var profile =sequelize.define('profile',{
  profile_id:{
    type: Sequelize.INTEGER,
    primaryKey:true
  },
  name:{
    type: Sequelize.TEXT,
    allowNull:false
  }
},
{
timestamps: false,

createdAt: false,

updatedAt: false
});

var skillmap =sequelize.define('skillmap',{
  employee_id:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  skillid:{
    type: Sequelize.TEXT,
    allowNull:false
  }
},
{
timestamps: false,

createdAt: false,

updatedAt: false
});

var skills =sequelize.define('skills',{
  skillid:{
    type: Sequelize.INTEGER,
    primaryKey:true
  },
  name:{
    type: Sequelize.TEXT,
    allowNull:false
  }
},
{
timestamps: false,

createdAt: false,

updatedAt: false
});

var softlock =sequelize.define('Softlock',{
  employee_id:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  manager:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  reqdate:{
    type: Sequelize.DATE,
    allowNull:false,
    
  },
  status:{
    type: Sequelize.TEXT,
    allowNull:false
  },
  lastupdated:{
    type: Sequelize.DATE,
    allowNull:false,
   
  },
  lockid:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  requestmessage:{
    type: Sequelize.TEXT,
    allowNull:false
  },
 wfmremark:{
    type: Sequelize.TEXT,
    
  },
  managerstatus:{
    type: Sequelize.TEXT,
    
  },
  mgrstatuscomment:{
    type: Sequelize.TEXT,
    
  },
  mgrlastupdate:{
    type: Sequelize.DATE,
    
  }
},{

timestamps: false,

createdAt: false,

updatedAt: false
});

user.sync({force: false}).then(() => {
    
  console.log("User table Synched!!!");
});

employees.sync({force: false}).then(() => {
    
  console.log("Employees table Synched!!!");
});  
profile.sync({force: false}).then(() => {
    
  console.log("profile table Synched!!!");
});  
skillmap.sync({force: false}).then(() => {
    
  console.log("skillmap table Synched!!!");
}); 
skills.sync({force: false}).then(() => {
    
  console.log("skillstable Synched!!!");
});
softlock.sync({force: false}).then(() => {
    
  console.log("softlock table Synched!!!");
});


module.exports={user:user,employees:employees,profile:profile,skillmap:skillmap,skills:skills,softlock:softlock};
 