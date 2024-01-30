# Installation
> `npm install validate-hook`

### Install

    npm install react-hook-form

[![npm](https://img.shields.io/npm/l/react-hook-form?style=for-the-badge)](https://github.com/jon1Santos-JS/validate-hook?tab=MIT-1-ov-file#)

### Quickstart


```jsx

import { useValidate } from 'validate-hook';
import { useState } from 'react';

function App() {
  const { validateSingleSync } = useValidate();
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
        setInput((prev) => {
          const newAttributes = { ...prev.attributes, value: e.target.value};
          const newInput = {...prev, attributes: newAttributes};
          return validateSingleSync(newInput);
      })
      }} type="text" value={input.attributes.value}/>
      {input.errors.length > 0 ? input.errors[0] : null}
    </div>
  );
}

```

## Credits
This package were created by [João Paulo](https://github.com/jon1Santos-JS).