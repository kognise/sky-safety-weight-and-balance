import 'styles/global.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { FC } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Sky Safety W&amp;B</title>
				
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#143588' />
				<link rel='shortcut icon' href='/favicon.ico' />
				<meta name='msapplication-TileColor' content='#143588' />
				<meta name='msapplication-config' content='/browserconfig.xml' />
				<meta name='theme-color' content='#ffffff' />
				<meta name='mobile-web-app-capable' content='yes' />
			</Head>

			<Component {...pageProps} />
		</>
	)
}

export default App
