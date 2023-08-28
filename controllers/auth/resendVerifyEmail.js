const { User } = require("../../models/user");
const { sendEmail, HttpError } = require("../../utilities");
const {BASE_URL} = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user ) {
        throw HttpError(404, "User not found");
    }

    if(user.verify){
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to:email,
        subject: "Verify your email",
        html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
    }
    await sendEmail(verifyEmail);

    res.json({
        status: "success",
        code: 200,
        message: "Verification email sent",
    });
    
    }

module.exports = resendVerifyEmail;