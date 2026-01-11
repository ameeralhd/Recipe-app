import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/meal.dart';
import '../models/category.dart';

class ApiService {
  static const String baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  Future<List<Meal>> searchMeals(String term) async {
    final response = await http.get(Uri.parse('$baseUrl/search.php?s=$term'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['meals'] != null) {
        return (data['meals'] as List).map((json) => Meal.fromJson(json)).toList();
      }
    }
    return [];
  }

  Future<Meal?> getMealById(String id) async {
    final response = await http.get(Uri.parse('$baseUrl/lookup.php?i=$id'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['meals'] != null && (data['meals'] as List).isNotEmpty) {
        return Meal.fromJson(data['meals'][0]);
      }
    }
    return null;
  }

  Future<Meal?> getRandomMeal() async {
    final response = await http.get(Uri.parse('$baseUrl/random.php'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['meals'] != null && (data['meals'] as List).isNotEmpty) {
        return Meal.fromJson(data['meals'][0]);
      }
    }
    return null;
  }

  Future<List<Category>> getCategories() async {
    final response = await http.get(Uri.parse('$baseUrl/categories.php'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['categories'] != null) {
        return (data['categories'] as List)
            .map((json) => Category.fromJson(json))
            .toList();
      }
    }
    return [];
  }

  Future<List<Meal>> filterByCategory(String category) async {
    final response = await http.get(Uri.parse('$baseUrl/filter.php?c=$category'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['meals'] != null) {
        // Note: Filter endpoint returns abbreviated meal objects (id, name, thumb).
        // It does NOT return full details like instructions/ingredients.
        // We'll map what we have, but fields like instructions will be missing/null if we strictly enforced them.
        // However, our Meal.fromJson expects full fields.
        // We should probably modify Meal.fromJson or creating a partial Meal or just use empty strings for missing data.
        // For the purpose of the list, we need id, name, thumb.
        // Let's adjust Meal.fromJson to handle nulls gracefully or create a separate method/model?
        // Actually, let's keep it simple: filter endpoint returns: strMeal, strMealThumb, idMeal.
        // We will pass empty strings for others?
        // Or better: update Meal to allow nullable fields or defaults.
        // Let's update ApiService to handle this construction manually for filter results, 
        // OR better yet, let the JSON parsing handle nulls by using '?? ""'.
        // My Meal.fromJson uses `json['strInstructions'] as String`. This will crash if key is missing/null.
        
        return (data['meals'] as List).map((item) {
           return Meal(
             id: item['idMeal'],
             name: item['strMeal'],
             thumbnail: item['strMealThumb'],
             category: category, // We know the category
             area: 'Unknown',
             instructions: '', // Missing in filter response
             ingredients: [],
             measures: [],
           );
        }).toList();
      }
    }
    return [];
  }
}
