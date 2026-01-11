import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../models/meal.dart';
import '../services/api_service.dart';

class RecipeDetailScreen extends StatefulWidget {
  final String mealId;

  const RecipeDetailScreen({super.key, required this.mealId});

  @override
  State<RecipeDetailScreen> createState() => _RecipeDetailScreenState();
}

class _RecipeDetailScreenState extends State<RecipeDetailScreen> {
  final ApiService _apiService = ApiService();
  Meal? _meal;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchDetails();
  }

  Future<void> _fetchDetails() async {
    try {
      final meal = await _apiService.getMealById(widget.mealId);
      if (mounted) {
        setState(() {
          _meal = meal;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (_meal == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Error')),
        body: const Center(child: Text('Recipe not found')),
      );
    }

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                _meal!.name,
                style: const TextStyle(
                  shadows: [Shadow(color: Colors.black, blurRadius: 4)],
                ),
              ),
              background: CachedNetworkImage(
                imageUrl: _meal!.thumbnail,
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(color: Colors.grey),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Chip(
                        label: Text(_meal!.category),
                        avatar: const Icon(Icons.category),
                      ),
                      const SizedBox(width: 8),
                      Chip(
                        label: Text(_meal!.area),
                        avatar: const Icon(Icons.public),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'Ingredients',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _meal!.ingredients.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        dense: true,
                        leading: const Icon(Icons.circle, size: 8),
                        title: Text(
                          '${_meal!.ingredients[index]} - ${_meal!.measures[index]}',
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'Instructions',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _meal!.instructions,
                    style: Theme.of(
                      context,
                    ).textTheme.bodyLarge?.copyWith(height: 1.5),
                  ),
                  if (_meal!.youtubeUrl != null &&
                      _meal!.youtubeUrl!.isNotEmpty) ...[
                    const SizedBox(height: 24),
                    Text('Watch Tutorial: ${_meal!.youtubeUrl}'),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
