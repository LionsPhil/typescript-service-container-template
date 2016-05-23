describe("Hello", () => {
	var hello = require('../hello.js');

	it("should be a friendly greeting", () => {
		expect(hello.greeting()).toEqual("Hello world!");
	});
});
