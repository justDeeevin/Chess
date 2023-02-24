import { Head } from "$fresh/runtime.ts";
import Board from "../islands/board.tsx";

export default function Home() {

	return (
		<>
			<Head>
				<title>Chess</title>
				<link rel="stylesheet" href="css/index.css" />
				<link rel="icon" href="img/favicon.svg" type="image/svg"/>
				<meta content="Devin's Chess Project!" property="og:title"/>
				<meta content="A work-in-progress chess game" property="og:description"/>
				<meta content="https://devinchess.deno.dev" property="og:url"/>
				<meta content="https://devinchess.deno.dev/img/favicon.svg" property="og:image"/>
			</Head>
			<Board/>
		</>
	);
}
