import { ADD_USER } from './constants';

const addUser = (user) => {

   return {
      type:ADD_USER,
      user
   }

}

export default addUser;
