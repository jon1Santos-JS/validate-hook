<div align="center">

<a href="https://validating-form.vercel.app/" target="_blank" title="React Validate Form Hook - Tested App">

<img src="https://i.ibb.co/DQY27Mq/logo.png" alt="Validate Hook Form Logo - React custom hook for form validation" />

</a>

</div>

<div align="center">
    
[![npm](https://img.shields.io/npm/l/react-hook-form?style=for-the-badge)](https://github.com/jon1Santos-JS/validate-hook/blob/master/LICENSE)
[![GitHub repo size](https://img.shields.io/github/repo-size/jon1Santos-JS/validate-form?style=for-the-badge)](https://github.com/jon1Santos-JS/validate-hook)
[![NPM Version](https://img.shields.io/npm/v/validate-hook?style=for-the-badge)](https://www.npmjs.com/package/validate-hook)
    
</div>

### Features

- Simple to use

- [Small size](https://bundlephobia.com/result?p=react-hook-form@latest) and no [dependencies](./package.json)

- [Typescript support](./index.d.ts)


### Install

    npm install validate-hook


### Quickstart


```jsx

import { useValidate } from 'validate-hook';
import { useState } from 'react';

function App() {
  const { validateSingleSync } = useValidate();

  // CREATE AN INPUT WITH VALIDATIONS, ATTRIBUTES AND ERROR ARRAY
  const [input, setInput] = useState({
    validationsSync: (attributes) => [
      {
        conditional: attributes.value.length < 6,
        message: 'At least 6 characters'
      }
    ],
    attributes: { value: ''},
    errors: []
  });


  return (
    <div className="App">
      <input onChange={(e)=> {

        // UPDATE THE ATTRIBUTE
        setInput((prev) => ({...prev, attributes: { ...prev.attributes, value: e.target.value}}));

        // VALIDATE THE INPUT
        setInput((prev) => validateSingleSync(prev));

      }} type="text" value={input.attributes.value}/>
      <div>
        {input.errors.length > 0 ? input.errors[0] : null}
      </div>
    </div>
  );
}

```

### Many Inputs

```jsx

import { useValidate } from 'validate-hook';

function App() {
  const { validateManySync } = useValidate();

  // CREATE MORE THAN ONE INPUT WITH VALIDATIONS, ATTRIBUTES AND ERROR ARRAY
  const [inputs, setInputs] = useState({
    password: { 
      validationsSync: (attributes) => [
        {
          conditional: attributes.value.length < 6,
          message: 'At least 6 characters'
        }
      ],
      attributes: { value: ''},
      errors: [] 
    },
    username: {
        validationsSync: (attributes) => [
          {
            conditional: attributes.value.length < 6,
            message: 'At least 6 characters'
          }
      ],
      attributes: { value: ''},
      errors: []
    }
  });

  // UPDATE THEM
  function onChange(e, key){
    setInputs((prev) => {
      const newAtt = { ...prev[key].attributes, value: e.target.value };
      const newInput = {...prev, [key]: { ...prev[key], attributes: newAtt }}
      return newInput;
    })
  }

  return (
    <div className="App">
      <input id="username" onChange={(e) => onChange(e, 'username')} type="text" value={inputs.username.attributes.value}/>
      <input id="password" onChange={(e) => onChange(e, 'password')} type="text" value={inputs.password.attributes.value}/>
      <div>
        {/* CHECK THEM AT THE SAME TIME */}
        {!validateManySync(inputs) ? 'invalid form' : null}
      </div>
    </div>
  );
}

```

### Async Validations

```jsx

import { useValidate } from 'validate-hook';
import { useState } from 'react';

function App() {
  const { validateSingle } = useValidate();

  // CREATE AN INPUT WITH VALIDATIONS, ATTRIBUTES AND ERROR ARRAY
  const [input, setInput] = useState({
    validations: async (attributes) => [
      {
        // VALIDATE THE REQUIRED ATTRIBUTE
        conditional: !(await onCheckInputOnServer(attributes.value)),
        message: 'Value is invalid'
      }
    ],
    attributes: { value: ''},
    errors: []
  });

  // CREATE YOUR ASYNC VALIDATION METHOD
  async function onCheckInputOnServer(value){
    const response = await fetch('url', { method: 'POST', body: value })
    const parsedResponse = await response.json();
    if(parsedResponse.ok) return true;
    return false;
  }

  return (
    <div className="App">
      <input onChange={async (e)=> {

        // UPDATE THE INPUT
        const updatedInput = {...input, attributes: { ...input.attributes, value: e.target.value }}
        setInput(updatedInput);

        // VALIDATE AND UPDATE THE INPUT
        const validatedInput = await validateSingle(updatedInput)
        setInput(validatedInput);
      }} type="text" value={input.attributes.value}/>
      <div>
        {input.errors.length > 0 ? input.errors[0] : null}
      </div>
    </div>
  );
}

```



