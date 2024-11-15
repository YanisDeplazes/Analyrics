<template>
    <div class="badge-container">
      <div :class="['badge', type]">
        <span class="badge-icon">
          <template v-if="type === 'loading'">
            <Icon size="large" variant="keyboard-arrow-right" type="secondary" />
          </template>
          <template v-if="type === 'success'">
            <Icon size="large" variant="check" type="secondary" />
          </template>
          <template v-if="type === 'error'">
            <Icon size="large" variant="cross" type="secondary" />
          </template>
        </span>
        <span class="badge-text">{{ text }}</span>
  
        <div v-if="type === 'error'" class="error-box">
          <Icon size="small" variant="error" type="secondary" />
          <span class="error-message">Error message</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        required: true,
        validator: (value) => ['loading', 'success', 'error',].includes(value),
      },
      text: {
        type: String,
        default: '',
      },
    },
  };
  </script>
  
  <style scoped>

/**
 * To do:
 * - Error message should appear under the other content of the container. 
 * - Icons are to big and the loading icon is missing. 
 * -> Also, the error-nested icon should be in white which is not defined in the variables.
 */

  .badge-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    border-radius: var(--border-lg);
    margin-bottom: var(--spacing-lg);
    font-size: 16px;
    font-weight: 500;
    color: var(--on-secondary);
    background-color: var(--bg-secondary);
  }
  
  .badge-icon {
    font-size: 20px;
  }
  
  .loading {
    background-color: var(--bg-secondary);
  }
  
  .success {
    background-color: var(--bg-secondary);
  }
  
  .error {
    background-color: var(--bg-secondary);
    position: relative;
  }
  
  .error-box {
    display: inline-flex;
    align-items: center;
    background-color: var(--bg-error);
    border-radius: 12px;
    padding: 4px 8px;
    margin-top: 8px;
    color: white;
  }
  
  .error-icon {
    font-size: 20px;
    margin-right: 4px;
  }
  
  .error-message {
    font-size: 16px;
  }
  </style>
  