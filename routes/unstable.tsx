import { Head } from "$fresh/runtime.ts";

export default function Preview() {
    return(
        <Head>
            <meta http-equiv="Refresh" content="0; url='https://devinchess-unstable.deno.dev'" />
        </Head>
    )
}