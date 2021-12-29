const withPWA = require('next-pwa')

module.exports = withPWA({
	headers: async () => [
		{
			source: '/:anything*',
			headers: [
				{
					key: 'X-Clacks-Overhead',
					value: 'GNU Terry Pratchett'
				}
			]
		}
	],
	future: {
		webpack5: true
	}
})
