const User = require('../model/User');

const createUser = async (data) => {
	return User.create(data);
};

const getUserByEmail = (email) => {
	return User.findOne({email});
};

const getUserById = (id) => {
	return User.findOne({id,isActive:true}).select("-password");
};

const getAllUsers = () => {
	return User.find({is_active:true}).select("-password").populate("posts");
};

const updateUserById = (id,data) =>{
	return User.findByIdAndUpdate(id,{$set:data},{new:true}).select("-password");
};

const deleteUserById =  (id)  => {
	return User.findByIdAndUpdate(id,{$set:{isActive:false}},{new:true});
};

const addMovieToUser = (id,post) => {
	return User.findByIdAndUpdate(id,{$push:{movies:movie}});
};


module.exports = {
	createUser,
	getUserByEmail,
	getUserById,
	getAllUsers,
	updateUserById,
	deleteUserById,
	addMovieToUser
};
