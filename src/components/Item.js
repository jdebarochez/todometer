import React from 'react';

const getTreshold = (width) => {
  return width * 40 / 100;
}

const getPosx = (delta, itemWidth) => {
  return Math.abs(delta) > itemWidth
        ? delta > 0
            ? itemWidth
            : -itemWidth
        : delta;
}

const documentSetPosxValue = (value) => {
  window.document.documentElement.style.setProperty('--posx', `${value}px`);
}

const getDOMNodeWidth = (el) => el.getBoundingClientRect().width;

export default class Item extends React.Component {
  constructor() {
      super();
      this.state = {
          status: "",
          startX: null,
          startY: null,
          dist: 0,
          startTime: null,
          X: null,
          Y: null,
          isSwipping: false
      };
  }

  handleTouchStart(e) {
      const touchobj = e.changedTouches[0];
      this.setState({
          status: "",
          dist: 0,
          startX: touchobj.pageX,
          startY: touchobj.pageY,
          X: touchobj.pageX,
          Y: touchobj.pageY,
          isSwipping: true,
          width: 0
      });
  }

  handleTouchMove(e) {
      const touchobj = e.changedTouches[0];
      this.setState({
          status: this.state.status,
          startX: this.state.startX,
          startY: this.state.startY,
          X: touchobj.pageX,
          Y: touchobj.pageY,
          isSwipping: this.state.isSwipping
      });

      const delta = touchobj.pageX - this.state.startX;

      const itemWidth = getTreshold(getDOMNodeWidth(this.refs.item));

      documentSetPosxValue(getPosx(delta, itemWidth));      
  }

  handleTouchEnd(e) {
      
      const touchobj = e.changedTouches[0];
      const delta = touchobj.pageX - this.state.startX;
      
      const itemWidth = getTreshold(getDOMNodeWidth(this.refs.item));

      const triggeredOk = delta > itemWidth;
      const triggeredDelay = delta < -itemWidth; 
      
      if (triggeredDelay)
          this.props.onPause(this.props.item);
      else if (triggeredOk)
          this.props.onComplete(this.props.item);

      this.setState({
          isSwipping: false
      });

      documentSetPosxValue(0);      
  }
  
  renderButtons() {
    if (!this.props.paused) {
      return (
        <div className="buttons">
          <button className="delete" onClick={() => this.props.onDelete(this.props.item)}></button>
          <button className="pause" onClick={() => this.props.onPause(this.props.item)}></button>
          <button className="complete" onClick={() => this.props.onComplete(this.props.item)}></button>
        </div>
      );
    }
    return (
      <div className="buttons">
        <button className="delete" onClick={() => this.props.onDelete(this.props.item)}></button>
        <button className="complete" onClick={() => this.props.onComplete(this.props.item)}></button>
      </div>
      );
  }

  renderItemWithButton() {
    return (
      <div className="item">
        <div className="item-name">{this.props.text}</div>
        {this.renderButtons()}
      </div>
    );
  }

  renderItemWithTouch() {
    return (
      <div className="item-container">
        <div className="item-background complete"></div>
        <div className="item-background pause"></div>
        <div
          ref="item"
          className={(this.state.isSwipping 
            ? "swipped "
            : "") + "item item-touch"}
          onTouchStart={(e) => this.handleTouchStart(e)}
          onTouchMove={(e) => this.handleTouchMove(e)}
          onTouchEnd={(e) => this.handleTouchEnd(e)}
        >
          <div className="item-name">
            {this.props.text}
          </div>
          <div className="buttons">
            <button className="delete" onClick={() => this.props.onDelete(this.props.item)}></button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.props.touch
      ? this.renderItemWithTouch()
      : this.renderItemWithButton();
  }
}
