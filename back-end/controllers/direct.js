const Direct = require('../models/direct');
const User = require('../models/user');
const io = require('../socket');

exports.createDirect = async (req, res, next) => {
  const userId = req.userId;
  const targetId = req.body.targetId;
  const message = req.body.message;

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetId);

  const userIsInContacts = user.activeDirectUsers.includes(targetId);
  const targetIsInContacts = targetUser.activeDirectUsers.includes(userId);

  const direct = new Direct({
    creator: userId,
    reciver: targetId,
    message: message,
  });

  const key = `${direct.creator}-${direct.reciver}`;

  await direct.save();
  user.directs.push(direct);
  if (!userIsInContacts) {
    user.activeDirectUsers.push(targetId);
  }
  if (!targetIsInContacts) {
    targetUser.activeDirectUsers.push(userId);
  }
  await user.save();
  await targetUser.save();

  await io.getIo().to(userId.toString()).emit('directs', {
    action: 'new',
    key,
    direct,
  });
  await io.getIo().to(targetId.toString()).emit('directs', {
    action: 'new',
    key,
    direct,
  });
  res.status(200).json({
    user,
  });
};

exports.fetchDirectMessages = async (req, res, next) => {
  const userId = req.userId;

  const userDirectMessages = await Direct.find({
    creator: userId,
  });

  const contactsDirectMessages = await Direct.find({
    reciver: userId,
  });

  const allMessages = [...userDirectMessages, ...contactsDirectMessages];

  const groupedMessages = allMessages.reduce((acc, message) => {
    const key = `${message.creator}-${message.reciver}`;
    acc[key] = acc[key] || [];
    acc[key].push(message);
    return acc;
  }, {});

  const sortedMessages = allMessages.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  res.status(200).json({
    message: 'Retrived directs',
    directs: groupedMessages,
  });
};
