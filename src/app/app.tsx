import './app.css'
import { useState } from "react";
import {Posts} from "../components/posts";
import {Spiner} from "../components/spiner";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // для этого лучше было бы использовать стейт менеджер что-нибудь вроде Redux, MobX, Zustand

  function loadingHandler(value: boolean) {
    setIsLoading(value);
  }

  return (
    <main>
      {isLoading && <Spiner/>}
      <Posts onLoadingHandler={loadingHandler}/>
    </main>
  )
}

export default App
