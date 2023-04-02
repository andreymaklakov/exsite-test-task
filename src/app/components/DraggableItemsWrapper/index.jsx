import React from "react";

const DraggableItemsWrapper = ({
  item,
  children,
  styles,
  onDrop,
  onDragStart,
  draggedItem,
}) => {
  const handleDragStart = (item) => {
    onDragStart(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, item, draggedItem) => {
    e.preventDefault();

    onDrop(item, draggedItem);
  };

  return (
    <div
      draggable={true}
      onDragStart={() => handleDragStart(item)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, item, draggedItem)}
      className={styles}
    >
      {children}
    </div>
  );
};

export default DraggableItemsWrapper;
