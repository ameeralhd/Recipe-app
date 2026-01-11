import React, { useState, useEffect } from 'react';
import { getCategories, filterByCategory } from '../api';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';

const Explore = () => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('BeeF'); // Default
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCats = async () => {
            const cats = await getCategories();
            setCategories(cats);
            // Determine default
            if (cats && cats.length > 0) {
                const defaultCat = cats[0].strCategory;
                setActiveCategory(defaultCat);
                loadCategoryMeals(defaultCat);
            }
        };
        fetchCats();
    }, []);

    const loadCategoryMeals = async (cat) => {
        setLoading(true);
        setActiveCategory(cat);
        try {
            const results = await filterByCategory(cat);
            setMeals(results);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 20px' }}>
            <h1>Explore <span style={{ color: 'hsl(var(--color-primary))' }}>Categories</span></h1>

            {/* Category Pills */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '2rem',
                marginBottom: '2rem'
            }}>
                {categories.map(cat => (
                    <button
                        key={cat.idCategory}
                        onClick={() => loadCategoryMeals(cat.strCategory)}
                        style={{
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            backgroundColor: activeCategory === cat.strCategory ? 'hsl(var(--color-primary))' : 'white',
                            color: activeCategory === cat.strCategory ? 'white' : 'rgb(var(--color-text))',
                            cursor: 'pointer',
                            fontWeight: 600,
                            boxShadow: activeCategory === cat.strCategory ? '0 4px 12px hsla(var(--color-primary), 0.4)' : '0 2px 6px rgba(0,0,0,0.05)',
                            transition: 'var(--transition)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat.strCategory}
                    </button>
                ))}
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid animate-fade-in">
                    {meals.map((meal) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Explore;
