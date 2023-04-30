const User = require("../model/User.js");
const { hash, compare } = require("bcrypt")
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Confirm password not match! Please check your password again!.",
        });
        console.log({ salt: process.env.SALT_ROUNDS, password });
        const hashedPassword = await hash(password, Number(process.env.SALT_ROUNDS));
        const user = await User.create({ name, email, password: hashedPassword });
        return res.status(StatusCodes.OK).json({ message: "Successfully create new User!", data: user });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password, remember } = req.body;
        const select = "+password";
        const user = await User.findOne({ email: req.body.email }, select);
        if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Cannot find the user by email or password" });
        const match = await compare(password, user.password);
        if (!match) res.status(StatusCodes.UNAUTHORIZED).json({ error: "Password doesn't match" });
        user._id = user._id.toString();
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET, {
            expiresIn: '5m'
        });
        console.log({ remember, user: user._id, password })
        if (remember) {
            const refreshToken = jwt.sign({ userId: user._id, email }, process.env.REFRESH_SECRET, {
                expiresIn: '1d',
            });
            const options = {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),// 30 days
                httpOnly: true
            };
            res.cookie(process.env.COOKIE_NAME, refreshToken, options);
            await User.updateOne({ _id: user._id}, { $set: { refresh_token: refreshToken, } });
        }
        res.status(StatusCodes.OK).json({ message: "Logged in successfully!", accessToken, user })

    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies[process.env.COOKIE_NAME];
        console.log({ refreshToken });
        if (!refreshToken) return res.status(StatusCodes.FORBIDDEN).json({ error: "Not logged in, canot log out!" });
        const { _id: userId } = req.user;
        await User.updateOne({ _id: userId }, {
            $set: {
                refresh_token: null,
            }
        })
        res.clearCookie(process.env.COOKIE_NAME);
        return res.status(StatusCodes.OK).json({ message: "Logout Successfully!" });
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies[process.env.COOKIE_NAME];
        if (!refreshToken) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not logged in at all!" });
        const user = await User.findOne({ refresh_token: refreshToken });
        if (!user) return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden access! Not user" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (!user) return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden access! Not user" });

            }
            const { _id: userId, name, email } = user;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '2m',
            });

            res.status(StatusCodes.OK).json({ message: "Generated your refresh token successfully!", accessToken })
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    refreshToken, logout, login, signup
}