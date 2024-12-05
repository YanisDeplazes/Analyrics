<template>
    <div class="category">
        <p class="icon">
            <Icon :icon="category" size="large" variant="primary"></Icon> {{ categoryTitle }}
        </p>
        <p>{{ categoryDescription }}</p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    category: "culture" | "genre" | "humor" | "philosophy" | "intellect" | "niche"
}>();

const categoryTitle = computed(() => {
    switch (props.category) {
        case "culture":
            return "Cultural commentator";
        case "genre":
            return "Genre Enthusiast";
        case "humor":
            return "Humorous Critic";
        case "intellect":
            return "Intellectual Critic";
        case "niche":
            return "Niche Perspective";
        case "philosophy":
            return "Philosophical Analyst";
    }
});

const categoryDescription = computed(() => {
    switch (props.category) {
        case "culture":
            return "Tying music to culture and society";
        case "genre":
            return "Genre or artist-specific deep dives";
        case "humor":
            return "Lighthearted and comedic interpretations";
        case "intellect":
            return "Exploring deep meanings";
        case "niche":
            return "Sophisticated, scholarly commentary";
        case "philosophy":
            return "Unique and unconventional viewpoints";
    }
})
</script>
<style lang="scss" scoped>
.category {
    background-color: $bg-primary;
    color: $on-primary;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    border-radius: $border-md;
    padding: $spacing-md;

    .icon {
        display: flex;
        gap: $spacing-md;
    }
}
</style>