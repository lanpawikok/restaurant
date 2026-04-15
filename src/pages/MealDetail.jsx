import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function MealDetail() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMealDetail() {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const result = await response.json();
            setMeal(result.meals[0]);
            setLoading(false);
        }
        getMealDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="block mx-auto mt-50 w-100 text-center">
                <Spinner /> Sedang Memuat resep...
            </div>
        );
    }

    // ambil ingredients yang tidak kosong
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    return (
        <div className="max-w-4xl mx-auto my-10 px-5">
            <h1 className="text-3xl font-bold mb-2">{meal.strMeal}</h1>
            <p className="text-gray-500 mb-6">{meal.strCategory} • {meal.strArea}</p>

            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded-xl mb-8 object-cover max-h-96"
            />

            <div className="grid grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Bahan-bahan</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {ingredients.map((ing, index) => (
                            <li key={index} className="text-gray-700">{ing}</li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Cara Memasak</h2>
                    <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                        {meal.strInstructions}
                    </p>
                </div>
            </div>

            {meal.strYoutube && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-3">Video Tutorial</h2>
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        className="text-cyan-500 underline"
                    >
                        Tonton di YouTube
                    </a>
                </div>
            )}
        </div>
    );
}