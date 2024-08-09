import 'package:flutter/material.dart';

loadingWidget(BuildContext context) {
  return showDialog(
      context: context,
      barrierDismissible: false,
      builder: (builder) => PopScope(
            canPop: false,
            child: SizedBox(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: const SizedBox(
                  width: 40,
                  height: 40,
                  child: Center(
                      child: CircularProgressIndicator(
                    color: Colors.white,
                  ))),
            ),
          ));
}