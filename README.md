<div align="center">
    
[![npm](https://img.shields.io/npm/l/react-hook-form?style=for-the-badge)](https://github.com/jon1Santos-JS/validate-hook/blob/master/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/jon1Santos-JS/validate-hook?style=for-the-badge)



    
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
        setInput((prev) => ({...prev, attributes: { ...prev.attributes, value: e.target.value}}));
        setInput((prev) => validateSingleSync(prev));
      }} type="text" value={input.attributes.value}/>
      <div>
        {input.errors.length > 0 ? input.errors[0] : null}
      </div>
    </div>
  );
}

```

