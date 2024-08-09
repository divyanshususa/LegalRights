
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/user_apis.dart';
import 'package:legalrights/controllers/app_controller.dart';
import 'package:legalrights/models/user_model.dart';
import 'package:legalrights/modules/dashboard/dashboard_controller.dart';
import 'package:legalrights/services/get_storage_services.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController =
      TextEditingController(text: "user@gmail.com");
  final TextEditingController _passwordController =
      TextEditingController(text: "pass");
  bool _obscureText = true;
  @override
  void initState() {
    Get.put(AppController());

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        automaticallyImplyLeading: false,
        title: const Text('Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Email',
                suffixIcon: Icon(Icons.email),
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 16.0),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: 'Password',
                suffixIcon: IconButton(
                  icon: Icon(
                    _obscureText ? Icons.visibility : Icons.visibility_off,
                  ),
                  onPressed: () {
                    setState(() {
                      _obscureText = !_obscureText;
                    });
                  },
                ),
                border: const OutlineInputBorder(),
              ),
              obscureText: _obscureText,
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(255, 33, 72, 243),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  )),
              onPressed: () async {
                if (_emailController.text.isEmpty ||
                    _passwordController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Please enter email and password"),
                    ),
                  );
                  return;
                }
                // Implement your sign-in logic here
                var res = await loginUser(
                    email: _emailController.text,
                    password: _passwordController.text);
                if (res["status"]) {
                  Get.find<AppController>().user =
                      UserModel.fromJson(res["data"]);
                  Get.find<AppController>().update();
                  GetStorageServices().saveLoginDataToStorage(
                      password: _passwordController.text,
                      email: _emailController.text,
                      token: res["data"]["token"]);
                  if (Get.find<AppController>().user.role == "admin") {
                    Navigator.pushReplacementNamed(context, "/all_user_post");
                  } else {
                    Get.put(DashboardController());
                    Navigator.pushReplacementNamed(context, "/");
                  }
                }
              },
              child: const Text(
                'Sign In',
                style: TextStyle(color: Colors.white),
              ),
            ),
            const SizedBox(height: 16.0),
            GestureDetector(
              onTap: () {
                Navigator.pushReplacementNamed(context, "/signup");
              },
              child: const Text(
                'Don\'t have an account? Sign Up',
                style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
