import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/modules/components/app_drawer.dart';
import 'package:legalrights/modules/dataEntry/components/add_data_entry.dart';
import 'package:legalrights/modules/dataEntry/components/view_data_entry.dart';
import 'package:legalrights/modules/dataEntry/data_entry_controller.dart';

class DataEntryPage extends StatefulWidget {
  const DataEntryPage({super.key});

  @override
  State<DataEntryPage> createState() => _DataEntryPageState();
}

class _DataEntryPageState extends State<DataEntryPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    Get.put(DataEntryController());
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
      drawer: const AppDrawer(),
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: const Text('Date Entry'),
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
                    'Add Data Entry',
                    'View Data Entries',
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
                AddDataEntry(),
                ViewDataEntry(),
              ]),
            ),
          )
        ],
      ),
    );
  }
}
