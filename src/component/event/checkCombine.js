import { createContext, useEffect, useState } from "react";
import elements from "../api/elements";
import { v4 as uuidv4 } from "uuid";
import dataCombine from "./combine";

const CheckCombine = createContext();
function HandleCombine({children}) {
  const firstData = elements;
  const [elementDuplicate, setElementDuplicate] = useState([]);
  const [elementIsSelect, setElementIsSelect] = useState({});

  const [dataElement, setDataElement] = useState(
    JSON.parse(localStorage.getItem("listElements"))
      ? JSON.parse(localStorage.getItem("listElements"))
      : firstData.filter((elements) => elements.id < 5)
  );
  const [dataResult, setDataResult] = useState(
    JSON.parse(localStorage.getItem("listResult"))
      ? JSON.parse(localStorage.getItem("listResult"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("listElements", JSON.stringify(dataElement));
  }, [dataElement]);
  useEffect(() => {
    localStorage.setItem("listResult", JSON.stringify(dataResult));
  }, [dataResult]);
  function checkRecipes() {
    if (
      Object.values(elementDuplicate).length > 0 &&
      Object.values(elementIsSelect).length > 0
    ) {
      let a = elementDuplicate.element.title.toLowerCase();
      let b = elementIsSelect.element.title.toLowerCase();
      const listNewItem = dataCombine.filter(
        (title) =>
          (title[0].toLowerCase() === a && title[1].toLowerCase() === b) ||
          (title[1].toLowerCase() === a && title[0].toLowerCase() === b)
      );
      if (listNewItem.length > 0) {
        let newDataResult = [];
        newDataResult = dataResult.filter(
          (element) => element.idElement !== elementDuplicate.idElement
        );
        listNewItem.map((item) => {
          const createNewItem = firstData.filter(
            (it) => it.title.toLowerCase() === item[2].toLowerCase()
          );
          const indexOf = dataElement.findIndex(
            (item) =>
              item.title.toLowerCase() === createNewItem[0].title.toLowerCase(),
          );
          if (indexOf === -1) {
            setDataElement([...dataElement, createNewItem[0]]);
          }
          const formData = {
            idItemRemove: elementDuplicate.idElement,
            newCreateItem: {
              idElement: uuidv4(),
              element: createNewItem[0],
              position: elementDuplicate.position,
            },
          };
          newDataResult.push(formData.newCreateItem);
          return null;
        });
        setDataResult(newDataResult);
        setElementDuplicate([]);
        setElementIsSelect({});
        return true;
      }
    }
    return null;
  }
  const value = {
    dataResult,
    setDataResult,
    elementDuplicate,
    setElementDuplicate,
    elementIsSelect,
    setElementIsSelect,
    dataElement,
    setDataElement,
    checkRecipes,
    elements,
  };
  return <CheckCombine.Provider value={value}>{children}</CheckCombine.Provider>
}

export {CheckCombine, HandleCombine};
