import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/services/get_storage_services.dart';

class AdminAppDrawer extends StatelessWidget {
  const AdminAppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Color.fromARGB(255, 0, 59, 167),
            ),
            child: Text(
              'Menu',
              style: TextStyle(color: Colors.white, fontSize: 24),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.dashboard),
            title: const Text('All User Post'),
            onTap: () {
              Navigator.pushNamed(context, '/all_user_post');
            },
          ),
          ListTile(
            leading: const Icon(Icons.data_usage),
            title: const Text('Ledger Entry'),
            onTap: () {
              Navigator.pushNamed(context, '/ledgers');
            },
          ),
          ListTile(
            leading: const Icon(Icons.exit_to_app),
            title: const Text('Sign Out'),
            onTap: () async {
              // Implement your sign-out logic here
              await GetStorageServices().removeDataFromStorage();
              await Get.deleteAll();
              Navigator.pushNamedAndRemoveUntil(
                  context, '/login', (route) => false);
            },
          ),
        ],
      ),
    );
  }
}
