function Elements({ img, name, position, onMouseDown, zIndex, opacity }) {
  return (
    <div
      className="elements"
      style={
        position != null
          ? {
              left: position.left - 32,
              top: position.top - 32,
              zIndex: zIndex,
              opacity: opacity,
            }
          : { left: 1741, top: 85, display: "none" }
      }
    >
      <div className="cayxanh">
        <img src={img} alt="photos" />
        <div
          className="overlay"
          onMouseDown={onMouseDown}
          
        ></div>
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Elements;
