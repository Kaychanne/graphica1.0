const { request } = require("../app");

let talk = async function (
	res,
	url = "https://graphica.gajiin.my.id/api/product",
	type = "json",
	bodyData = {},
	callback = (response = new Response()) => {}
) {
	try {
		// Use fetch to make an internal request to another route
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": type === "json" ? "application/json" : "application/text",
			},
			body: type === "json" ? JSON.stringify(bodyData) : bodyData,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Internal request failed with status ${response.status}: ${errorText}`);
		}

		callback(response);
	} catch (error) {
		console.error("Error:", error.message);
		res.status(500).send("Internal Server Error");
	}
};

let com = { talk };

module.exports = com;