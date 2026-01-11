import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ meal }) => {
    return (
        <div className="card glass" style={{
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            transition: 'var(--transition)',
            position: 'relative',
            backgroundColor: 'white'
        }}>
            <div style={{ overflow: 'hidden', height: '200px' }}>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <span style={{
                    fontSize: '0.8rem',
                    color: 'hsl(var(--color-primary))',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {meal.strCategory || 'Recipe'}
                </span>
                <h3 style={{ margin: '0.5rem 0', fontSize: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {meal.strMeal}
                </h3>
                <Link to={`/recipe/${meal.idMeal}`}>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        View Recipe
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
