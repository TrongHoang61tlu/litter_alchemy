import { useContext, useEffect, useState } from "react";
import Elements from "../api/Element";
import { CheckCombine } from "../event/checkCombine";
import { MouseContext } from "../event/mouseEvent";
import elements from  "../api/elements";
function Result() {
  const valueHandleCombine = useContext(CheckCombine);
  const valueMouseContext = useContext(MouseContext);
  const [screen, setScreen] = useState(false);
  const [content, setContent] = useState(false);
  const [reset, setReset] = useState(valueHandleCombine.dataResult)

console.log(reset);
  //click full screen
  const handleClickFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setScreen(false);
    }
  };
  //Content top
  setTimeout(() => {
    setContent(!content);
  }, 10000);

  const checkItemDuplicate = (idElementDuplicate, idElementMainSection) => {
    if (valueMouseContext.mouseMove) {
      if (valueHandleCombine.dataResult.length > 0 && valueHandleCombine.elementDuplicate) {
        if (idElementDuplicate === idElementMainSection) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else return false;
  };
  //Reset data 
 const handleReset = () => {
  alert('heloo')
 }
  return (
    <>
      <div className="results">
        <div className="result__top">
          <button className="screen" onClick={handleClickFullScreen}>
            {!screen ? (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdBAMAAACkvXo8AAAAElBMVEUAAADV1dXo3tDp3dL/v7/o3tDxDfasAAAABXRSTlMABrgYBKk7qoUAAAB0SURBVBjTbc/BCYAwEETRBCwgWIEevAvRu1iBBNJ/KwZ/mFFwbw/+YSeEEJequ5rD+DaBTWAT2IlAngnkQiDXJxhyzjtuAddNYBPYCuRyfF3XX5+2Vtg8aRPYBLg9vxE0c32mzJNxwgpSt1dUB9iB7QA7uAHMx1brSZFnbAAAAABJRU5ErkJggg"
                alt=""
              />
            ) : (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdBAMAAACkvXo8AAAAGFBMVEUAAADp39Pq38/p3tHo3tDo3tDf39/o3tA1q3PCAAAAB3RSTlMALTBObtwIVaOPMwAAAGlJREFUGNN9yssJgDAQhOHRqGcXxTriaUuxDxPZ9jUgeQzif/uYAdB5NPWBbJ4cyPVBZDGLktqS1XJnsiNDyY4MJQ/k/stH62v829/YkWyeHMjmyaG4HCZJrc8qMiOndqLOkaFkR8YO4AaZ11fNtEe+jAAAAABJRU5ErkJggg"
                alt=""
              />
            )}
          </button>
          {!content ? (
            <a href="https://littlealchemy.com/hints/">
              Are you stuck? Need a hint?
            </a>
          ) : (
            <a href="https://littlealchemy2.com/">
              Little Alchemy 2 is out now!
            </a>
          )}
        </div>
        {/* <div className="result__mid"> */}
          {valueMouseContext.mouseMove && Object.values(valueMouseContext.elementSelect).length > 0 && (
            <Elements
              img={valueMouseContext.elementSelect.url}
              name={valueMouseContext.elementSelect.title}
              position={
                Object.values(valueMouseContext.elementSelect).length !== 0 ? valueMouseContext.position : null
              }
              hidden={valueMouseContext.mouseMove ? true : false}
              zIndex="102"
            />
          )}
          {valueHandleCombine.dataResult.map((element, index) => (
            <Elements
              key={index}
              img={element.element.url}
              name={element.element.title}
              position={element.position}
              onMouseDowns={() =>
                valueMouseContext.handleMouseDown(element.element, {
                  type: 'content',
                  ix: index,
                })
              }
              opacity={
                checkItemDuplicate(
                valueHandleCombine.elementDuplicate.idElement,
                  element.idElement
                )
                  ? 0.5
                  : 1
              }
            />
          ))}
        {/* </div> */}
        <div className="result__bottom">
          <div className="progerss">{valueHandleCombine.dataElement.length}/{elements.length}</div>
          <ul>
            <li>
              <img
                src="https://littlealchemy.com/img/la2button.png"
                alt="img"
              />
            </li>
            <li>
              <img onClick={handleReset}  src="https://littlealchemy.com/img/clear.png" alt="img" />
            </li>
            <li>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjAgMAAABjt1vKAAAADFBMVEUAAADp3tHn3s/o3tCQbMP2AAAAA3RSTlMAdIvLTyKEAAAAIElEQVQY02P4DwV/qMQiHayCghVUckEoFISQ7hRqhwYAZZvW4VxuN5AAAAAASUVORK5CYII="
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Result;
