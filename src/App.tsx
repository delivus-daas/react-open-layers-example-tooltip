import React, {useState} from "react";
import {Layer, OpenLayers, Overlay} from "@delivus/react-open-layers";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import "./App.css";
import marker from "./assets/marker.png";

const features = new Array(20);
for (let i = 0; i < 20; ++i) {
  const coordinate = {
    latitude: Math.random() * (37 - 35 + 1) + 35,
    longitude: Math.random() * (129 - 126 + 1) + 126,
  };
  features[i] = {
    index: 1,
    coordinate,
    properties: { name: "Lotte city hotel" }, //can be any data
    iconOptions: {
      src: marker,
      scale: 0.3,
      color: "#6e6eff",
      anchorOrigin: "bottom-left",
    },
  };
}
function App() {
  const [tooltipPosition, setTooltipPosition] = useState<Coordinate>();

  const handleClickFeature = (features: Feature<Geometry>[], event: any) => {
    setTooltipPosition(event?.coordinate);
  }

  return (
      <OpenLayers onClickFeatures={handleClickFeature}>
        <Overlay
            id={"shipping-tooltip"}
            className={"tooltipCntr"}
            position={tooltipPosition}
        >
          <div className={'tooltip'}>Click the marker, to move tooltip. This is custom tooltip</div>
        </Overlay>
        <Layer
            features={features}
        />
      </OpenLayers>
  );
}

export default App;
