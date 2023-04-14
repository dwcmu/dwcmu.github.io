import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import isFunction from "lodash/isFunction";
import times from "lodash/times";
import Hexagon from "react-hexagon";

const getGridDimensions = (gridWidth) => {
  const columns = 5;

  const hexSize = Math.floor(gridWidth / (3 * columns));
  const rows = 13;

  return {
    columns,
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: Math.ceil(hexSize * Math.sqrt(3)),
    rows,
  };
};

const tryInvoke = (func, params = [], defaultValue = null) => {
  return isFunction(func) ? func(...params) : defaultValue;
};

const HexagonGrid = (props) => {
  const { gridHeight, gridWidth, renderHexagonContent, hexProps, x, y } = props;

  const [state, setState] = useState({
    columns: 1,
    hexSize: 1,
    hexWidth: 1,
    hexHeight: 1,
    rows: 0,
  });

  useEffect(() => {
    if (gridWidth > 0) {
      setState(getGridDimensions(gridWidth));
    }
  }, [gridWidth]);

  const getHexDimensions = (row, col) => {
    const dimensions = {
      width: `${state.hexWidth}px`,
      height: `${state.hexHeight}px`,
      x: col * state.hexSize * 3,
    };
    if (row % 2 === 0) {
      dimensions.x += state.hexSize * (3 / 2);
    }
    return dimensions;
  };

  const getRowDimensions = (row) => {
    const dimensions = {
      y: `${row * (state.hexSize * (Math.sqrt(3) / 2))}px`,
      height: `${state.hexHeight}px`,
      width: gridWidth,
    };
    if (row % 2 === 0) {
      dimensions.marginLeft = `${(state.hexSize / 2) * 3}px`;
    }
    return dimensions;
  };

  return (
    <svg width={gridWidth} height={gridHeight} x={x} y={y}>
      {times(state.rows, (row) => {
        const columns = state.columns;
        const rowDim = getRowDimensions(row);
        return (
          <svg
            key={row}
            width={rowDim.width}
            height={rowDim.height}
            y={rowDim.y}
          >
            {times(columns, (col) => {
              const iHexagon = row * state.columns + col;
              const hexDim = getHexDimensions(row, col);
              const _hexProps = tryInvoke(hexProps, [row, col], hexProps);
              if (col !== 4 || row % 2 !== 0) {
                return (
                  <svg
                    key={iHexagon}
                    height={hexDim.height}
                    width={hexDim.width}
                    x={`${hexDim.x}px`}
                  >
                    <Hexagon {..._hexProps} flatTop>
                      {tryInvoke(
                        renderHexagonContent,
                        [row + "," + col],
                        <tspan />
                      )}
                    </Hexagon>
                  </svg>
                );
              }
            })}
          </svg>
        );
      })}
    </svg>
  );
};

HexagonGrid.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  hexProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderHexagonContent: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
};

HexagonGrid.defaultProps = {
  hexProps: {},
  renderHexagonContent: null,
  x: 0,
  y: 0,
};

export default HexagonGrid;
