const shortId = require("shortid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const rezult = await fs.readFile(contactsPath);
  const listContacts = JSON.parse(rezult);
  return listContacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const rezult = contacts.find((item) => item.id === id);
  if (!rezult) {
    return null;
  }
  return rezult;
};

const addContact = async (name, email, phone) => {
  let isError = false;
  const data = { id: shortId.generate(), name, email, phone };
  if ([name, email, phone].some((item) => Boolean(item) === false)) {
    const checkObj = Object.entries(data);
    checkObj.forEach((item) => {
      if (!item[1]) {
        isError = true;
        return console.log(`${item[0]} не введен или введен неправильно!`);
      }
    });
    return null;
  }

  if (!isError) {
    const contacts = await listContacts();
    contacts.push(data);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return data;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const delContact = contacts[idx];
  contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return delContact;
};

const contacts = { listContacts, getContactById, removeContact, addContact };

module.exports = contacts;
