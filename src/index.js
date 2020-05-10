"use strict";
import React from 'react';

// Empty component acting as default for Default or Error Component.
const EmptyComp = function () {
  return null;
};

const ReactLoader = function ({
  DefaultComp = EmptyComp,
  ErrorComp = EmptyComp,
  loader,
  name,
  delay
}) {
  class ReactComponentLazyLoad extends React.Component {
    constructor(props) {
      super(props);
      // initial state
      this.state = {
        lazyLoadComponent: DefaultComp,
        loadFinished: false,
        loadError: null
      }
    }

    componentDidMount() {
      /* Call the loader function to load the component */
      this.loadComp();
    }

    processLoad() {
      const _this = this;
      loader()
        .then(function (module) {
          _this.setState({
            lazyLoadComponent: name ? module[name] : module.default,
            loadFinished: true,
            loadError: null
          });
        })
        .catch(function (err) {
          _this.setState({
            lazyLoadComponent: ErrorComp,
            loadFinished: true,
            loadError: err
          });
        });
    }

    loadComp() {
      if (!isNaN(delay)) {
        setTimeout(this.processLoad.bind(this), delay);
        return;
      }
      this.processLoad();
    }

    render() {
      return React.createElement(
        this.state.lazyLoadComponent, {
          loadFinished: this.state.loadFinished,
          loadError: this.state.loadError,
          ...this.props
      }, null);
    }
  }

  // Add a displayName property to appear in dev tools.
  ReactComponentLazyLoad.displayName = "ReactComponentLazyLoad";
  return ReactComponentLazyLoad;
}

export default ReactLoader;
