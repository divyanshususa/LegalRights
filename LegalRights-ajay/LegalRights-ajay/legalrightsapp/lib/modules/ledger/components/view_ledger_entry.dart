import 'package:flutter/material.dart';
import 'package:legalrights/APIS/ledger_apis.dart';
import 'package:legalrights/models/ledger_entry_model.dart';
import 'package:legalrights/utils/app_textStyles.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class ViewLedgerEntry extends StatefulWidget {
  const ViewLedgerEntry({super.key});

  @override
  State<ViewLedgerEntry> createState() => _ViewLedgerEntryState();
}

class _ViewLedgerEntryState extends State<ViewLedgerEntry> {
  late FormDataSource _formDataSource;
  final TextEditingController _searchController = TextEditingController();
  bool isLoading = true;
  bool isError = false;
  @override
  void initState() {
    super.initState();
    getLedgerEntries();
    _searchController.addListener(_onSearchChanged);
  }

  void _onSearchChanged() {
    _formDataSource.updateSearch(_searchController.text);
  }

  getLedgerEntries() async {
    var res = await getLedgerEntryApi();
    if (res["status"]) {
      List<LedgerModel> data = [];
      for (var i = 0; i < res["data"].length; i++) {
        data.add(LedgerModel.fromJson(res["data"][i]));
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
                                width: 60,
                                allowSorting: true,
                                columnName: 'Sno Credit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const TextWithStyle(
                                        text: 'Sno Credit',
                                        textStyle: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Sno Debit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Sno Debit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Balance Credit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Balance Credit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Balance Debit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Balance Debit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Credit Credit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Credit Credit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Date Credit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Date Credit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Date Debit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Date Debit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Debit Debit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Debit Debit',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold)))),
                            GridColumn(
                                columnName: 'Phone Number Credit',
                                label: Container(
                                    padding: const EdgeInsets.all(8.0),
                                    alignment: Alignment.center,
                                    child: const Text('Ph Number Credit',
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
  FormDataSource({required List<LedgerModel> formData}) {
    _formData = formData
        .map<DataGridRow>((data) => DataGridRow(cells: [
              DataGridCell<String>(
                  columnName: 'Sno Credit', value: data.snoCredit.toString()),
              DataGridCell<String>(
                  columnName: 'Sno Debit', value: data.snoDebit.toString()),
              DataGridCell<String>(
                  columnName: 'Balance Credit',
                  value: data.balanceCredit.toString()),
              DataGridCell<String>(
                  columnName: 'Balance Debit',
                  value: data.balanceDebit.toString()),
              DataGridCell<String>(
                  columnName: 'Credit Credit',
                  value: data.creditCredit.toString()),
              DataGridCell<String>(
                  columnName: 'Date Credit', value: data.dateCredit),
              DataGridCell<String>(
                  columnName: 'Date Debit', value: data.dateDebit),
              DataGridCell<String>(
                  columnName: 'Debit Debit', value: data.debitDebit.toString()),
              DataGridCell<String>(
                  columnName: 'Phone Number Credit',
                  value: data.phoneNumberCredit),
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
