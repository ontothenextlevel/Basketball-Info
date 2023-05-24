import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import styled from "styled-components";
import jsonList from "../db/jsonList.json";

const ArenaMapBlock = styled.div`
  position: absolute;
  top: 70px;

  .backTeam {
    position: absolute;
    background: #ffffff;
    z-index: 999999;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px;
    color: #000;
    padding: 0px 80px;
    font-size: 40px;
    font-weight: 500;
    box-shadow: rgb(0 0 0 / 70%) 0px 1px 10px -1px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(220, 220, 220);
    }
  }

  .infoWindow {
    text-align: center;
    padding: 0px 0px 0px 5px;
    outline: 0;
    .TeamName {
      font-family: "League Gothic", sans-serif;
      font-size: 20px;
    }
    .ArenaName {
      font-size: 13px;
      font-family: "Roboto", sans-serif;
      font-weight: bold;
      margin-top: 2px;
      letter-spacing: -0.5px;
    }
  }
`;

const ArenaMap = (props) => {
  const [activeMarker, setActiveMarker] = useState();
  const [ZoomPosition, setZoomPosition] = useState({
    lat: 36.277085,
    lng: -96.864473,
  });
  const [ZoomLevel, setZoomLevel] = useState();

  const [BackReset, setBackReset] = useState(false);

  const [Markers, setMarkers] = useState([]);

  const mounted = useRef(false);

  const Lists = useRef();

  const [searchParams] = useSearchParams();
  const divisionParams = searchParams.get("division");

  // set initial marker State
  useEffect(() => {
    const laTeam = {
      Name: "Los Angeles Clippers / Los Angeles Lakers",
      Abbreviation: "LA",
      Conference: "West",
      Division: "Pacific",
      Arena: "Crypto.com Arena",
      Position: {
        lat: 34.04301748061282,
        lng: -118.26724337353299,
      },
    };
    //exclude two team to share one arena
    const newTeamList = jsonList.TeamList.filter(
      (obj) => obj.Arena !== "Crypto.com Arena"
    );
    // include new La teams
    newTeamList.push(laTeam);
    setZoomPosition({ lat: 37.0902, lng: -95.7129 });
    setMarkers(newTeamList);
    Lists.current = newTeamList;
  }, []);

  // set team marker by clicked division
  useEffect(() => {
    const handleList = () => {
      const thisDivision = divisionParams?.split(",");
      const filteredTeams = Lists.current.filter((team) =>
        thisDivision?.includes(team.Division)
      );

      setMarkers(filteredTeams);
    };
    if (!mounted.current) {
      mounted.current = true;
    } else {
      handleList();
    }
  }, [divisionParams]);

  // on mouse to active marker
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // click marker to zoom
  const handleZoomMarker = (position) => {
    setZoomPosition(position);
    setTimeout(() => {
      setZoomPosition(null);
    }, 100);
    setZoomLevel(17);
  };

  // disappear or appear Back button
  useEffect(() => {
    if (ZoomLevel > 5) {
      setBackReset(true);
    } else if (ZoomLevel <= 5) {
      setBackReset(false);
    }
  }, [ZoomLevel]);

  // click Back button
  const handleBackZoom = () => {
    setZoomLevel(5);
    setZoomPosition({ lat: 36.277085, lng: -96.864473 });
  };

  // load map
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    Markers.forEach(({ Position }) => bounds.extend(Position));
    map.fitBounds(bounds);
    map.addListener("zoom_changed", () => {
      setZoomLevel(map.zoom);
    });
  };

  return (
    <ArenaMapBlock>
      <div
        className="backTeam"
        onClick={handleBackZoom}
        style={BackReset ? { display: "block" } : { display: "none" }}
      >
        BACK
      </div>

      <GoogleMap
        onLoad={handleOnLoad}
        mapContainerStyle={{ width: "100vw", height: "calc(100vh - 70px)" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        }}
        center={ZoomPosition}
        zoom={ZoomLevel}
      >
        {Markers.map((team, index) => (
          <Marker
            className="markerarea"
            animation={window.google.maps.Animation.DROP}
            key={team.Name}
            position={team.Position}
            label={{
              text: `${team.Abbreviation}`,
              fontFamily: "'League Gothic', sans-serif",
              fontSize: "16px",
              color: "#000",
              fontWeight: "bold",
            }}
            onMouseOver={() => handleActiveMarker(team.Name)}
            onMouseOut={() => handleActiveMarker()}
            onClick={() => {
              handleZoomMarker(team.Position);
            }}
          >
            {activeMarker === team.Name ? (
              <InfoWindow position={team.Position}>
                <div className="infoWindow">
                  <p className="TeamName">{team.Name}</p>
                  <p className="ArenaName">{team.Arena}</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </ArenaMapBlock>
  );
};

export default ArenaMap;
