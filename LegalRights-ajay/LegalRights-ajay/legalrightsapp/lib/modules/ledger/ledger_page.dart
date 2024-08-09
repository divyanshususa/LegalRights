import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/modules/components/admin_app_drawer.dart';
import 'package:legalrights/modules/ledger/components/add_ledger_entry.dart';
import 'package:legalrights/modules/ledger/components/view_ledger_entry.dart';
import 'package:legalrights/modules/ledger/ledger_controller.dart';

class LedgerPage extends StatefulWidget {
  const LedgerPage({super.key});

  @override
  State<LedgerPage> createState() => _LedgerPageState();
}

class _LedgerPageState extends State<LedgerPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    Get.put(LedgerController());

    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      drawer: const AdminAppDrawer(),
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: const Text('Ledger Entry'),
      ),
      body: Column(
        children: [
          TabBar(
            controller: _tabController,
            isScrollable: true,
            labelColor: const Color.fromARGB(255, 0, 0, 0),
            unselectedLabelColor: const Color.fromARGB(179, 49, 49, 49),
            indicatorColor: const Color.fromARGB(255, 0, 0, 0),
            tabAlignment: TabAlignment.center,
            tabs: List.generate(2, (index) {
              return GestureDetector(
                onTap: () {
                  _tabController.animateTo(index);
                },
                child: Tab(
                  text: [
                    'Add Ledger Entry',
                    'View Ledger Entries',
                  ][index],
                ),
              );
            }),
          ),
          SingleChildScrollView(
            child: SizedBox(
              height: size.height - 132,
              width: size.width,
              child: TabBarView(controller: _tabController, children: const [
                AddLedgerEntry(),
                ViewLedgerEntry(),
              ]),
            ),
          )
        ],
      ),
    );
  }
}
