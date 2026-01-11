import 'package:flutter/material.dart';
import '../models/meal.dart';
import '../services/api_service.dart';
import '../widgets/meal_card.dart';
import 'recipe_detail_screen.dart';

class CategoryMealsScreen extends StatefulWidget {
  final String categoryName;

  const CategoryMealsScreen({super.key, required this.categoryName});

  @override
  State<CategoryMealsScreen> createState() => _CategoryMealsScreenState();
}

class _CategoryMealsScreenState extends State<CategoryMealsScreen> {
  final ApiService _apiService = ApiService();
  List<Meal> _meals = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchMeals();
  }

  Future<void> _fetchMeals() async {
    try {
      final meals = await _apiService.filterByCategory(widget.categoryName);
      if (mounted) {
        setState(() {
          _meals = meals;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.categoryName)),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _meals.isEmpty
          ? const Center(child: Text('No meals found'))
          : ListView.builder(
              padding: const EdgeInsets.all(16.0),
              itemCount: _meals.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 16.0),
                  child: MealCard(
                    meal: _meals[index],
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) =>
                              RecipeDetailScreen(mealId: _meals[index].id),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
    );
  }
}
