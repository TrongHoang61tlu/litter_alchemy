import { createContext, useContext, useState } from "react";
import { CheckCombine } from "./checkCombine";
import { v4 as uuidv4 } from "uuid";

const MouseContext = createContext();
function MouseEvent({ children }) {
  const valueHandleCombine = useContext(CheckCombine);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);
  const [typeElement, setTypeElement] = useState('');
  const [position, setPosition] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const [elementSelect, setElementSelect] = useState({});

  //Xử lý kéo thả
  //Hành động nhấp chuột
  const handleMouseDown = (item, value) => {
    setTypeElement(value);
    setMouseDown(true);
    setElementSelect(item);
    setMouseMove(false);
  };

  //Hành động kéo chuột
  const handleMouseMove = (e) => {
    if (mouseDown) {
      setMouseMove(true);
      setPosition({
        left: e.clientX,
        top: e.clientY,
      });
      if (typeElement.type === 'content') {
        const newData = valueHandleCombine.dataResult.filter(
          (item, index) => index !== typeElement.ix
        );
        valueHandleCombine.setDataResult(newData);
        setTypeElement({});
      }

      let formData = {
        element: elementSelect,
        position: position,
      };
      const newData = valueHandleCombine.dataResult.filter(
        (element, index) =>
          element.position.left - 32 <= position.left &&
          position.left <= element.position.left + 32 &&
          element.position.top - 32 <= position.top &&
          position.top <= element.position.top + 32
      );
      valueHandleCombine.setElementIsSelect(formData);
      valueHandleCombine.setElementDuplicate(
        newData[newData.length - 1] !== undefined
          ? newData[newData.length - 1]
          : []
      );
    }
  };

  //sự kiện thả chuột
  const handleMouseUp = () => {
    let newData = {
      idElement: uuidv4(),
      element: elementSelect,
      position: position,
    };
    //sự kiện thêm và xóa phần tử
    if (position.left < width - 300 && mouseMove === true) {
      valueHandleCombine.setDataResult([
        ...valueHandleCombine.dataResult,
        newData,
      ]);
    }

    //Sự kiện kết hợp 2 element
    valueHandleCombine.checkRecipes();
    setMouseDown(false);
    setElementSelect({});
    setPosition({});
    setMouseMove(false);
  };

  const value = {
    mouseDown,
    setMouseDown,
    elementSelect,
    setElementSelect,
    mouseMove,
    setMouseMove,
    typeElement,
    setTypeElement,
    position,
    setPosition,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
  };
  return (
    <MouseContext.Provider value={value}>{children}</MouseContext.Provider>
  );
}

export { MouseContext, MouseEvent };
