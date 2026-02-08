/**
 * Backend Error Parser
 * 
 * Maps backend error messages to user-friendly offline-first guidance.
 * Removes all authentication/sign-in references.
 */

interface ErrorInfo {
  message: string;
  action?: string;
}

export function parseBackendError(error: any, context?: string): ErrorInfo {
  const errorMessage = error?.message || String(error);
  const lowerMessage = errorMessage.toLowerCase();

  // Backend unavailable / offline
  if (
    lowerMessage.includes('actor not available') ||
    lowerMessage.includes('backend not available') ||
    lowerMessage.includes('not available offline')
  ) {
    return {
      message: 'This feature requires backend connectivity and is not available offline.',
      action: 'Check your connection and try again.'
    };
  }

  // Feature not implemented
  if (lowerMessage.includes('not implemented') || lowerMessage.includes('not available in backend')) {
    return {
      message: 'This feature is not yet available.',
      action: 'Please check back later.'
    };
  }

  // Capacity errors
  if (lowerMessage.includes('capacity') || lowerMessage.includes('full')) {
    return {
      message: 'The system has reached capacity.',
      action: 'Please try again later.'
    };
  }

  // Authorization errors (without mentioning sign-in)
  if (lowerMessage.includes('unauthorized') || lowerMessage.includes('permission')) {
    return {
      message: 'You do not have permission to perform this action.',
      action: 'This feature may require special access.'
    };
  }

  // Validation errors
  if (lowerMessage.includes('invalid') || lowerMessage.includes('required')) {
    return {
      message: 'Please check your input and try again.',
      action: 'Make sure all required fields are filled correctly.'
    };
  }

  // Network/connection errors
  if (lowerMessage.includes('network') || lowerMessage.includes('connection') || lowerMessage.includes('timeout')) {
    return {
      message: 'Connection error. Please check your network.',
      action: 'Try again when you have a stable connection.'
    };
  }

  // Generic fallback with context
  const contextMessage = context ? ` while trying to ${context}` : '';
  return {
    message: `An error occurred${contextMessage}.`,
    action: 'Please try again or contact support if the problem persists.'
  };
}
