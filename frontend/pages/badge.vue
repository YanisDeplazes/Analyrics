<template>
    <div>
      <Badge type="loading" text="Loading..." />
      <Badge type="success" text="Success" />
      <Badge type="error" text="Error message" />
    </div>
  </template>
  
  <script>
  import Badge from './components/.vue';
  
  export default {
    components: {
      Badge,
    },
  };
  </script>
  