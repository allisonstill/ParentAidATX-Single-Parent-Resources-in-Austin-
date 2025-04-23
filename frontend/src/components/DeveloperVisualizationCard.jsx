import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './VisualizationCard.css';

const DeveloperVisualizationCard = ({ title, description, dataType, data }) => {
  return (
    <div className="visualization-card">
      <h2 className="visualization-title">{title}</h2>
      <p className="visualization-description">{description}</p>
      <div className="chart-container" ref={chartRef}></div>
    </div>
  );
};

export default DeveloperVisualizationCard;