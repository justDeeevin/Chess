import { Head } from "$fresh/runtime.ts";
import Board from "../islands/board.tsx";

export default function Index() {
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
			<Board/>
		</>
	);
}
