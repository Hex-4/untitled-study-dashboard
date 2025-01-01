/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
        { files: "*.svelte", options: { parser: "svelte" } },
    ],
};
