'use-strict';
import { request, response } from 'express';
import AuthService from '../services/auth.service.js';

const GetAuthController = async (request, response) => {
  try {
    const data = await AuthService.GetAuthService(request);
    if (data.errorCode === 401) {
      return response.status(401).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Login Success' ,data:data});
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: 'internalServerError' });
  }
};

const AddNewUser = async (request, response) => {
  try {
    const data = await AuthService.AddNewUser(request);
    if (data === 401) {
      return response.status(401).json({ message: 'Failed Add new User' });
    } else {
      return response.status(200).json({ message: 'Success' });
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const AuthController = { GetAuthController,AddNewUser };
export default AuthController;
