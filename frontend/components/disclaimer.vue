<template>
    <h2>Disclaimer</h2>
    <p>
        The application uses a Large Language Model by Google called Gemini to
        analyse song lyrics. The lyrics are provided by Genius.com, where most
        lyrics are user-submitted; therefore, complete accuracy cannot be
        guaranteed. Please note that the analyses provided are for informational
        purposes only. We disclaim any responsibility for the accuracy or
        completeness of the lyrics or their interpretations. The analysis may not
        fully capture the intended meaning or context of the lyrics. For critical
        interpretations and insights, we recommend consulting the original source
        or a lyricist directly.
    </p>
</template>
<style lang="scss" scoped>
p {
    column-count: 1;
    gap: $spacing-lg;

    @include lg {
        column-count: 2;
    }
}
</style>