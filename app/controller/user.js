const { User } = require("../actions");

const getUsers = (req, res) => {
	User.getAllUsers().then((users) => {
		res.status(200).json(users);
	}).catch((e) => {
		res.status(400).json(e);
	});
};


const getUser = (req, res) => {

	User.getUserById(req.params.id).then((user) => {
		if (!user) res.status(404).json({ "message": "User does not exist" });
		res.status(200).json(user);
	}).catch((e) => {
		res.status(400).json(e);
	});

};

const updateUser = (req, res) => {
	User.updateUserById(req.params.id, req.body).then((user) => {
		if (!user) res.status(404).json({ "message": "User does not exist" });
		res.status(200).json(user);
	}).catch((e) => {
		res.status(400).json(e);
	});

};

const deleteUser = (req, res) => {
	User.deleteUserById(req.params.id).then((user) => {
		if (!user) res.status(404).json({ "message": "User does not exist" });
		res.status(200).json({ "message": "User deleted seccessfully" });
	}).catch((e) => {
		res.status(400).json(e);
	});
};


const me = (req, res) => {
	res.status(200).json(req.user);
};

const updateMe = (req, res) => {
	User.updateUserById(req.user._id, req.body).then((user) => {
		if (!user) res.status(404).json({ "message": "User does not exist" });
		res.status(200).json(user);
	}).catch((e) => {
		res.status(400).json(e);
	});

};

const createUser = (req, res) => {
  console.log(req.body);
  const data = req.body
  User.createUser(data).then((user) => {
      res.status(201).json(user);
  }).catch((error) =>{
      console.log(error);
      res.status(400).json(error)
  });
};

module.exports = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	me,
  updateMe,
  createUser,
};
