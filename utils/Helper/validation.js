export  const validateField = (value, validations) => {
    for (let validation of validations) {
      const { type, message, ...params } = validation;

      if (type === 'required' && !value.trim()) {
        return message || 'This field is required';
      }

      if (type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        return message || 'Invalid email address';
      }

      if (type === 'minLength' && value.length < params.minLength) {
        return message || `Must be at least ${params.minLength} characters long`;
      }

      if (type === 'numeric' && isNaN(value)) {
        return message || 'Must be a number';
      }

      // Add more validation types as needed
    }
    return null; // No errors found
  };