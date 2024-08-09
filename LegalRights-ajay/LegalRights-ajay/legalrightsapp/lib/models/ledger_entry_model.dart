class LedgerModel {
  String? sId;
  int? snoCredit;
  String? dateCredit;
  String? phoneNumberCredit;
  int? creditCredit;
  int? balanceCredit;
  String? dateDebit;
  int? debitDebit;
  int? balanceDebit;
  int? snoDebit;
  int? iV;

  LedgerModel(
      {this.sId,
      this.snoCredit,
      this.dateCredit,
      this.phoneNumberCredit,
      this.creditCredit,
      this.balanceCredit,
      this.dateDebit,
      this.debitDebit,
      this.balanceDebit,
      this.snoDebit,
      this.iV});

  LedgerModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    snoCredit = json['Sno_Credit'];
    dateCredit = json['date_Credit'];
    phoneNumberCredit = json['phoneNumber_Credit'];
    creditCredit = json['credit_Credit'];
    balanceCredit = json['balance_Credit'];
    dateDebit = json['date_debit'];
    debitDebit = json['debit_debit'];
    balanceDebit = json['balance_debit'];
    snoDebit = json['Sno_debit'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['Sno_Credit'] = snoCredit;
    data['date_Credit'] = dateCredit;
    data['phoneNumber_Credit'] = phoneNumberCredit;
    data['credit_Credit'] = creditCredit;
    data['balance_Credit'] = balanceCredit;
    data['date_debit'] = dateDebit;
    data['debit_debit'] = debitDebit;
    data['balance_debit'] = balanceDebit;
    data['Sno_debit'] = snoDebit;
    return data;
  }
}
