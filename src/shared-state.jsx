import React from 'react';

export const sharedState = (C, prop) =>
  class _sharedState extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};

      const store = props[prop];
      getComponentInstance(store).then(instance => {
        this.shareStore = instance;
        this.shareStore.subscribe(this._updateState);

        this.setState({ instance });
      });
    }

    _updateState = shared => this.setState({ shared });

    componentWillUnmount() {
      this.shareStore && this.shareStore.unsubscribe(this._updateState);
    }

    render() {
      const { shared, instance } = this.state;
      return <C {...this.props} _shared={shared} _instance={instance}/>;
    }
  }

export const getComponentInstance = store =>
  new Promise((resolve, reject) =>
    store.instance && resolve(store.instance) ||
    setTimeout(() => store.instance && resolve(store.instance), 100)
  );
