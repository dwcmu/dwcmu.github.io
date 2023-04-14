import React from "react";
import HexagonGrid from "./hexagongrid.js";

const mountainTiles = [
  [0, 0],
  [2, 0],
  [3, 1],
  [0, 1],
  [4, 2],
  [9, 3],
  [12, 0],
];
const waterTiles = [
  [11, 1],
  [12, 1],
  [1, 1],
  [1, 2],
  [8, 2],
  [7, 3],
  [0, 3],
  [1, 4],
  [3, 4],
];

const Grid = () => {
  const getHexProps = (row, col) => {
    let backgroundImage = "field.png";
    let fill = "#ffffe0";
    if (mountainTiles.find((tile) => tile[0] === row && tile[1] === col)) {
      backgroundImage = "rock.png";
      fill = undefined;
    } else if (waterTiles.find((tile) => tile[0] === row && tile[1] === col)) {
      backgroundImage = "water.png";
      fill = undefined;
    }
    return {
      style: {
        fill,
        stroke: "white",
      },
      onClick: () => alert(`Hexagon n.${row}, ${col} has been clicked`),
      backgroundImage,
    };
  };

  const renderHexagonContent = (hexagon) => {
    return (
      <text
        x="50%"
        y="50%"
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: "white" }}
        textAnchor="middle"
      >
        {hexagon}
      </text>
    );
  };

  return (
    <HexagonGrid
      gridWidth={500}
      gridHeight={500}
      hexProps={getHexProps}
      renderHexagonContent={renderHexagonContent}
    />
  );
};

export default Grid;
