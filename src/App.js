import { useContext } from "react";
import { MouseContext } from "./component/event/mouseEvent";

import Element from "./component/Sidebar";
import Results from "./component/Result";

function App() {
  const valueMouseContext = useContext(MouseContext);

  //
  //Check kết hợp các nguyên tố
  return (
    <div
      className="App"
      onMouseUp={valueMouseContext.handleMouseUp}
      onMouseMove={valueMouseContext.handleMouseMove}
      
    >
      <Results />
      <Element />
    </div>
  );
}

export default App;
