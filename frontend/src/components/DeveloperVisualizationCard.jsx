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
    
    const interactionGroups = {
      "Online": 0,
      "InPerson": 0,
      "Both": 0
    };

    therapists.forEach(therapist => {
      if (therapist.interaction_type) {
        interactionGroups[therapist.interaction_type] = (interactionGroups[therapist.interaction_type] || 0) + 1;
      }
    });

    const pieData = Object.entries(interactionGroups)
      .map(([type, count]) => ({
        type, 
        count,
        color: type === "Online" ? "#FF6347" : type === "InPerson" ? "#FFA500" : "#FFD580"
      }))
      .filter(d => d.count > 0);

      const total = pieData.reduce((sum, d) => sum + d.count, 0);

      const containerWidth = chartRef.current.clientWidth;
      const containerHeight = Math.min(400, containerWidth * 0.8);
      
      const chartSize = Math.min(containerWidth, containerHeight);
      const radius = chartSize / 2.2 - 20;

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr("transform", `translate(${containerWidth / 2},${containerHeight / 2 + 20})`);
    
    // Add chart title
    svg.append("text")
      .attr("class", "chart-title")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", -containerHeight/2)
      .text("Therapists by Interaction Type")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.4) 
      .outerRadius(radius);

    const getOptimalLabelPosition = (d) => {
      const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      const isRight = Math.cos(midAngle) > 0;
        
      const labelRadius = radius * (isRight ? 1.12 : 1.15);
      const x = Math.sin(midAngle) * labelRadius;
      const y = -Math.cos(midAngle) * labelRadius;
        
      return [x, y];
    };

    const labelArc = d3.arc()
      .innerRadius(radius * 1.05)
      .outerRadius(radius * 1.05);

    const hoverArc = d3.arc()
      .innerRadius(radius * 0.35)
      .outerRadius(radius * 1.05);

    const arcs = svg.selectAll(".arc")
      .data(pie(pieData))
      .enter()
      .append("g")
      .attr("class", "arc");
      
    const defs = svg.append("defs");

    pieData.forEach((d, i) => {
      const gradientId = `slice-gradient-${i}`;
      
      const gradient = defs.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
        
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.rgb(d.color).brighter(0.2));
        
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.rgb(d.color).darker(0.2));
    });

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => `url(#slice-gradient-${i})`)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("transition", "all 0.3s")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", hoverArc)
          .style("opacity", 1);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc)
          .style("opacity", 0.9);
      })
      .transition()
      .duration(1000)
    
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '13px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .text(d => {
        const percentage = Math.round((d.data.count / total) * 100);
        return `${percentage}%`;
      })
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);
    
    arcs.append('polyline')
      .attr('points', d => {
        const pos = labelArc.centroid(d);
        const [x,y] = getOptimalLabelPosition(d);
        return [arc.centroid(d), pos, [x,y]];
      })
      .style('fill', 'none')
      .style('stroke', '#666')
      .style('stroke-width', 1)
      .style('opacity', 0.6);
    
    arcs.append('text')
      .attr('transform', d => {
        const [x, y] = getOptimalLabelPosition(d);
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', d => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? 'start' : 'end';
      })
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('fill', '#555')
      .text(d => `${d.data.type} (${d.data.count})`)
      .style('opacity', 1);
    
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('font-size', '22px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text(d3.sum(pieData, d => d.count));
      
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .style('font-size', '14px')
      .style('fill', '#666')
      .text('Therapists');
  };

  //CLINICS
  const createClinicsChart = (clinics) => {
    const distanceRanges = [
      { min: 0, max: 1, label: "0-1" },
      { min: 1, max: 2, label: "1-2" },
      { min: 2, max: 3, label: "2-3" },
      { min: 3, max: 5, label: "3-5" },
      { min: 5, max: 7, label: "5-7" },
      { min: 7, max: 10, label: "7-10" },
      { min: 10, max: 15, label: "10-15" },
      { min: 15, max: Infinity, label: "15+" }
    ];

    const chartData = distanceRanges.map(range => {
      const clinicsInRange = clinics.filter(
        clinic => clinic.distance >= range.min && 
                 clinic.distance < range.max && 
                 clinic.rating !== null && 
                 clinic.rating !== undefined
      );
      
      if (clinicsInRange.length === 0) {
        return {
          range: range.label,
          avgRating: 0,
          count: 0
        };
      }
      
      const avgRating = clinicsInRange.reduce((sum, clinic) => sum + clinic.rating, 0) / clinicsInRange.length;
      
      return {
        range: range.label,
        avgRating: parseFloat(avgRating.toFixed(2)),
        count: clinicsInRange.length
      };
    }).filter(d => d.count > 0);

    const margin = { top: 50, right: 60, bottom: 70, left: 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis (distance ranges)
    const x = d3.scaleBand()
      .domain(chartData.map(d => d.range))
      .range([0, width])
      .padding(1);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "12px")
      .style("text-anchor", "middle");

    // X axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Distance Range (miles)")
      .style("font-size", "14px")
      .style("fill", "#666");
      
    const y = d3.scaleLinear()
      .domain([0, 5])
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-size", "12px");

    // Y axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .text("Average Rating (stars)")
      .style("font-size", "14px")
      .style("fill", "#666");

    svg.selectAll("y-grid")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .style("stroke", "#e5e5e5")
      .style("stroke-dasharray", "3,3")
      .style("stroke-width", 1);
    
    const line = d3.line()
      .x(d => x(d.range) + x.bandwidth()/2)
      .y(d => y(d.avgRating))
      .curve(d3.curveMonotoneX);
    
    const path = svg.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#ff7e21")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", line);
    
    const pathLength = path.node().getTotalLength();
    
    path
      .attr("stroke-dasharray", pathLength + " " + pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
    
    svg.selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.range) + x.bandwidth()/2)
      .attr("cy", d => y(d.avgRating))
      .attr("r", 0)
      .attr("fill", "#ff7e21") 
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .attr("fill", "#ffc178");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)
          .attr("fill", "#ff7e21"); 
      })
      .attr("r", 6);

    svg.selectAll(".value-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.range) + x.bandwidth()/2)
      .attr("y", d => y(d.avgRating) - 15)
      .attr("text-anchor", "middle")
      .text(d => `${d.avgRating} (${d.count})`)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#444")
      .style("opacity", 1);
    
    svg.append("text")
      .attr("class", "chart-title")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -30)
      .text("Clinic Ratings by Distance")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");
  }

  //DISORDERS
  const createDisordersChart = (disorders) => {
    const categoryGroups = {};
    disorders.forEach(disorder => {
      if (disorder.category) {
        categoryGroups[disorder.category] = (categoryGroups[disorder.category] || 0) + 1;
      }
    });

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

    // Gradient for bars in bar graph
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff7e21"); 
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ffc178"); 

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