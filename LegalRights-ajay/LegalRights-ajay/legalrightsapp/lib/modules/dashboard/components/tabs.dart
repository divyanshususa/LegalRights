import 'package:flutter/material.dart';
import 'package:legalrights/modules/components/quill_editor.dart';
import 'package:legalrights/modules/dashboard/components/general_information.dart';

class Header extends StatefulWidget {
  const Header({super.key});

  @override
  _HeaderState createState() => _HeaderState();
}

class _HeaderState extends State<Header> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 1, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _showModalSheet(int index) {
    Widget content = Container();
    String title = '';
    switch (index) {
      case 0:
        title = 'General Information';
        content = const GeneralInformation();
        break;
    }

    showModalBottomSheet(
      context: context,
      useSafeArea: true,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      builder: (context) {
        Size size = MediaQuery.of(context).size;
        return SizedBox(
          width: size.width,
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.only(
                  left: 16,
                  right: 16,
                  bottom: MediaQuery.of(context).viewInsets.bottom),
              child: Column(
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  content,
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      children: [
        TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: const Color.fromARGB(255, 0, 0, 0),
          unselectedLabelColor: const Color.fromARGB(179, 49, 49, 49),
          indicatorColor: const Color.fromARGB(255, 0, 0, 0),
          tabAlignment: TabAlignment.start,
          tabs: List.generate(1, (index) {
            return GestureDetector(
              onTap: () {
                _tabController.animateTo(index);
                _showModalSheet(index);
              },
              child: Tab(
                text: [
                  'A - General Information',
                ][index],
              ),
            );
          }),
        ),
        SingleChildScrollView(
          child: SizedBox(
            height: size.height - 208,
            child: const QuillEditor(),
          ),
        ),
      ],
    );
  }
}
