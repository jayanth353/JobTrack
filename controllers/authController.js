import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        throw new BadRequestError("Please provide all values");
    }
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new BadRequestError("email already taken");
    }
    const user = await User.create({ name, password, email });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token,
        location: user.location,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Provide all values");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new UnauthenticatedError("Wrong credentials");
    }
    //console.log(user);
    const isPwdCrt = await user.comparePassword(password);
    if (!isPwdCrt) {
        throw new UnauthenticatedError("Wrong credentials");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, location: user.location, token });
};
const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError("Please provide all values");
    }

    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    // various setups
    // in this case only id
    // if other properties included, must re-generate

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user,
        token,
        location: user.location,
    });
};

export { login, register, updateUser };
