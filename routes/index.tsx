import { Head } from "$fresh/runtime.ts";
import { useState } from "https://esm.sh/v106/preact@10.11.0/hooks";
import Board from "../islands/board.tsx";

export default function Home() {

	return (
		<>
			<Head>
				<title>Chess</title>
				<link rel="stylesheet" href="css/index.css" />
				<link rel="icon" href="img/favicon.svg" type="image/svg"/>
			</Head>
			<Board/>
		</>
	);
}
