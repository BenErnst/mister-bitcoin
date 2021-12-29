

export const ContactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact
}



const contacts = [
  {
    _id: '5a56640269f443a5d64b32ca',
    name: 'Ochoa Hyde',
    email: 'ochoahyde@renovize.com',
    phone: '5933824',
    imgNum: '60'
  },
  {
    _id: '5a5664025f6ae9aa24a99fde',
    name: 'Hallie Mclean',
    email: 'halliemclean@renovize.com',
    phone: '4642888',
    imgNum: '29'
  },
  {
    _id: '5a56640252d6acddd183d319',
    name: 'Parsons Norris',
    email: 'parsonsnorris@renovize.com',
    phone: '5023495',
    imgNum: '19'
  },
  {
    _id: '5a566402ed1cf349f0b47b4d',
    name: 'Rachel Lowe',
    email: 'rachellowe@renovize.com',
    phone: '4752312',
    imgNum: '10'
  },
  {
    _id: '5a566402abce24c6bfe4699d',
    name: 'Domin Soto',
    email: 'dominsoto@renovize.com',
    phone: '5513258',
    imgNum: '24'
  },
  {
    _id: '5a566402a6499c1d4da9220a',
    name: 'Shana Pope',
    email: 'shanapope@renovize.com',
    phone: '5273082',
    imgNum: '51'
  },
  {
    _id: '5a566402f90ae30e97f990db',
    name: 'Faulkner Flores',
    email: 'faulknerflores@renovize.com',
    phone: '5012678',
    imgNum: '61'
  },
  {
    _id: '5a5664027bae84ef280ffbdf',
    name: 'Holder Bean',
    email: 'holderbean@renovize.com',
    phone: '5032663',
    imgNum: '18'
  },
  {
    _id: '5a566402e3b846c5f6aec652',
    name: 'Rosanne Shelton',
    email: 'rosanneshelton@renovize.com',
    phone: '4543851',
    imgNum: '28'
  },
  {
    _id: '5a56640272c7dcdf59c3d411',
    name: 'Pamela Nolan',
    email: 'pamelanolan@renovize.com',
    phone: '5452166',
    imgNum: '36'
  },
  {
    _id: '5a5664029a8dd82a6178b15f',
    name: 'Roy Cantu',
    email: 'roycantu@renovize.com',
    phone: '5712295',
    imgNum: '67'
  },
  {
    _id: '5a5664028c096d08eeb13a8a',
    name: 'Ollie Christian',
    email: 'olliechristian@renovize.com',
    phone: '4193550',
    imgNum: '59'
  },
  {
    _id: '5a5664026c53582bb9ebe9d1',
    name: 'Nguyen Walls',
    email: 'nguyenwalls@renovize.com',
    phone: '4713181',
    imgNum: '41'
  },
  {
    _id: '5a56640298ab77236845b82b',
    name: 'Glenna Santana',
    email: 'glennasantana@renovize.com',
    phone: '4672376',
    imgNum: '32'
  },
  {
    _id: '5a56640208fba3e8ecb97305',
    name: 'Malone Clark',
    email: 'maloneclark@renovize.com',
    phone: '5652557',
    imgNum: '48'
  },
  {
    _id: '5a566402abb3146207bc4ec5',
    name: 'Floyd Rutledge',
    email: 'floydrutledge@renovize.com',
    phone: '5973629',
    imgNum: '37'
  },
  {
    _id: '5a56640298500fead8cb1ee5',
    name: 'Grace James',
    email: 'gracejames@renovize.com',
    phone: '5252529',
    imgNum: '30'
  },
  {
    _id: '5a56640243427b8f8445231e',
    name: 'Tanner Gates',
    email: 'tannergates@renovize.com',
    phone: '5912291',
    imgNum: '13'
  },
  {
    _id: '5a5664025c3abdad6f5e098c',
    name: 'Lilly Conner',
    email: 'lillyconner@renovize.com',
    phone: '5873812',
    imgNum: '25'
  },
  {
    _id: '5a5664025c4ftnbt3k9c014c',
    name: 'Amy Dimler',
    email: 'amydimler@renovize.com',
    phone: '5273392',
    imgNum: '54'
  }
];
// imgId from pravatar.cc

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  })
}

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    var contactsToReturn = contacts;
    if (filterBy && filterBy.term) {
      contactsToReturn = filter(filterBy.term)
    }
    resolve(sort(contactsToReturn))
  })
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    const contact = contacts.find(contact => contact._id === id)
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
  })
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex(contact => contact._id === id)
    if (index !== -1) {
      contacts.splice(index, 1)
    }

    resolve(contacts)
  })
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex(c => contact._id === c._id)
    if (index !== -1) {
      contacts[index] = contact
    }
    resolve(contact)
  })
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    contact._id = _makeId()
    contacts.push(contact)
    resolve(contact)
  })
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: ''
  }
}

function filter(term) {
  term = term.toLocaleLowerCase()
  return contacts.filter(contact => {
    return contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
  })
}



function _makeId(length = 10) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}