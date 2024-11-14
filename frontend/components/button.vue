<template>
  <button @click="handleClick">{{ text }}</button>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string
}>();
const emit = defineEmits<{
  click: [e: MouseEvent]
}>();
const handleClick = (e: MouseEvent) => {
  emit("click", e);
};
</script>
<style lang="css" scoped>
button {
  margin: 0 auto;
  display: block;
  border: unset;
  background-color: #fff689;
  padding: 10px 40px;
  margin: auto;
  border-radius: 5px;
}
</style>
