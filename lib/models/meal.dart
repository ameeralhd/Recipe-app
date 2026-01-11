class Meal {
  final String id;
  final String name;
  final String category;
  final String area;
  final String instructions;
  final String thumbnail;
  final String? youtubeUrl;
  final List<String> ingredients;
  final List<String> measures;

  Meal({
    required this.id,
    required this.name,
    required this.category,
    required this.area,
    required this.instructions,
    required this.thumbnail,
    this.youtubeUrl,
    required this.ingredients,
    required this.measures,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    List<String> ingredients = [];
    List<String> measures = [];

    for (int i = 1; i <= 20; i++) {
      final ingredient = json['strIngredient$i'];
      final measure = json['strMeasure$i'];

      if (ingredient != null && ingredient.toString().trim().isNotEmpty) {
        ingredients.add(ingredient as String);
        if (measure != null && measure.toString().trim().isNotEmpty) {
          measures.add(measure as String);
        } else {
          measures.add('');
        }
      }
    }

    return Meal(
      id: json['idMeal'] as String,
      name: json['strMeal'] as String,
      category: json['strCategory'] as String,
      area: json['strArea'] as String? ?? 'Unknown',
      instructions: json['strInstructions'] as String,
      thumbnail: json['strMealThumb'] as String,
      youtubeUrl: json['strYoutube'] as String?,
      ingredients: ingredients,
      measures: measures,
    );
  }
}
