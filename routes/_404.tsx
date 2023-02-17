import { UnknownPageProps } from '$fresh/server.ts'

export default function NotFoundPage({ url }: UnknownPageProps) {
    return(
        <div className="container">
            <link rel="stylesheet" href="css/404.css" />
            <h1>Error 404</h1>
            <p>Page not found: {url.pathname.substring(1)}</p>
        </div>
    )
}