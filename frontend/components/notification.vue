<template>
    <!-- not imported: fonts-->

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
    width: 221px;
    height: 152px;
    padding: 8px;
    border-radius: 4px;
    color: white;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    font-family: Gothic A1, sans-serif;
  }
  
  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .notification-title {
    font-weight: bold;
    font-size: 32.44px;
  }
  
  .notification-description {
    margin-top: 8px;
    font-size: 16px;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  
  .success {
    background-color: #00A878;
  }
  
  .error {
    background-color: #C63C51;
  }
  
  .info {
    background-color: #336699;
  }
  
  .warning {
    background-color: #FF9F1C;
  }

  </style>


<!-- Add this to the page for the components to appear

<template>
    <div>
      <Notification type="success" title="Success" description="This is a longer description of why this success notification has appeared." />
      <Notification type="error" title="Error" description="This is a longer description of why this error notification has appeared." />
      <Notification type="info" title="Info" description="This is a longer description of why this info notification has appeared." />
      <Notification type="warning" title="Warning" description="This is a longer description of why this warning notification has appeared." />
    </div>
  </template>
  
  <script>
  import Notification from './components/notification.vue';
  
  export default {
    components: {
      Notification,
    },
  };
  </script> 
  
  -->
  
  