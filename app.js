// Function to normalize phone number input
const normalizeInput = (value, previousValue) => {
    if (!value) return '';
  
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
  
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    } else {
      return currentValue;
    }
  };
  
  const phoneNumberForm = document.createElement('form');
  phoneNumberForm.className = 'form';
  
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  
  const label = document.createElement('p');
  label.className = 'label';
  label.textContent = 'Phone:';
  inputContainer.appendChild(label);
  
  const input = document.createElement('input');
  input.className = 'input';
  input.type = 'text';
  input.name = 'phone';
  input.placeholder = '(xxx) xxx-xxxx';
  
  input.addEventListener('input', handleChange);
  
  const errorParagraph = document.createElement('p');
  errorParagraph.className = 'error';
  
  inputContainer.appendChild(input);
  inputContainer.appendChild(errorParagraph);
  
  phoneNumberForm.appendChild(inputContainer);
  
  const btnContainer = document.createElement('div');
  btnContainer.className = 'btn-container';
  
  const resetButton = document.createElement('button');
  resetButton.className = 'btn danger';
  resetButton.type = 'button';
  resetButton.textContent = 'Reset';
  resetButton.addEventListener('click', handleReset);
  
  btnContainer.appendChild(resetButton);
  phoneNumberForm.appendChild(btnContainer);
  
  document.getElementById('root').appendChild(phoneNumberForm);
  
  let state = {
    phone: '',
    error: ''
  };
  
  function handleChange(event) {
    const { value, selectionStart } = event.target;
    const previousValue = state.phone;
    state.phone = normalizeInput(value, previousValue);
    state.error = '';
    render();
  
    // Adjust caret position
    const caretOffset = getCaretOffset(value, previousValue, selectionStart);
    input.setSelectionRange(caretOffset, caretOffset);
  }
  
  function getCaretOffset(value, previousValue, selectionStart) {
    const cvLength = value.replace(/[^\d]/g, '').length;
    const pvLength = previousValue.replace(/[^\d]/g, '').length;
  
    if (cvLength < pvLength && selectionStart === value.length) {
      // Removing digit(s) from the middle
      const formattedValue = normalizeInput(value);
      const caretPosition = selectionStart - 1;
      const formattedDigit = formattedValue.charAt(caretPosition);
      const unformattedDigit = previousValue.charAt(caretPosition);
  
      if (formattedDigit !== unformattedDigit) {
        // Adjust the caret position to the right of the removed digit(s)
        return caretPosition + 1;
      }
    }
  
    return selectionStart;
  }
  function validateInput(value) {
    let error = '';
  
    if (!value) error = 'Phone number is required!';
    else if (value.length !== 14) error = 'Invalid phone number format. Example: (555) 555-5555';
  
    return error;
  }
  
  function handleReset() {
    state.phone = '';
    state.error = '';
    render();
  }
  
  function render() {
    input.value = state.phone;
    errorParagraph.textContent = state.error;
  }
  