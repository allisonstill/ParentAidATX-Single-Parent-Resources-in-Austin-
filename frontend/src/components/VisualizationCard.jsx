import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './VisualizationCard.css';

const VisualizationCard = ({ title, description, dataType, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    d3.select(chartRef.current).selectAll("*").remove();

    switch (dataType) {
      case "books":
        createBooksChart(data);
        break;
      case "childcare":
        createChildcareChart(data);
        break;
      case "housing":
        createHousingChart(data);
        break;
      default:
        console.log("Cannot create chart type.")
    }
  }, [data, dataType]);

  //BOOKS
  const createBooksChart = (books) => {
    const getYear = (dateStr) => {
      if (!dateStr) return null;
      const matches = String(dateStr).match(/\b(19|20)\d{2}\b/);
      return matches ? parseInt(matches[0]) : null;
    };

    const yearGroups = {};
    books.forEach(book => {
      const year = getYear(book.publishDate);
      if (year) {
        yearGroups[year] = (yearGroups[year] || 0 ) + 1;
      }
    });

    const decadeGroups = {};
    Object.entries(yearGroups).forEach(([year, count]) => {
      const decade = Math.floor(parseInt(year) / 10) * 10;
      decadeGroups[decade] = (decadeGroups[decade] || 0) + count;
    })

    const chartData = Object.entries(decadeGroups)
      .map(([decade, count]) => ({
        decade : parseInt(decade), count, label: `${decade}s`
      }))
      .sort((a, b) => a.decade - b.decade);

    const margin = { top: 50, right: 30, bottom: 70, left: 60 };
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
      .domain(chartData.map(d => d.label))
      .padding(0.3);
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "12px")
      .style("text-anchor", "middle");

    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Publication Decade")
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
      .text("Number of Books")
      .style("font-size", "14px")
      .style("fill", "#666");

    svg.selectAll("mybar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.label))
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
    
    // Values above the bars
    svg.selectAll(".value-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.label) + x.bandwidth() / 2)
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
      .text("Books by Publication Decade")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");
    
  }

  //CHILDCARE

  const createChildcareChart = (childcares) => {
    const parseTime = (timeStr) => {
      if (!timeStr) return null;

      const time = timeStr.toLowerCase();
      let [hours, minutes] = time.split(":").map(part => parseInt(part));
      const isPm = time.includes("pm") && hours < 12;

      if (isPm) hours += 12;
      if (time.includes("am") && hours === 12) hours = 0;

      return hours + (minutes / 60);
    };

    const hourRanges = [
      { key: "Less than 8 hours", min: 0, max: 8, count: 0, color: "#FFD580" },
      { key: "8-9 hours", min: 8, max: 9, count: 0, color: "#FFBF00" },
      { key: "9-10 hours", min: 9, max: 10, count: 0, color: "#FFA500" },
      { key: "10-11 hours", min: 10, max: 11, count: 0, color: "#FF8C00" },
      { key: "11-12 hours", min: 11, max: 12, count: 0, color: "#FF7F50" },
      { key: "More than 12 hours", min: 12, max: 24, count: 0, color: "#FF6347" }
    ];
    
    const hourData = childcares
      .filter(service => service.open_time && service.close_time)
      .map ( service => {
        const openTime = parseTime(service.open_time);
        const closeTime = parseTime(service.close_time);
        if (openTime == null || closeTime == null) {
          return null;
        }

        let hoursOpen = closeTime - openTime;

        // For overnight -- are there any that we have in these?
        if (hoursOpen < 0) {
          hoursOpen += 24; 
        }

        return {
          name: service.name,
          hoursOpen: Math.round(hoursOpen * 10) / 10,
          openTime,
          closeTime,
          type: service.program_type || "Unknown"
        };
      })
      .filter(d => d !== null);


      hourData.forEach(service => {
        const range = hourRanges.find(r => service.hoursOpen >= r.min && service.hoursOpen < r.max);
        if (range) {
          range.count++;
        }
      });

      const pieData = hourRanges.filter(r => r.count > 0);

      const width = chartRef.current.clientWidth;
      const height = 400;
      const radius = Math.min(width, height) / 2.5 - 40;

      const svg = d3.select(chartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2 + 20})`);
    
      svg.append("text")
        .attr("class", "chart-title")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", -height/2 + 20)
        .text("Childcare Services by Daily Operating Hours")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#333");

      const pie = d3.pie()
        .value (d => d.count)
        .sort(null);

      const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);

      const labelArc = d3.arc()
        .innerRadius(radius * 1.1)
        .outerRadius(radius * 1.1);

      const hoverArc = d3.arc()
      .innerRadius(radius * 0.35)
      .outerRadius(radius * 1.05);

      const arcs = svg.selectAll(".arc")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("class", "arc");
      
      const defs = svg.append("defs")

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
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          { startAngle: d.startAngle, endAngle: d.endAngle }
        );
        return function(t) {
          return arc(interpolate(t));
        };
      });
    
    // Add percentage labels inside the donut
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
        const percentage = Math.round((d.data.count / hourData.length) * 100);
        return percentage >= 5 ? `${percentage}%` : '';
      })
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);
    
    // Add outside connecting lines and labels for better readability
    arcs.append('polyline')
      .attr('points', d => {
        const pos = labelArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        const x = Math.sin(midAngle) * (radius + 20);
        const y = -Math.cos(midAngle) * (radius + 20);
        const percentage = Math.round((d.data.count / hourData.length) * 100);
        return percentage >= 5 ? [arc.centroid(d), labelArc.centroid(d), [x, y]] : [];
      })
      .style('fill', 'none')
      .style('stroke', '#666')
      .style('stroke-width', 1)
      .style('opacity', 0)
      .transition()
      .delay(1200)
      .duration(500)
      .style('opacity', 0.6);
    
    arcs.append('text')
      .attr('transform', d => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        const x = Math.sin(midAngle) * (radius + 30);
        const y = -Math.cos(midAngle) * (radius + 30);
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', d => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? 'start' : 'end';
      })
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('fill', '#555')
      .text(d => {
        const percentage = Math.round((d.data.count / hourData.length) * 100);
        return percentage >= 5 ? d.data.key : '';
      })
      .style('opacity', 0)
      .transition()
      .delay(1200)
      .duration(500)
      .style('opacity', 1);
    
    // Add service text showing total number
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('font-size', '22px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text(hourData.length);
      
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .style('font-size', '14px')
      .style('fill', '#666')
      .text('Services');

  }

  //HOUSING
  const createHousingChart = (books) => {
    
  }

 


  
  return (
    <div className="visualization-card">
      <h2 className="visualization-title">{title}</h2>
      <p className="visualization-description">{description}</p>
      <div className="chart-container" ref={chartRef}></div>
    </div>
  );
};

export default VisualizationCard;