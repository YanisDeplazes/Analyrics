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