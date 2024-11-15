<template>

    <div :class="['notification', type]" v-if="visible">
      <div class="notification-header">
        <span class="notification-title">{{ title }}</span>
        <button class="close-btn" @click="closeNotification">✕</button>
      </div>
      <p class="notification-description">
        {{ description }}
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        default: 'info', // Default notification type
        validator: (value) => ['success', 'error', 'info', 'warning'].includes(value),
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        visible: true,
      };
    },
    methods: {
      closeNotification() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    width: 100%;
    height: unset;
    padding: var(--spacing-md);
    border-radius: var(--border-sm);
    color: var(--on-success);
    margin-bottom: var(--spacing-lg);
    display: flex;
    flex-direction: column;
  }
  .notification-title {
    font-weight: bold;
    font-size: 32.44px;
    padding-top: var(--spacing-md);
  }
  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .notification-description {
    margin-top: var(--spacing-md);
    width: 205px;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: var(--on-success);
    font-size: 20px;
    cursor: pointer;
  }
  
  .success {
    background-color: var(--bg-success);
  }
  
  .error {
    background-color: var(--bg-error);
  }
  
  .info {
    background-color: var(--bg-info);
  }
  
  .warning {
    background-color: var(--bg-warning);
  }

  </style>
