const paginator = (model, item) => async (req, res, next) => {
	let query = model.find();
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await model.countDocuments();
	query = query.skip(startIndex).limit(limit);
	const results = await query;
	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		};
	}
	if (startIndex > 0) {
			pagination.prev = {
			page: page - 1,
			limit
		};
	}
	pagination.links = {
		current: `${req.protocol}://${req.get('host')}/api/v1/${item}?page=${page}&limit=${limit}`,
		first: `${req.protocol}://${req.get('host')}/api/v1/${item}?page=1&limit=${limit}`,
		next: pagination.next ? `${req.protocol}://${req.get('host')}/api/v1/${item}?page=${pagination.next.page}&limit=${pagination.next.limit}` : null,
		last: `${req.protocol}://${req.get('host')}/api/v1/${item}?page=${Math.ceil(total / limit)}&limit=${limit}`
	}; 
	//convert item first character to upper case
	const itemUpper = item.charAt(0).toUpperCase() + item.slice(1);
	res.payload = {
		success: true,
		message: `${itemUpper} retrieved successfully`,
		count: results.length,
		pagination,
		data: results
	};
	next();
}

module.exports = paginator;