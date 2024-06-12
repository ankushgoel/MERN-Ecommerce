import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Admin User',
    lastName: '',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    image: 'https://dummyjson.com/icon/admin/128',
    isAdmin: true,
  },
  {
    firstName: 'Michael',
    lastName: 'Williams',
    gender: 'male',
    email: 'michael.williams@x.dummyjson.com',
    phone: '+49 258-627-6644',
    password: bcrypt.hashSync('michaelwpass', 10),
    image: 'https://dummyjson.com/icon/michaelw/128',
    isAdmin: false,
  },
  {
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'female',
    email: 'emily.johnson@x.dummyjson.com',
    phone: '+81 965-431-3024',
    password: bcrypt.hashSync('emilyspass', 10),
    image: 'https://dummyjson.com/icon/emilys/128',
    isAdmin: false,
  },
  {
    firstName: 'Sophia',
    lastName: 'Brown',
    gender: 'female',
    email: 'sophia.brown@x.dummyjson.com',
    phone: '+81 210-652-2785',
    password: bcrypt.hashSync('sophiabpass', 10),
    image: 'https://dummyjson.com/icon/sophiab/128',
    isAdmin: false,
  },
];

export default users;
