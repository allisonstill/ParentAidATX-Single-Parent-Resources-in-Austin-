// GlobalSearch.jsx
import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import ChildCard from '../components/childCard';
import BookCard from '../components/bookCard';
import HousingCard from '../components/housingCard';
import './Childcare_Service.css';
import './Searchpage.css'; 
import './Search.css'; 


const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [allData, setAllData] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [childcareRes, booksRes, housingRes] = await Promise.all([
        fetch('https://api.parentaidatx.me/api/childcare').then(r => r.json()),
        fetch('https://api.parentaidatx.me/api/books').then(r => r.json()),
        fetch('https://api.parentaidatx.me/api/housing').then(r => r.json()),
      ]);

      const formatChild = (d) => ({
        ...d,
        _type: 'Childcare',
        image: d.image_url,
        type: d.program_type,  
        _search_blob: `${d.name} ${d.program_type} ${d.age_range} ${d.address} ${d.description || ''}`
      });

      const formatBook = (b) => ({
        ...b,
        _type: 'Book',
        _search_blob: `${b.title} ${b.author} ${b.cat} ${b.description || ''}`
      });

      const formatHousing = (h) => ({
        ...h,
        _type: 'Housing',
        _search_blob: `${h.name} ${h.address} ${h.rating} ${h.website || ''}`
      });

      const childData = childcareRes.map(d => ({
        ...d,
        _type: 'Childcare',
        image: d.image_url,
        type: d.program_type,
        _search_blob: `
          ${d.name}
          ${d.program_type}
          ${d.age_range}
          ${d.open_time}
          ${d.close_time}
          ${d.address}
          ${d.description || ""}
        `,
        _related: [d.related_book, d.related_housing].filter(Boolean)
      }));

      const bookData = booksRes.map(b => {
        const related = [
          b.related_childcare ? formatChild(b.related_childcare) : null,
          b.related_housing ? formatHousing(b.related_housing) : null
        ].filter(Boolean);

        return {
          ...formatBook(b),
          _related: related
        };
      });

      const housingData = housingRes.map(h => {
        const related = [
          h.related_childcare ? formatChild(h.related_childcare) : null,
          h.related_book ? formatBook(h.related_book) : null
        ].filter(Boolean);

        return {
          ...formatHousing(h),
          _related: related
        };
      });

      const allCombined = [...childData, ...bookData, ...housingData];

      setAllData(allCombined);
      setFuse(new Fuse(allCombined, {
        keys: ['_search_blob'],
        threshold: 0.3,
        includeScore: true
      }));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (!fuse || !query) return setResults([]);

    const mainResults = fuse.search(query).map(r => r.item);

    const allWithRelated = [
      ...mainResults,
      ...mainResults.flatMap(r => r._related || [])
    ];

    const unique = [];
    const seen = new Set();
    for (const item of allWithRelated) {
      const key = `${item.id}-${item._type}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }

    setResults(unique);
  }, [query, fuse]);

  const grouped = results.reduce((acc, item) => {
    acc[item._type] = acc[item._type] || [];
    acc[item._type].push(item);
    return acc;
  }, {});

  return (
    <div className="child-page-container">
      <h1 className="child-page-title">Search the ParentAidATX Directory</h1>
      <p className="child-page-description">Type to find childcare, housing, and books all in one place</p>
      <div className="filters-search-container">
        <div className="filters-search-wrapper">
          <input
            type="text"
            className="search-box"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search childcare, housing, books..."
          />
        </div>
      </div>

      <div className="results-grid">
        <div className="result-column">
          <h2>Books</h2>
          {grouped.Book?.map(item => (
            <div key={`Book-${item.id}`} className="card-wrapper">
              <BookCard {...item} searchQuery={query}/>
            </div>
          ))}
        </div>

        <div className="result-column">
          <h2>Housing</h2>
          {grouped.Housing?.map(item => (
            <div key={`Housing-${item.id}`} className="card-wrapper">
              <HousingCard {...item} searchQuery={query}/>
            </div>
          ))}
        </div>

        <div className="result-column">
          <h2>Childcare</h2>
          {grouped.Childcare?.map(item => (
            <div key={`Childcare-${item.id}`} className="card-wrapper">
              <ChildCard {...item} searchQuery={query} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
