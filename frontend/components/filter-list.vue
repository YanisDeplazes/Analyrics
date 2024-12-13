<template>
    <div class="filters">
        <Badge :variant="variant" v-for="filter in filters" :text="filter.displayName" class="filter"
            @click="setSelected(filter.value)">
            <template v-slot:icon v-if="filter.value == selectedValue">
                <Icon variant="secondary" icon="check" size="small" />
            </template>
        </Badge>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    filters: Array<{
        value: string,
        displayName: string
    }>,
    variant: "secondary",
    initialValue?: string
}>();
const emit = defineEmits<{
    filterChanged: [selectedFilter: { value: string, displayName: string }]
}>();
const selectedValue = ref<undefined | string>(props.initialValue)
const setSelected = (value: string) => {
    if (value != selectedValue.value) {
        selectedValue.value = value;
        emit("filterChanged", props.filters.find(f => f.value === value)!)
    }
}
</script>
<style lang="scss" scoped>
.filters {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;

    & .filter:hover {
        cursor: pointer;
    }
}
</style>