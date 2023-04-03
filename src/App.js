import { useContext } from "react";
import { MouseContext } from "./component/event/mouseEvent";
import Result from "./component/Result";
import Element from "./component/Sidebar";

function App() {
  const valueMouseContext = useContext(MouseContext);
  console.log(valueMouseContext.handleMouseUp);

  // 
  //Check kết hợp các nguyên tố
  return (
      <div
        className="App"
        onMouseUp={valueMouseContext.handleMouseUp}
        onMouseMove={valueMouseContext.handleMouseMove}
      >
        <Result />
        <Element />
      </div>
  );
}

export default App;
