function Elements({ img, name, position, onMouseDowns, zIndex, opacity }) {
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
          : { left: 1741, top: 0, display: "none" }
      }
    >
      <div onMouseDown={onMouseDowns}>
        <img src={img} alt="photos" />
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Elements;
