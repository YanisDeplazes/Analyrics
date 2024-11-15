<template>
    <div>
      <Badge type="loading-primary" text="Loading..." />
      <Badge type="success-primary" text="Success" />
      <Badge type="error-primary" text="Could not get lyrics" /> 
      <Badge type="loading" text="Loading..." />
      <Badge type="success" text="Success" />
      <Badge type="error" text="Could not get lyrics" />
    </div>
  </template>
  
  <script>
  import Badge from './components/badge.vue';
  
  export default {
    components: {
      Badge,
    },
  };
  </script>
  