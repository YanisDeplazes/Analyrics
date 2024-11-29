<template>
    <div class="loader-container">
        <div class="loader">
            <div class="loader-icon">
                <Icon size="large" type="secondary" variant="loading" class="rotating" v-if="isLoading && !hasError">
                </Icon>
                <Icon size="large" type="secondary" variant="check" class="animate-path-forward"
                    v-if="!isLoading && !hasError"></Icon>
                <Icon size="large" type="secondary" variant="cross" class="animate-path-forward" v-if="hasError"></Icon>
            </div>
            <p v-if="isLoading">{{ loadingInProgressMessage }}</p>
            <p v-else>{{ loadingFinishedMessage }}</p>
        </div>
        <p class="error-message" v-if="hasError">
            <Icon size="large" type="error" variant="error"></Icon>
            {{ errorMessage }}
        </p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    isLoading: boolean,
    loadingInProgressMessage: string,
    loadingFinishedMessage: string,
    loadingErrorMessage?: string,
    hasError?: boolean,
    errorMessage?: string
}>();
</script>
<style lang="scss" scoped>
.loader-container {
    display: flex;
    gap: var(--spacing-lg);
    flex-direction: column;
    align-items: start;
    background-color: var(--bg-secondary);
    color: var(--on-secondary);
    border-radius: var(--border-lg);
    padding: var(--spacing-lg);

    .loader {
        display: inline-flex;
        justify-content: center;
        flex-direction: row;
        gap: var(--spacing-lg);

        .loader-icon {
            max-height: 24px;
            max-width: 24px;

            .animate-path-forward {
                animation-name: scale-up-down;
                animation-duration: .3s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
            }
        }
    }

    .error-message {
        background-color: var(--bg-error);
        color: var(--on-error);
        padding: var(--spacing-md);
        border-radius: var(--spacing-md);
        display: flex;
        flex-direction: row;
        gap: var(--spacing-md);
    }
}

@keyframes scale-up-down {
    0% {
        scale: 1;
    }

    50% {
        scale: 1.5
    }

    100% {
        scale: 1;
    }
}

@keyframes rotate-360deg {
    from {
        rotate: 0deg;
    }

    to {
        rotate: 360deg;
    }
}

.rotating {
    animation: rotate-360deg 1s infinite;
}
</style>