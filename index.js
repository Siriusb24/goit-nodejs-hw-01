const contacts = require('./contacts')

//console.log(contacts)
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const data = await contacts.listContacts()
        //console.log('Get list', data)
      break;
    case 'get':
     const contact = await contacts.getContactById(id);
      //console.log('Get Contact', contact)
      break;
    case 'add':
      const newContact = await contacts.addContact(name,email,phone)
      //console.log('add Contact', newContact)
      break;
    case 'remove':
      const removeContact = await contacts.removeContact(id)
      //console.log('remove Contact', removeContact)
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);