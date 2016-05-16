# react-sharestate-hoc
A React higher-order component for share state using a [Pub/Sub pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)

## Installation

```
$ npm install react-sharestate-hoc --save
```

## Description
A React higher-order components, [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775), is a function that receive a React Component and return a enhance version.

With this module state of `1` component cam be share with `n` components. A `1 to n` relationship. This is useful when a component state depends on state of another and there is not a parent relationship between them. This is usually done with Flux pattern but this time is solved with a minimal implementation of the Pub/Sub pattern using higher order React components.

Module contains two HOC, `shareState` and `sharedState`:
* `shareState` is the component that share his state. Only can be one instance of it.
* `sharedState` are subscribers of `shareState` components and can be many of them.

## API

## shareState
Share state of React component `C`, `store` is a empty object use for save the singleton instance of `C` and internal data
```
shareState(C, store)`
```
### passed `props`
* `_setShareState` is a callback function for set `shared state`
* `_shareStore` is the store object

### `shareStateBind` function
This is a helper function for "good looking" declaration of `shareState` components using [ES.Next Function Bind Syntax](https://babeljs.io/blog/2015/05/14/function-bind)
```
shareStateBind(C)
```

On this Example, declared share component function is use like a store too:
```
import { shareStateBind as shareState } from 'react-sharestate-hoc';

...
const SampleComponent = props => SampleComponent::shareState(<OneComponent {...props}/>);
...
```

## sharedState
Subscribe to a component that share his state, many can subscribe to same. `C` is the component to be wrapped. `prop` is a custom prop string name used for pass `share state` singleton store object, this `prop` connect a `shareState` component with `sharedState` components.
```
sharedState(C, prop)
```

### passed `props`
* `sharedComponent` default `prop` string name of `shareState` store object
* `_instance` instance of share state component
* `_shared` shared state component

### getComponentInstance function
A helper function that return a promise of a share Component `instance`. This could be useful if needed create a custom `sharedState` HOC.
```
getComponentInstance(store, ms)
```

## Usage
WIP
```
```

## Contributing
* Documentation improvement
* Feel free to send any PR

## LICENSE
MIT
