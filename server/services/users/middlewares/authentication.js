const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
	try {
		console.log(req.headers)
		const { access_token } = req.headers;
		const { id } = verifyToken(access_token);
		console.log(access_token)
		console.log(id)
		req.user = {
			id,
		};
		next();
	} catch (error) {
        next(error)
    }
    // console.log(access_token)
    const payload = verifyToken(access_token);
    // console.log(payload)
    const user = await User.findByPk(payload.id);
    req.user = {
      id: user.id,
    };
    // console.log(user)
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;