import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/user_apis.dart';
import 'package:legalrights/controllers/app_controller.dart';
import 'package:legalrights/models/create_user_model.dart';
import 'package:legalrights/utils/app_loading_widget.dart';
import 'package:legalrights/utils/app_textStyles.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  String? roleValue;
  final TextEditingController _emailController =
      TextEditingController(text: "user@gmail.com");
  final TextEditingController _passwordController =
      TextEditingController(text: "pass");
  final TextEditingController _firstNameController =
      TextEditingController(text: "honey");
  final TextEditingController _lastNameController =
      TextEditingController(text: "user");
  bool _obscureText = true;
  @override
  void initState() {
    Get.put(AppController());

    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        automaticallyImplyLeading: false,
        title: const Text('Sign Up'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding:
              const EdgeInsets.only(bottom: 16, left: 16, right: 16, top: 16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextField(
                controller: _firstNameController,
                decoration: const InputDecoration(
                  labelText: 'First Name',
                  suffixIcon: Icon(Icons.supervised_user_circle_outlined),
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: 16.0),
              TextField(
                controller: _lastNameController,
                decoration: const InputDecoration(
                  labelText: 'Last Name',
                  suffixIcon: Icon(Icons.supervised_user_circle_rounded),
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: 16.0),
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
              Center(
                child: DropdownButton<String>(
                  dropdownColor: Colors.white,
                  value: roleValue,
                  hint: const TextWithStyle(text: 'Select role'),
                  items: const [
                    DropdownMenuItem(
                      value: 'Customer',
                      child: TextWithStyle(text: 'Customer'),
                    ),
                    DropdownMenuItem(
                      value: 'Admin',
                      child: TextWithStyle(text: 'Admin'),
                    ),
                    // Add more items as needed
                  ],
                  onChanged: (value) async {
                    setState(() {
                      roleValue = value;
                    });
                  },
                ),
              ),
              const SizedBox(height: 16.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 33, 72, 243),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    )),
                onPressed: () async {
                  if (checkIfanyFieldIsEmpty()) {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: TextWithStyle(
                        text: "Please fill all the fields",
                      ),
                    ));
                    return;
                  }
                  RegisterUserModel model = RegisterUserModel(
                    email: _emailController.text.trim(),
                    password: _passwordController.text,
                    firstName: _firstNameController.text,
                    lastName: _lastNameController.text,
                    role: roleValue == "Customer" ? "customer" : "admin",
                  );
                  loadingWidget(context);
                  // Implement your sign-in logic here
                  var res = await registerUser(model.toJson());
                  if (res["status"]) {
                    Navigator.pop(context);
                    Navigator.pushReplacementNamed(context, "/login");
                  } else {
                    Navigator.pop(context);
                  }
                },
                child: const Text(
                  'Register',
                  style: TextStyle(color: Colors.white),
                ),
              ),
              const SizedBox(height: 16.0),
              GestureDetector(
                onTap: () {
                  // Implement your sign-up logic here
                  Navigator.pushReplacementNamed(context, "/login");
                },
                child: const Text(
                  'Already have an account? Sign In',
                  style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  checkIfanyFieldIsEmpty() {
    if (_emailController.text.isEmpty ||
        _passwordController.text.isEmpty ||
        _firstNameController.text.isEmpty ||
        _lastNameController.text.isEmpty ||
        roleValue == null) {
      return true;
    }
    return false;
  }
}
