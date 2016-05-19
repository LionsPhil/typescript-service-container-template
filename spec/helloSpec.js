describe("Hello", function() {
	var hello = require('../hello.js');

	it("should be a friendly greeting", function() {
		expect(hello.greeting()).toEqual("Hello world!");
	});
});
