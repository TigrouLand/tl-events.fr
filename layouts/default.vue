<template>
    <Nav />
    <main class="h-screen w-screen overflow-y-auto overflow-x-hidden">
        <slot />
    </main>
</template>

<style>
@reference "tailwindcss";

    #__nuxt {
        @apply h-screen w-screen overflow-y-auto overflow-x-hidden;
    }
</style>
