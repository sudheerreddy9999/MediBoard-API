'use-strict';
import UserService from '../services/user.service.js';
import logger from '../utility/logger.utility.js';

const GetAuthController = async (request, response) => {
  try {
    const data = await UserService.GetAuthService(request);
    if (data.errorCode === 401) {
      return response.status(401).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Login Success', data: data });
    }
  } catch (error) {
    logger.error({ GetAuthController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const AddNewUserController = async (request, response) => {
  try {
    const data = await UserService.AddNewUserService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage});
    } else {
      return response.status(200).json({ message: 'User Added Successfully' });
    }
  } catch (error) {
    logger.error({ AddNewUserController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const UserController = { GetAuthController, AddNewUserController };
export default UserController;
