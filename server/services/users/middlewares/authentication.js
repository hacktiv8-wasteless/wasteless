const authentication = (req, res, next) => {
	try {
		const { access_token } = req.headers;
		const { id } = verify(access_token);
		req.users = {
			id,
		};
		next();
	} catch (error) {
        next(error)
    }
};

module.exports = authentication;