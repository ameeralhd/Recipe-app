import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class User {
  final String email;
  final String name;

  User({required this.email, required this.name});

  Map<String, dynamic> toJson() => {'email': email, 'name': name};

  factory User.fromJson(Map<String, dynamic> json) {
    return User(email: json['email'], name: json['name']);
  }
}

class AuthProvider with ChangeNotifier {
  User? _user;
  bool _loading = true;

  User? get user => _user;
  bool get loading => _loading;
  bool get isAuthenticated => _user != null;

  AuthProvider() {
    _loadUser();
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString('user');
    if (userData != null) {
      _user = User.fromJson(json.decode(userData));
    }
    _loading = false;
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    // Mock login
    await Future.delayed(
      const Duration(milliseconds: 500),
    ); // Simulate net delay
    _user = User(email: email, name: email.split('@')[0]);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', json.encode(_user!.toJson()));

    notifyListeners();
    return true;
  }

  Future<bool> signup(String name, String email, String password) async {
    // Mock signup
    await Future.delayed(const Duration(milliseconds: 500));
    _user = User(email: email, name: name);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', json.encode(_user!.toJson()));

    notifyListeners();
    return true;
  }

  Future<void> logout() async {
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user');
    notifyListeners();
  }
}
