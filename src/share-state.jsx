import React from 'react';
import warning from 'warning';

export function shareStateBind(C) {
  let props;
  let _shareStateBind;

  if (React.isValidElement(C)) {
    props = C.props;
    _shareStateBind = props => React.cloneElement(C, { ...props });
  } else {
    _shareStateBind = C;
  }

  return React.createElement(shareState(_shareStateBind, this), props);
}

export const shareState = (C, store) => {
  if (store._shareInstance) {
    return warning(true, "Already set component '%s'", store.name);
  }

  return class _shareState extends React.Component {
    constructor(props) {
      super(props);

      store._shareInstance = this;
      this.listeners = new Set();
    }

    subscribe(listener)   { this.listeners.add(listener); }
    unsubscribe(listener) { this.listeners.delete(listener); }

    notifyAll = state => this.listeners.forEach(listener => listener(state));

    render() {
      return <C {...this.props} _setShareState={this.notifyAll} _shareStore={store}/>;
    }
  }
}
