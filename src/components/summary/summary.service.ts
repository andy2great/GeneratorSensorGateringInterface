import { SENSEURS_TYPE } from "../../constants/senseurs.constants";
import { SERVER_NAME } from "../../constants/server.constants";

const summaryService = {
  getLastValue: () => {
    return fetch(SERVER_NAME + "/senseurs/last").then((res) => res.json());
  },

  getGlobalChartValues: () => {
    return fetch(SERVER_NAME + "/senseurs/chart").then((res) => res.json());
  },

  getSensorInfo: (type: number) => {
    const sensorInfo = {
      name: "",
      type: "",
      symbole: "",
    };

    switch (type) {
      case SENSEURS_TYPE.MOD_PERATION:
        sensorInfo.name = "Mode Operation";
        sensorInfo.type = "modeOpr";
        sensorInfo.symbole = "";
        break;
      case SENSEURS_TYPE.TEMPERATURE:
        sensorInfo.name = "Température";
        sensorInfo.type = "temp";
        sensorInfo.symbole = "°C";
        break;
      case SENSEURS_TYPE.HUMIDITE:
        sensorInfo.name = "Humidité";
        sensorInfo.type = "hum";
        sensorInfo.symbole = "%";
        break;
      case SENSEURS_TYPE.CO:
        sensorInfo.name = "CO";
        sensorInfo.type = "co";
        sensorInfo.symbole = "PPM";
        break;
      case SENSEURS_TYPE.LPG:
        sensorInfo.name = "Propane";
        sensorInfo.type = "lpg";
        sensorInfo.symbole = "PPM";
        break;
      default:
        sensorInfo.name = "Not Found";
        sensorInfo.type = "autre";
        sensorInfo.symbole = "";
    }

    return sensorInfo;
  },
};

export default summaryService;
