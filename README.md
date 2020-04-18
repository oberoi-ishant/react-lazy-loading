> A higher order component for loading components with dynamic imports and promise.

## Install

```sh
npm install react-lazy-component
```

## Example

```js
import ReactLoader from 'react-lazy-component';
import DefaultComp from './my-default-component';

const ErrorComp = ({ loadError }) => <div>Error: { loadError.message }</div>;

const MyTestComp = ReactLoader({
  loader: () => import('./my-test-comp.js'),
  DefaultComp,
  ErrorComp
});

export default class MyApp extends React.Component {
  render() {
    return <MyTestComp/>;
  }
}
```

## Parameters
- loader: function to import the component.
- DefaultComp: (optional) default component shown until  loading.
- ErrorComp: (optional) ErrorComp shown if there is an error in load.
  Default value for DefaultComp and ErrorComp is null.
- delay: (optional) time in milliseconds before request is fired.
- name: (optinal) name of the module to be rendered if expected module is not the default exported module.

## Props injected
- loadFinished: (Boolean) to indicate if the the request has finished.
  Set to false before request is initiated and true after it completes.
  Even if the request fails it is set to true.
- loadError: (Object) receives the error object if the module fails to load.
  Can read the error message using loadError.message.
  Default value: null
- Other props passed to the component are passed as it is.

