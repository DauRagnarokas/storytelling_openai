const mixins = require('postcss-mixins')
const nesting = require('postcss-nesting')
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const config = {
	plugins: {
		// nesting(),
		'postcss-import': {},
		'postcss-mixins': {},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {},
	},
};

module.exports = config;
