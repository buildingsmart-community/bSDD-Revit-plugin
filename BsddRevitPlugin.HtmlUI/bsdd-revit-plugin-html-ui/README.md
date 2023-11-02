# bSDD Search Component for React

## Live demo
https://bim-tools.github.io/react-bsdd-search/

![](https://github.com/BIM-Tools/react-bsdd-search/raw/master/docs/bSDD-search-component.png)

## Usage

HTML template, make sure you include a link to bootstrap 5 css.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>bSDD React App</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Main react javascript file

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BsddSearch } from 'react-bsdd-search'

function callback(data) {
  console.log(data)
  alert(JSON.stringify(data, null, 2))
}

const config = {
  defaultDomains: [
    {
      value: 'https://identifier.buildingsmart.org/uri/digibase/volkerwesselsbv-0.1',
      label: 'VolkerWessels Bouw & Vastgoed',
    },
  ],
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BsddSearch callback={callback} config={config} />
  </React.StrictMode>,
)
```
