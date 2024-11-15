<template>
    <div class="badge-container">
      <div :class="['badge', type]">
        <span class="badge-icon">
          <template v-if="type === 'loading' || type === 'loading-primary'">
            <Icon size="large" variant="keyboard-arrow-right" type="secondary" />
          </template>
          <template v-if="type === 'success' || type === 'success-primary'">
            <Icon size="large" variant="check" type="secondary" />
          </template>
          <template v-if="type === 'error' || type === 'error-primary'">
            <Icon size="large" variant="cross" type="secondary" />
          </template>
        </span>
        <span class="badge-text">{{ text }}</span>
  
        <!-- Nested error message box -->
        <div v-if="type === 'error' || type === 'error-primary'" class="error-box">
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
        validator: (value) => [
          'loading',
          'success',
          'error',
          'loading-primary',
          'success-primary',
          'error-primary',
        ].includes(value),
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
 * To Do:
 * - wasn't able to change icon color for bg-primary badges
 * - missing loading icon in css variables
 * - missing white error icon
 * - wasn't able to put error message box below the text
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
  }
  
  .badge-icon {
    font-size: 20px;
  }
  
  .loading {
    background-color: var(--bg-secondary);
    color: var(--on-secondary);
  }
  
  .success {
    background-color: var(--bg-secondary);
    color: var(--on-secondary);
  }
  
  .error {
    background-color: var(--bg-secondary);
    color: var(--on-secondary);
  }
  
  .loading-primary {
    background-color: var(--bg-primary);
    color: var(--on-primary);
  }
  
  .success-primary {
    background-color: var(--bg-primary);
    color: var(--on-primary);
  }
  
  .error-primary {
    background-color: var(--bg-primary);
    color: var(--on-primary);
  }
  
  .error-box {
    display: inline-flex;
    align-items: center;
    background-color: var(--bg-error);
    border-radius: var(--border-md);
    padding: var(--spacing-md);
    color: var(--on-error);
  }
  
  .error-icon {
    font-size: 20px;
  }
  
  .error-message {
    font-size: 16px;
  }
  </style>
  