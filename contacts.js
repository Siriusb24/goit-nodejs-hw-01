const {v4} = require('uuid')
const fs = require('fs/promises');
const path = require('path');

 const contactsPath = path.join(__dirname,"db", "contacts.json");
 
 
 //console.log(filePath)
 
 async function listContacts() {
   try{
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data)  
      //console.log(contacts)
      return console.table(contacts)
   }catch(error){
    console.error(error.message);
   }
  };

//listContacts().then(data => console.log(data))
  
async function getContactById(contactId){
  try{
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data)  
      //console.log(contacts)
      const contact = contacts.find(contact => contact.id === contactId)
      if(!contact){
          return null
      }
      //console.log(contact)
      return console.table(contact) 
    }catch(error){
      console.error(error.message);
    }
  }

//getContactById('5').then(contact => console.log(contact))
  
  
const removeContact = async (contactId) => {
  try{
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    //console.log(contacts) 
    const index = await contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    updateContacts(contacts);
    console.table(removedContact);
    console.log("\x1b[32m Successfully remuved");
  } catch (error){
    console.error(error.message);
  }
  }; 

//removeContact("2").then(data => console.log(data)) 
  
async function addContact(name, email, phone) {
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath);
    const addContacts = JSON.parse(data) 
    //console.log(addContacts)
    const contacts = [...addContacts, newContact];
    console.log(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.table(contacts);
    console.log("\x1b[32m Successfully added");
  } catch (error) {
    console.error(error.message);
  }
}

  const updateContacts = async (contacts)=>{
    await fs.writeFile(contactsPath, JSON.stringify(contacts)); 
  }

 //addContact("Jon", "john24@gmail.com", "098456443").then(data => console.log(data))   

 module.exports = {
   listContacts,
    getContactById,
    removeContact,
    addContact,
  }