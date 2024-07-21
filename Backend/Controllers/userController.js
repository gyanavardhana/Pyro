const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cons = require("../cons");
const logger = require("../logger/logger");

const generateSalt = async () => {
    return await bcrypt.genSalt(10);
};

const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

const createToken = (userid, secret, expiresIn = "1h") => {
    return jwt.sign({ userid }, secret, { expiresIn });
};


const signup = async (req, res) => {
    try {
        const { email, password, username } = req?.body;
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        const user = new User({
            email,
            password: hashedPassword,
            username,
            salt,
            products: [],
            favourites: [],
        });
        await user.save();
        logger.info("User Created");
        res.status(cons.created).json({ message: "User Created" });
    } catch (err) {
        if (err.code === cons.mongoerror) {
            logger.error(cons.userexists);
            return res.status(cons.conflict).json({ error: cons.userexists });
        }
        logger.error(err.message);
        res.status(cons.internalerror).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req?.body;
        const user = await User.findOne({ email });
        if (!user) {
            logger.error(cons.nouser);
            return res.status(cons.notfound).json({ error: cons.nouser });
        }
        const salt = user.salt;
        const hashedPassword = await hashPassword(password, salt);
        if (user.password === hashedPassword) {
            const token = createToken(user._id, process.env.JWT_SECRET);
            logger.info(cons.success);
            res.status(cons.ok).json({ message: cons.success, token });
        } else {
            logger.error(cons.wrongpass);
            res.status(cons.unauthorized).json({ error: cons.wrongpass });
        }
    } catch (err) {
        logger.error(cons.invalidLogin);
        res.status(cons.unauthorized).json({ error: cons.invalidLogin });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            logger.error(cons.notloggedin);
            return res.status(cons.unauthorized).json({ error: cons.notloggedin });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                logger.error(cons.invalidtoken);
                return res.status(cons.unauthorized).json({ error: cons.invalidtoken });
            }

            logger.info(cons.logoutsuccess);
            res.status(cons.ok).json({ message: cons.logoutsuccess });
        });
    } catch (err) {
        logger.error(cons.internalerror);
        res.status(cons.internalerror).json({ error: "Internal Server Error" });
    }
};

module.exports = { signup, login, logout };

