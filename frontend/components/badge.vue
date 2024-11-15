<template>
    <div :class="['badge', type]">
      <span class="badge-icon">
        <template v-if="type === 'loading'">
          🔄
        </template>
        <template v-if="type === 'success'">
          ✔️
        </template>
        <template v-if="type === 'error'">
          ❌
        </template>
      </span>
      <span class="badge-text">{{ text }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        required: true,
        validator: (value) => ['loading', 'success', 'error'].includes(value),
      },
      text: {
        type: String,
        default: '',
      },
    },
  };
  </script>
  
  <style scoped>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    font-family: Arial, sans-serif;
  }
  
  .badge-icon {
    font-size: 18px;
  }
  
  /* Badge Types */
  .loading {
    background-color: #fcd34d; /* Yellow */
    color: #4b5563; /* Darker Text Color */
  }
  
  .success {
    background-color: #10b981; /* Green */
    color: white;
  }
  
  .error {
    background-color: #ef4444; /* Red */
    color: white;
  }
  </style>
  