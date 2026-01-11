import React, { useState, useEffect } from 'react';
import { searchMeals, getRandomMeal } from '../api';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';

const Home = () => {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);

    // Fetch initial random meals
    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            try {
                // Fetch 8 random meals for the "Featured" section
                const promises = Array.from({ length: 8 }, () => getRandomMeal());
                const results = await Promise.all(promises);
                setMeals(results.filter(m => m)); // Filter out nulls
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setIsSearch(true);
        try {
            const results = await searchMeals(query);
            setMeals(results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                padding: '6rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, hsl(var(--color-background)) 0%, rgba(var(--color-primary), 0.1) 100%)',
                marginBottom: '4rem',
                borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
            }}>
                <div className="container animate-fade-in">
                    <span style={{
                        color: 'hsl(var(--color-primary))',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '1rem',
                        display: 'block'
                    }}>
                        Discover Recipes
                    </span>
                    <h1 style={{ marginBottom: '2rem' }}>What are you <span style={{ color: 'hsl(var(--color-primary))' }}>craving</span>?</h1>

                    <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search for Chicken, Pasta, Cake..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="glass"
                            style={{
                                width: '100%',
                                padding: '16px 24px',
                                borderRadius: '50px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                fontSize: '1.1rem',
                                outline: 'none',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        />
                        <button type="submit" className="btn btn-primary" style={{
                            position: 'absolute',
                            right: '6px',
                            top: '6px',
                            padding: '10px 24px',
                            borderRadius: '40px'
                        }}>
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="container">
                <h2 style={{ marginBottom: '2rem' }}>
                    {isSearch ? `Results for "${query}"` : 'Trending Now'}
                </h2>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid animate-fade-in">
                        {meals.map((meal) => (
                            <RecipeCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                )}

                {!loading && meals.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'gray' }}>
                        <h3>No recipes found. Try another search.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
