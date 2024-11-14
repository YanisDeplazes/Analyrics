<template>
    <div class="critic">
        <div class="image">
            <img src="../public/card.png" />
            <h3 class="title">Ellen</h3>
        </div>
        <CriticCategory variant="humor"></CriticCategory>
        <p>
            Ellen is a cheerful, out-of-touch host who delivers hilariously wrong
            song interpretations with endless enthusiasm. Laughing at her own
            jokes and dropping outdated references, she's cringy yet endearing.
        </p>
    </div>
</template>
<style lang="scss" scoped>
.critic {
    background-color: var(--bg-secondary);
    border-radius: var(--border-lg);
    padding: var(--spacing-lg);
    color: var(--on-secondary);
    display: flex;
    gap: var(--spacing-lg);
    flex-direction: column;

    .image {
        position: relative;

        img {
            width: 100%;
            height: auto;
            object-fit: cover;
            aspect-ratio: 288 / 320;
            border-radius: var(--border-lg);
        }

        .title {
            position: absolute;
            bottom: var(--spacing-lg);
            background-color: var(--bg-secondary);
            border-top-right-radius: var(--border-md);
            border-bottom-right-radius: var(--border-md);
            padding: var(--spacing-md);
        }
    }
}
</style>