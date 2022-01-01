import 'styles/global.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { FC, useEffect } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		// Disable rubber-band scrolling on iOS if the viewport isn't scrollable
		// Side-effect is that this breaks any touch-move-powered things, but we don't have any right now
		const touchListener = (event: TouchEvent) => document.body.scrollHeight <= document.body.clientHeight && event.preventDefault()
		document.body.addEventListener('touchmove', touchListener, { passive: false })
		return () => document.body.removeEventListener('touchmove', touchListener)
	}, [])

	useEffect(() => {
		// Fix iOS keyboard pushing up body and then *leaving it there*
		// Breaks if you scroll while in the input but who cares this is a tiny app
		let focusScrollTop: number = document.body.scrollTop

		const focusListener = () => focusScrollTop = document.body.scrollTop
		document.body.addEventListener('focus', focusListener, { passive: true, capture: true })

		const blurListener = () => {
			window.scrollTo(document.body.scrollLeft, focusScrollTop)
		}
		document.body.addEventListener('blur', blurListener, { passive: true, capture: true })

		return () => {
			document.body.removeEventListener('focus', focusListener)
			document.body.removeEventListener('blur', blurListener)
		}
	}, [])

	useEffect(() => {
		// Sync the theme-color with the preferred theme-color
		const match = window.matchMedia('(prefers-color-scheme: dark)')
		const updateThemeColor = () => {
			(document.getElementById('theme-color') as HTMLMetaElement).content = match.matches ? '#000000' : '#ffffff'
		}
		match.addEventListener('change', updateThemeColor)
		updateThemeColor()
		return () => match.removeEventListener('change', updateThemeColor)
	})

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
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='application-name' content='W&amp;B' />
				<meta name='apple-mobile-web-app-title' content='W&amp;B' />
				<meta name='theme-color' content='#ffffff' id='theme-color' />

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
