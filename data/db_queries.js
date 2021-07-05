var db = require('./db.js')

module.exports.storeContact = async function storeContact (name,email,subject,message,res) {
  let dbObj = await db.getdb;
  console.log(dbObj);
  return await dbObj.collection("Contact_Info").insertOne({"Name":name,"email":email,"Subject":subject, "Message":message}).catch(error=>{res.sendStatus(404); return;});
  }
     
