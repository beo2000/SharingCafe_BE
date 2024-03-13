import express from 'express';
import cors from 'cors';
import allRouter from './allRouter.js';
import dotenv from 'dotenv';
import options from './swagger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as userService from './APP/Service/userService.js';
import jwt from 'jsonwebtoken'
// Trái tim của app
/**
 * Source code này đang chia theo mô hình MVC - Service đứng ở giữa để handle logic
 *  Đầu vào của Server này là file server.js -> API GATEWAY
 *  QUản lí API nằm ở file allRouter.js
 *  Trong file allRouter.js -> router. 'method' (GET , POST , PUT , DELETE)
 *  Một API được cấu thành từ 2 thứ . METHOD + URL . ĐẺ 1 API hoạt động thì cần tối thiểu 2 thứ trên và có thể data đi kèm
 *  Data truyền từ UI, FE, ... tới Server phải đảm bảo đúng 2 thứ trên . METHOD + URL
 *  Data truyền vào từ client sẽ có 3 dạng
 *  Request Param : api/product/:productID -> productID sẽ là data của request param
 *  Query Param || URL re-writting (JAVA WEB) : api/product?productId=abcxyz -> productId là query params
 *  Payload || Request Body : {productId:abcxyz} -> object là data
 *   ****** Yếu tố cần là METHOD + URL ************
 *  Yếu tố đủ là Data truyền vào có hay không ? và có data trả lại hay không ?
 *  VOID HAY KHÔNG VOID     ----> VOID là function không có return !!!!
 *  VOID sẽ dùng để update / delete / có thể tạo mới hoặc không
 */
const app = express();

dotenv.config();
const specs = swaggerJSDoc(options);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Phải tìm hiểu báo cáo lại
app.use(express.json()); // Phải tìm hiểu

const getUserInfoMiddleware = async (req, res, next) => {
  const accessToken =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({
      error: 'Unauthorized - Access token missing',
      accessToken: accessToken,
    });
  }
  try {
    const decodedToken = jwt.verify(accessToken, SECRET_KEY);
    const userId = decodedToken.user_id;
    const [loginUser] = await userService.getUserInfoById(userId);
    req.loginUser = loginUser;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized - Invalid access token',
      message: error.message,
    });
  }
};

// Define an array of routes that require authentication
const authenticatedRoutes = ['/api/auth/'];

// Middleware for authentication
app.use(async (req, res, next) => {
  const requestedRoute = req.path;
  const authCheck = authenticatedRoutes.some((prefix) =>
    requestedRoute.includes(prefix),
  );
  if (authCheck) {
    await getUserInfoMiddleware(req, res, next);
  } else {
    next();
  }
});

// Routes   -> API :  METHOD + URL
// METHOD : GET  && URL : /
app.get('/', (req, res) => {
  res.send('Welcome to the Sharing_Coffee_CAPSTONE🤣🤣🤣');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// API Kích hoạt library

app.use(allRouter);

// Error Handling Middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// 404 Not Found Handling
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Start server và in log

// Một cái server muốn chạy phải có RAM, CPU , ....
// Cần một nơi hosting -> chạy app Địa chỉ của nó sẽ là : HOST:PORT
// chạy trên máy cá nhân thì HOST sẽ là localhost PORT sẽ do mình define ( dĩ nhiên tránh PORT mà app/ server khác đang chạy )
// nếu chạy trên một HOST khác thì .... phải biết HOST đó là gì
// VD: Render || môi trường deploy hiện tại của app
// API GỒM METHOD + URL
