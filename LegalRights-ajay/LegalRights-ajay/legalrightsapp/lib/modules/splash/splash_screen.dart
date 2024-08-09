
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/user_apis.dart';
import 'package:legalrights/controllers/app_controller.dart';
import 'package:legalrights/models/user_model.dart';
import 'package:legalrights/modules/dashboard/dashboard_controller.dart';
import 'package:legalrights/services/get_storage_services.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    initSplashScreen();
    super.initState();
  }

  initSplashScreen() async {
    GetStorageServices getStorageServices = GetStorageServices();
    Map<String, String?> data =
        await getStorageServices.getLoginDataFromStorage();
    if (data['email'] != null &&
        data['password'] != null &&
        data['token'] != null) {
      Map<String, dynamic> res =
          await loginUser(email: data['email'], password: data['password']);
      UserModel user = UserModel.fromJson(res["data"]);
      Get.find<AppController>().user = user;

      Get.find<AppController>().update();
      if (Get.find<AppController>().user.role == "admin") {
        Navigator.pushReplacementNamed(context, "/ledgers");
      } else {
        Get.put(DashboardController());
        Navigator.pushReplacementNamed(context, "/");
      }
    } else {
      Navigator.pushReplacementNamed(context, "/login");
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text("Legal Rights"),
      ),
    );
  }
}
