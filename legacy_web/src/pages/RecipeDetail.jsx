import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMealById } from '../api';
import Loader from '../components/Loader';

const RecipeDetail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            setLoading(true);
            const data = await getMealById(id);
            setMeal(data);
            setLoading(false);
        };
        fetchMeal();
    }, [id]);

    if (loading) return <Loader />;
    if (!meal) return <div className="container" style={{ padding: '4rem' }}>Recipe not found.</div>;

    // Parse ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push({
                ingredient: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`]
            });
        }
    }

    // YouTube Embed
    const getEmbedUrl = (url) => {
        if (!url) return null;
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
        if (ampersandPosition !== -1) {
            return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
        }
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div>
            {/* Hero */}
            <div style={{
                height: '60vh',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    padding: '4rem 2rem 2rem',
                    color: 'white'
                }}>
                    <div className="container">
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
                            &larr; Back to Home
                        </Link>
                        <h1 style={{ fontSize: '3.5rem', margin: 0 }}>{meal.strMeal}</h1>
                        <p style={{ opacity: 0.9, fontSize: '1.2rem' }}>
                            <span style={{ fontWeight: 700, color: 'hsl(var(--color-primary))' }}>{meal.strCategory}</span>
                            {' • '}
                            {meal.strArea}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>

                {/* Left Column: Ingredients */}
                <div>
                    <h2 style={{ marginBottom: '2rem' }}>Ingredients</h2>
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {ingredients.map((item, idx) => (
                                <li key={idx} style={{
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                    padding: '12px 0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: 600 }}>{item.ingredient}</span>
                                    <span style={{ color: 'hsl(var(--color-text-light))' }}>{item.measure}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Instructions */}
                <div>
                    <h2 style={{ marginBottom: '2rem' }}>Instructions</h2>
                    <div style={{ lineHeight: '1.8', whiteSpace: 'pre-line', fontSize: '1.1rem', color: 'rgb(var(--color-text))' }}>
                        {meal.strInstructions}
                    </div>

                    {meal.strYoutube && (
                        <div style={{ marginTop: '3rem' }}>
                            <h3>Video Tutorial</h3>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                <iframe
                                    src={getEmbedUrl(meal.strYoutube)}
                                    title="YouTube video player"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RecipeDetail;
