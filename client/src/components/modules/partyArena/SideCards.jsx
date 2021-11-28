import React from "react";
const SideCards = ({ currentRoom, setCurrentRoom }) => {
  return (
    <div className="side-cards-holder">
      <div
        onClick={() => {
          setCurrentRoom(2);
        }}
        className={[
          "side-cards-card",
          "memories",
          currentRoom === 2 ? "selected" : "",
        ].join(" ")}
      >
        <div className="side-cards-card-title">
          Memories
          <hr className="underline" />
        </div>
      </div>
      <div
        onClick={() => {
          setCurrentRoom(3);
        }}
        className={[
          "side-cards-card",
          "blessings",
          currentRoom === 3 ? "selected" : "",
        ].join(" ")}
      >
        <div className="side-cards-card-title">
          Blessings
          <hr className="underline" />
        </div>
      </div>
      <div
        onClick={() => {
          setCurrentRoom(4);
        }}
        className={[
          "side-cards-card",
          "cake",
          currentRoom === 4 ? "selected" : "",
        ].join(" ")}
      >
        <div className="side-cards-card-title">
          Cake Area
          <hr className="underline" />
        </div>
      </div>
    </div>
  );
};
export default SideCards;
