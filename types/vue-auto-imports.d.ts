// Nuxt auto-imports a curated list of Vue types (.nuxt/imports.d.ts: Component, Ref, VNode, ...)
// and HTMLAttributes is missing from it, so vue-tsc rejects every component referencing it.
type HTMLAttributes = import('vue').HTMLAttributes
