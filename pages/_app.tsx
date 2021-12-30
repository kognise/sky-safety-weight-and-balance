import 'styles/global.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { FC, useEffect } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		let disableScroll = false

		const touchListener = (event: TouchEvent) => disableScroll && event.preventDefault()
		// document.body.addEventListener('touchmove', touchListener, { passive: false })

		disableScroll = true

		return () => {
			document.body.removeEventListener('touchmove', touchListener)
		}
	}, [])

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
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='application-name' content='W&amp;B' />
				<meta name='apple-mobile-web-app-title' content='W&amp;B' />

				<link href='splashscreens/iphone5_splash.png' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
				<link href='splashscreens/iphone6_splash.png' media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
				<link href='splashscreens/iphoneplus_splash.png' media='(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)' rel='apple-touch-startup-image' />
				<link href='splashscreens/iphonex_splash.png' media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' rel='apple-touch-startup-image' />
				<link href='splashscreens/iphonexr_splash.png' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
				<link href='splashscreens/iphonexsmax_splash.png' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)' rel='apple-touch-startup-image' />
				<link href='splashscreens/ipad_splash.png' media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
				<link href='splashscreens/ipadpro1_splash.png' media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
				<link href='splashscreens/ipadpro3_splash.png' media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
				<link href='splashscreens/ipadpro2_splash.png' media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
			</Head>

			<Component {...pageProps} />
		</>
	)
}

export default App
