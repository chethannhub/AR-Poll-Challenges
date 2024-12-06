import React from "react";

const ARjsMarker = ({ modelUrl }) => {
  // console.log("Model Url recived in ARjsMarker " + modelUrl)

  return (

        <a-scene
            vr-mode-ui="enabled: false;"
            loading-screen="enabled: false;"
            renderer="logarithmicDepthBuffer: true;"
            arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: true;"
            id="scene"
            embedded
            gesture-detector
        >
            <a-assets>
                <a-asset-item
                    id="animated-asset"
                    src="/models/demonic_captain_america.glb"
                ></a-asset-item>
            </a-assets>

            <a-marker
                id="animated-marker"
                type="pattern"
                preset="custom"
                url="/models/marker.patt"
                raycaster="objects: .clickable"
                emitevents="true"
                cursor="fuse: false; rayOrigin: mouse;"
                // id="markerA"
            >
                <a-entity
                    id="bowser-model"
                    scale="0.5 0.5 0.5"
                    rotation="0 90 0"
                    animation-mixer="loop: repeat "
                    gltf-model="#animated-asset"
                    class="clickable"
                    gesture-handler
                ></a-entity>
            </a-marker>

            <a-entity camera></a-entity>
        </a-scene>
  );
};

export default ARjsMarker;
