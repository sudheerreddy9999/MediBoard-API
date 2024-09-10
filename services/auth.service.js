'use strict';

import AuthDTO from '../dto/auth.dto.js';
import JWT from '../middlewares/jwt.middleware.js';
import customUtility from '../utility/custom.utility.js';
import bcrypt from 'bcrypt';

const {customExceptionMessage} = customUtility;
const GetAuthService = async (request) => {
  try {
    const { email, password } = request.headers;
    const data = await AuthDTO.GetUserByEmailDTO(email);
    if (data.length === 0) {
      return customExceptionMessage(401,"User does not exist")
    }
    const comparePasssword = await bcrypt.compare(password,data[0].password)
    if (!comparePasssword) {
      return customExceptionMessage(401,"Invalid password please check the password");
    }
    const userData = { userId: data[0].user_id };
    const token = JWT.GenerateToken(userData);
    const userDetails = {
      token: token,
      userId: data[0].user_id,
      first_name: data[0].first_name,
      last_name: data[0].last_name,
      email: data[0].email,
      mobile_number: data[0].mobile_number,
    };
    return userDetails;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
const AddNewUser = async (request) => {
  try {
    const { first_name, last_name, email, password, mobile_number } = request.body;
    const hashedPassword = await bcrypt.hash(password,6);
    const data = await AuthDTO.AddNewUser(first_name, last_name, email, hashedPassword, mobile_number);
    if (data) {
      return 200;
    } else {
      return 401;
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const AuthService = { GetAuthService, AddNewUser };

export default AuthService;
