'use strict';

import UserDTO from '../dto/user.dto.js';
import JWT from '../middlewares/jwt.middleware.js';
import customUtility from '../utility/custom.utility.js';
import bcrypt from 'bcrypt';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;
const GetAuthService = async (request) => {
  try {
    const { email, password } = request.headers;
    const data = await UserDTO.GetUserByEmailDTO(email);
    if (data.length === 0) {
      return customExceptionMessage(401, 'User does not exist');
    }
    const comparePasssword = await bcrypt.compare(password, data[0].password);
    if (!comparePasssword) {
      return customExceptionMessage(401, 'Invalid password please check the password');
    }
    const userData = { userId: data[0].user_id };
    const token = JWT.GenerateToken(userData);
    const userDetails = {
      userId: data[0].user_id,
      first_name: data[0].first_name,
      last_name: data[0].last_name,
      email: data[0].email,
      mobile_number: data[0].mobile_number,
    };
    return {token,userDetails};
  } catch (error) {
    logger.error({ GetAuthService: error.message });
    throw new Error(error.message);
  }
};
const AddNewUserService = async (request) => {
  try {
    const { first_name, last_name, email, password, mobile_number } = request.body;

    const GetUserByEmail = await UserDTO.GetUserByEmailDTO(email);
    if (GetUserByEmail.length > 0) {
      return customExceptionMessage(400, 'User already exist with this email');
    }
    const GetUserByNumber = await UserDTO.GetUserByEmailDTO(null, mobile_number);
    if (GetUserByNumber.length > 0) {
      return customExceptionMessage(400, 'User already exist with this mobile number');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await UserDTO.AddNewUserDTO(first_name, last_name, email, hashedPassword, mobile_number);
    return data;
  } catch (error) {
    logger.error({ AddNewUserService: error.message });
    throw new Error(error.message);
  }
};

const GetUserByIdService = async (request) => {
  try {
    const {user_id} = request.headers;
    const data = await UserDTO.GetUserByIdDTO(user_id);
    return data;
  } catch (error) {
    logger.error({ GetUserByIdService: error.message });
    throw new Error(error.message); 
  }
}

const UserService = { GetAuthService, AddNewUserService, GetUserByIdService };

export default UserService;
