// // DbHelper.js

// import pkg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();

// const { Pool } = pkg;

// const DB_HOST = process.env.DB_HOST;
// const DB_PORT = process.env.DB_PORT;
// const DB_DATABASE = process.env.DB_DATABASE;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;

// console.log(
//   '~~~~DB_HOST',
//   DB_HOST,
//   '~~~~DB_PORT',
//   DB_PORT,
//   '~~~~DB_DATABASE',
//   DB_DATABASE,
//   '~~~~DB_USER',
//   DB_USER,
//   '~~~~DB_PASSWORD',
//   DB_PASSWORD,
// );

// const pool = new Pool({
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_DATABASE,
//   user: DB_USER,
//   password: DB_PASSWORD,
// });

// export { pool };

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
console.log(
  '~~~~DB_HOST',
  DB_HOST,
  '~~~~DB_PORT',
  DB_PORT,
  '~~~~DB_DATABASE',
  DB_DATABASE,
  '~~~~DB_USER',
  DB_USER,
  '~~~~DB_PASSWORD',
  DB_PASSWORD,
);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
export const User = sequelize.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
  profileAvatar: {
    type: DataTypes.TEXT,
  },
  bio: {
    type: DataTypes.JSON,
  },
  registration: {
    type: DataTypes.DATE,
  },
  roleId: {
    type: DataTypes.UUID,
  },
});
export const Role = sequelize.define('Role', {
  roleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roleName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
export const GoogleLogin = sequelize.define('GoogleLogin', {
  googleLoginId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  token: {
    type: DataTypes.TEXT,
  },
  expiry: {
    type: DataTypes.DATE,
  },
});

export const Notification = sequelize.define('Notification', {
  notificationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  content: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});

export const Friendship = sequelize.define('Friendship', {
  friendshipId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId1: {
    type: DataTypes.UUID,
  },
  userId2: {
    type: DataTypes.UUID,
  },
  friendshipStatusId: {
    type: DataTypes.UUID,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
export const FriendshipStatus = sequelize.define('FriendshipStatus', {
  friendshipStatusId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  friendshipStatus: {
    type: DataTypes.TEXT,
  },
});
export const Blog = sequelize.define('Blog', {
  blogId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  content: {
    type: DataTypes.TEXT,
  },
  likesCount: {
    type: DataTypes.INTEGER,
  },
  commentsCount: {
    type: DataTypes.INTEGER,
  },
  isApprove: {
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
export const Comment = sequelize.define('Comment', {
  commentId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  blogId: {
    type: DataTypes.UUID,
  },
  userId: {
    type: DataTypes.UUID,
  },
  content: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
export const Message = sequelize.define('Message', {
  messageId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.UUID,
  },
  receiverId: {
    type: DataTypes.UUID,
  },
  content: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
  },
});
export const Event = sequelize.define('Event', {
  eventId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  organizerId: {
    type: DataTypes.UUID,
  },
  title: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  timeOfEvent: {
    type: DataTypes.DATE,
  },
  location: {
    type: DataTypes.TEXT,
  },
  participantsCount: {
    type: DataTypes.INTEGER,
  },
  isApprove: {
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
export const EventParticipation = sequelize.define('EventParticipation', {
  participationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.UUID,
  },
  userId: {
    type: DataTypes.UUID,
  },
  eventParticipationStatusId: {
    type: DataTypes.UUID,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
const EventParticipationStatus = sequelize.define('EventParticipationStatus', {
  eventParticipationStatusId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eventParticipationStatus: {
    type: DataTypes.TEXT,
  },
});
export const UserStatistics = sequelize.define('UserStatistics', {
  statisticsId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  loginCount: {
    type: DataTypes.INTEGER,
  },
  blogCount: {
    type: DataTypes.INTEGER,
  },
  eventCount: {
    type: DataTypes.INTEGER,
  },
  messageCount: {
    type: DataTypes.INTEGER,
  },
  friendCount: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
export const BlogReport = sequelize.define('BlogReport', {
  reportId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  reporterId: {
    type: DataTypes.UUID,
  },
  blogId: {
    type: DataTypes.UUID,
  },
  content: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  reportStatusId: {
    type: DataTypes.UUID,
  },
});
export const EventReport = sequelize.define('EventReport', {
  reportId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  reporterId: {
    type: DataTypes.UUID,
  },
  eventId: {
    type: DataTypes.UUID,
  },
  content: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  reportStatusId: {
    type: DataTypes.UUID,
  },
});
export const ReportStatus = sequelize.define('ReportStatus', {
  reportStatusId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  reportStatus: {
    type: DataTypes.TEXT,
  },
});

EventReport.belongsTo(User, { foreignKey: 'reporterId', as: 'reporter' });
EventReport.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
EventReport.belongsTo(ReportStatus, {
  foreignKey: 'reportStatusId',
  as: 'reportStatus',
});

BlogReport.belongsTo(User, { foreignKey: 'reporterId', as: 'reporter' });
BlogReport.belongsTo(Blog, { foreignKey: 'blogId', as: 'blog' });
BlogReport.belongsTo(ReportStatus, {
  foreignKey: 'reportStatusId',
  as: 'reportStatus',
});
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
UserStatistics.belongsTo(User, { foreignKey: 'userId', as: 'user' });

EventParticipation.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
EventParticipation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
EventParticipation.belongsTo(EventParticipationStatus, {
  foreignKey: 'eventParticipationStatusId',
  as: 'eventParticipationStatus',
});

Event.belongsTo(User, { foreignKey: 'organizerId', as: 'organizer' });
Event.hasMany(EventParticipation, {
  foreignKey: 'eventId',
  as: 'eventParticipations',
});

Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

Comment.belongsTo(Blog, { foreignKey: 'blogId', as: 'blog' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Blog.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Friendship.belongsTo(User, { foreignKey: 'userId1', as: 'user1' });
Friendship.belongsTo(User, { foreignKey: 'userId2', as: 'user2' });
Friendship.belongsTo(FriendshipStatus, {
  foreignKey: 'friendshipStatusId',
  as: 'friendshipStatus',
});
GoogleLogin.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default sequelize;
