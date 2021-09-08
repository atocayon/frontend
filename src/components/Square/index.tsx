import React from "react";

interface SquareProps {
  id: number;
  player: string;
  value: string;
  onClickSquare: (e: React.MouseEvent, id: number, player: string) => void;
}
export default class Square extends React.Component<SquareProps> {
  render() {
    return (
      <div
        className="square"
        onClick={(e) => {
          if (this.props.value === "") {
            this.props.onClickSquare(e, this.props.id, this.props.player);
          } else {
            e.preventDefault();
          }
        }}
      >
        {this.props.value}
      </div>
    );
  }
}
