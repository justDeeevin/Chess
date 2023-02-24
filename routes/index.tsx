import { Head } from "$fresh/runtime.ts";
import Board from "../islands/board.tsx";

export default function Home() {

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
				<meta property="twitter:card" content="summary"/>
				<meta property="twitter:title" content="Devin's Chess Project!"/>
				<meta property="twitter:description" content="A work-in-progress chess game"/>
				<meta property="twitter:site" content="https://devinchess.deno.dev"/>
				<meta property="twitter:image" content="https://devinchess.deno.dev/img/embed-image.png"/>
			</Head>
			<Board/>
		</>
	);
}
