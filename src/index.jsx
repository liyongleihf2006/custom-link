import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import { createLocation,createPath } from "history";

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

/**
 * The public API for rendering a history-aware <a>.
 */
class CustomLink extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    render: PropTypes.func
  };

  static defaultProps = {
    replace: false
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  handleClick = event => {
    if (this.props.onClick) this.props.onClick(event);

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { history } = this.context.router;
      const { replace, to } = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  render() {
    const { render, replace, to, innerRef, ...props } = this.props; // eslint-disable-line no-unused-vars
    invariant(
      this.context.router,
      "You should not use <CustomLink> outside a <Router>"
    );
    if (!render) {
      invariant(to !== undefined, 'When you\'re not specity the "render" property,you must specify the "to" property');
      const { history } = this.context.router;
      const location =
        typeof to === "string"
          ? createLocation(to, null, null, history.location)
          : to;

      const href = history.createHref(location);
      return <a {...props} onClick={this.handleClick} ref={innerRef} />;
    }
    return render.call(this,this.context, props)
  }
}

export default CustomLink;