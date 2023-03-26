import { useContext } from "react";
import { CheckCombine } from "../event/checkCombine";
import { MouseContext } from "../event/mouseEvent";

function Sidebar() {
  const valueHandleCombine = useContext(CheckCombine);
  const valueMouseContext = useContext(MouseContext);

  const dataSidebar = valueHandleCombine.dataElement;
  dataSidebar.sort((a, b) =>
    a.title > b.title
      ? 1
      : a.title === b.title
      ? a.title > b.title
        ? 1
        : -1
      : -1
  );
  return (
    <>
      <div className="main">
        <div className="alphabeta">
          <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
            <li>I</li>
            <li>K</li>
            <li>L</li>
            <li>M</li>
            <li>N</li>
            <li>O</li>
            <li>P</li>
            <li>Q</li>
            <li>R</li>
            <li>S</li>
            <li>T</li>
            <li>U</li>
            <li>V</li>
            <li>W</li>
            <li>X</li>
            <li>Y</li>
            <li>Z</li>
          </ul>
        </div>
        <div className="element">
          {dataSidebar.map((element, index) => (
            <div
              className="container"
              onMouseDown={() => {
                valueMouseContext.handleMouseDown(element, {
                  type: "sidebar",
                  ix: index,
                });
              }}
            >
              <div className="image">
                <img src={element.url} alt="" />
                <div className="overlay"></div>
              </div>
              <div className="title">{element.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
