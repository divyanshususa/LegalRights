import 'package:flutter/material.dart';
import 'package:legalrights/APIS/data_entry_apis.dart';
import 'package:legalrights/models/data_entry_model.dart';
import 'package:legalrights/utils/app_textStyles.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class ViewDataEntry extends StatefulWidget {
  const ViewDataEntry({super.key});

  @override
  State<ViewDataEntry> createState() => _ViewDataEntryState();
}

class _ViewDataEntryState extends State<ViewDataEntry> {
  late FormDataSource _formDataSource;
  final TextEditingController _searchController = TextEditingController();
  bool isLoading = true;
  bool isError = false;
  @override
  void initState() {
    super.initState();
    getDataEntries();
    _searchController.addListener(_onSearchChanged);
  }

  void _onSearchChanged() {
    _formDataSource.updateSearch(_searchController.text);
  }

  getDataEntries() async {
    var res = await getdataEntryApi();
    if (res["status"]) {
      List<DataEntryModel> data = [];
      for (var i = 0; i < res["data"].length; i++) {
        data.add(DataEntryModel.fromJson(res["data"][i]));
      }
      _formDataSource = FormDataSource(formData: data);
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    } else {
      if (mounted) {
        setState(() {
          isLoading = false;
          isError = true;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);
    return isLoading
        ? const Center(
            child: CircularProgressIndicator(),
          )
        : isError
            ? const Center(
                child: TextWithStyle(
                  text: "Something went wrong",
                ),
              )
            : SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.only(
                    left: 16,
                    right: 16,
                    top: 16,
                  ),
                  child: Column(
                    children: [
                      TextField(
                        controller: _searchController,
                        decoration: const InputDecoration(
                          labelText: 'Search',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.search),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      SizedBox(
                        height: size.height - 154,
                        child: SfDataGrid(
                          source: _formDataSource,
                          columns: <GridColumn>[
                            GridColumn(
                                allowFiltering: true,
                                allowSorting: true,
                                columnName: 'Date',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const TextWithStyle(
                                        text: 'Date',
                                        textStyle: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Slip No',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Slip No',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Doc',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Doc',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: '1st Party',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('1st Party',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: '2nd Party',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('2nd Party',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Prop. Detail',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Prop. Detail',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Reg. No',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Reg. No',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'B. No',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('B. No',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Vol No',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Vol No',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Page No',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Page No',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Reg. Date',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Reg. Date',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
  }
}

class FormDataSource extends DataGridSource {
  FormDataSource({required List<DataEntryModel> formData}) {
    _formData = formData
        .map<DataGridRow>((data) => DataGridRow(cells: [
              DataGridCell<String>(columnName: 'Date', value: data.date),
              DataGridCell<String>(columnName: 'Slip No', value: data.slipNo),
              DataGridCell<String>(columnName: 'Doc', value: data.doc),
              DataGridCell<String>(
                  columnName: '1st Party', value: data.firstParty),
              DataGridCell<String>(
                  columnName: '2nd Party', value: data.secondParty),
              DataGridCell<String>(
                  columnName: 'Prop. Detail', value: data.propDetail),
              DataGridCell<String>(columnName: 'Reg. No', value: data.regNo),
              DataGridCell<String>(columnName: 'B. No', value: data.bNo),
              DataGridCell<String>(columnName: 'Vol No', value: data.volNo),
              DataGridCell<String>(columnName: 'Page No', value: data.pageNo),
              DataGridCell<String>(
                  columnName: 'Reg. Date', value: data.regDate),
            ]))
        .toList();
    _filteredData = _formData;
  }

  List<DataGridRow> _formData = [];
  List<DataGridRow> _filteredData = [];

  @override
  List<DataGridRow> get rows => _filteredData;

  @override
  DataGridRowAdapter buildRow(DataGridRow row) {
    return DataGridRowAdapter(cells: [
      for (final cell in row.getCells())
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(cell.value.toString()),
        ),
    ]);
  }

  void updateSearch(String query) {
    if (query.isEmpty) {
      _filteredData = _formData;
    } else {
      _filteredData = _formData.where((dataGridRow) {
        return dataGridRow.getCells().any((dataGridCell) {
          return dataGridCell.value
              .toString()
              .toLowerCase()
              .contains(query.toLowerCase());
        });
      }).toList();
    }
    notifyListeners();
  }
}
