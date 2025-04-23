import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './VisualizationCard.css';

const DeveloperVisualizationCard = ({ title, description, dataType, data }) => {

  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;
    
    d3.select(chartRef.current).selectAll("*").remove();
    
    switch (dataType) {
      case 'therapists':
        createTherapistsChart(data);
        break;
      case 'clinics':
        createClinicsChart(data);
        break;
      case 'disorders':
        createDisordersChart(data);
        break;
      default:
        console.error("Unknown chart type:", dataType);
    }
  }, [data, dataType]);

  //THERAPISTS
  const createTherapistsChart = (therapists) => {
    
  }

  //CLINICS
  const createClinicsChart = (clinics) => {

  }

  //DISORDERS
  const createDisordersChart = (disorders) => {
    const categoryGroups = {};
    disorders.forEach(disorder => {
      if (disorder.category) {
        categoryGroups[disorder.category] = (categoryGroups[disorder.category] || 0) + 1;
      }
    });

    // Format data for chart
    const chartData = Object.entries(categoryGroups)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count); // Sort by count (descending)

    const margin = { top: 50, right: 30, bottom: 185, left: 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(chartData.map(d => d.category))
      .padding(0.3);
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "10px")
      .attr("transform", "rotate(-45)")
      .attr("dx", "-0.8em")
      .attr("dy", "0.20em")
      .style("text-anchor", "end");

    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Disorder Category")
      .style("font-size", "14px")
      .style("fill", "#666");
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.count) * 1.1])
      .range([height, 0]);
    
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-size", "12px");

    // Add Y axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .text("Number of Disorders")
      .style("font-size", "14px")
      .style("fill", "#666");

    // Create gradient for bars
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff7e21"); // Steel blue
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ffc178"); // Lighter blue

    // Add bars
    svg.selectAll("mybar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.category))
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "url(#bar-gradient)")
      .attr("rx", 5) // Rounded corners
      .attr("ry", 5)
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count));
    
    // Values above the bars
    svg.selectAll(".value-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.category) + x.bandwidth() / 2)
      .attr("y", d => y(d.count) - 10)
      .attr("text-anchor", "middle")
      .text(d => d.count)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#444")
      .style("opacity", 0)
      .transition()
      .duration(800)
      .delay((d, i) => 300 + i * 100)
      .style("opacity", 1);
    
    // Add chart title
    svg.append("text")
      .attr("class", "chart-title")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -30)
      .text("Disorders by Category")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");
  }








  return (
    <div className="visualization-card">
      <h2 className="visualization-title">{title}</h2>
      <p className="visualization-description">{description}</p>
      <div className="chart-container" ref={chartRef}></div>
    </div>
  );
};

export default DeveloperVisualizationCard;