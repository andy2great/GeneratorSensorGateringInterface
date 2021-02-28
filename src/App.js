import { ModuleContent } from "./components/module-content/module-content.component";

import Highcharts from "highcharts";

Highcharts.setOptions({
  time: {
    timezoneOffset: new Date().getTimezoneOffset(),
  },
});

function App() {
  return (
    <div className="App">
      <ModuleContent></ModuleContent>
    </div>
  );
}

export default App;
