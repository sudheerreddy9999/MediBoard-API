'use strict';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app/app.config.js';
const GenerateToken = (data) => {
  try {
    const token = jwt.sign(data, AppConfig.JWTSECRETKEY, { expiresIn: AppConfig.JWTEXPIRYTIME });
    return token;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const VerifyToken = (request, response, next) => {
  try {
    const token = request.get('Authorization').split(' ')[1];
    if (!token) {
      return response.status(401).json({ message: 'Not Authorized' });
    }
    const decodedToken = jwt.verify(token, AppConfig.JWTSECRETKEY);
    request.employee_id = decodedToken.employeeId;
    request.role = decodedToken.role.trim();
    const userId = decodedToken.userId;
    request.userId = userId;
    next();
  } catch (error) {
    console.error(error.message);
    return response.status(401).json({ message: 'InValid Token', technicalError: error.message });
  }
};

const JWT = { GenerateToken, VerifyToken };
export default JWT;
