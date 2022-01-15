const contactsOperations = require("./contacts.js");

const { program } = require("commander");

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log("Список контактов");
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (contact === null) {
        return console.log(`Контакт с таким id не найден`);
      }

      console.log(`Контакт с id ${id}`);
      console.table(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );

      if (!newContact) {
        return console.log(`Контакт не добавлен`);
      } else {
        console.log(`Новый контакт добавлен`);
        console.table(newContact);
      }

      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      if (removeContact === null) {
        return console.log(`Контакт не удален`);
      }

      console.log(`Этот контакт удален`);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "contacts action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
