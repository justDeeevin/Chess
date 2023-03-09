// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/index.tsx";
import * as $$0 from "./islands/board.tsx";
import * as $$1 from "./islands/mobileBoard.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/index.tsx": $1,
  },
  islands: {
    "./islands/board.tsx": $$0,
    "./islands/mobileBoard.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
