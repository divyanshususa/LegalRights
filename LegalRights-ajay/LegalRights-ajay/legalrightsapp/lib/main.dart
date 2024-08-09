import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:legalrights/controllers/app_controller.dart';
import 'package:legalrights/modules/all_users/all_users.dart';
import 'package:legalrights/modules/auth/register_screen.dart';
import 'package:legalrights/modules/dashboard/dashboard_screen.dart';
import 'package:legalrights/modules/dataEntry/data_entry_page.dart';
import 'package:legalrights/modules/history/history.dart';
import 'package:legalrights/modules/ledger/ledger_page.dart';
import 'package:legalrights/modules/auth/login_screen.dart';
import 'package:legalrights/modules/splash/splash_screen.dart';

void main() async {
  await GetStorage.init();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(AppController());
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/splash_screen',
      routes: {
        '/': (context) => const DashboardScreen(),
        '/all_user_post': (context) => const AllUsersPage(),
        '/ledgers': (context) => const LedgerPage(),
        '/login': (context) => const LoginPage(),
        '/signup': (context) => const SignUpPage(),
        '/splash_screen': (context) => const SplashScreen(),
        '/data_entry': (context) => const DataEntryPage(),
        '/history': (context) => const HistoryPage(),
      },
    );
  }
}
