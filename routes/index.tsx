import { Head } from "$fresh/runtime.ts";
import Board from "../islands/board.tsx";
import MobileBoard from "../islands/mobileBoard.tsx";
import { isMobile } from 'https://deno.land/x/is_mobile@v1.0.0/mod.ts'

export default function Index() {
	// const safariIOsUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"; 
	// const chromeAndroidUserAgent = "Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36";


	return (
		<>
			<Head>
				<title>Chess</title>
				<link rel="stylesheet" href="css/index.css" />
				<link rel="icon" href="img/favicon.svg" type="image/svg"/>

				{/* Discord embed info */}
				<meta content="Devin's Chess Project!" property="og:title"/>
				<meta content="A work-in-progress chess game" property="og:description"/>
				<meta content="https://devinchess.deno.dev" property="og:url"/>
				<meta content="https://devinchess.deno.dev/img/embed-image.png" property="og:image"/>
				{/*Twitter embed info */}
				<meta name="twitter:card" content="summary"/>
				<meta name="twitter:site" content="@justDeevin"/>
				<meta name="twitter:title" content="Devin's Chess Project!"/>
				<meta name="twitter:description" content="A work-in-progress chess game"/>
				<meta name="twitter:image" content="https://devinchess.deno.dev/img/embed-image.png"/>
			</Head>
			{isMobile('') ? <MobileBoard/> : <Board/>}
			{/* <Board/> */}
		</>
	);
}
