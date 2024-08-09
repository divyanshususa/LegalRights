import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:legalrights/utils/app_textStyles.dart';

class CustomField4 extends StatelessWidget {
  final double? width;
  final String? fieldName;
  final TextInputType keyboardType;
  final Function(String)? onChanged;
  final String? hintText;
  final TextEditingController controller;
  final int? maxLines;
  final double? height;
  final String? Function(String?)? validator;

  const CustomField4({
    super.key,
    this.validator,
    this.width,
    this.maxLines = 1,
    required this.fieldName,
    required this.keyboardType,
    this.onChanged,
    this.height = 45,
    this.hintText,
    required this.controller,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        fieldName!.isNotEmpty
            ? TextWithStyle(
                text: fieldName ?? "",
                textStyle: const TextStyle(
                  fontSize: 12,
                  color: Color.fromARGB(255, 97, 97, 97),
                ),
              )
            : Container(),
        fieldName!.isNotEmpty
            ? const SizedBox(
                height: 5,
              )
            : Container(),
        SizedBox(
          height: height,
          child: TextFormField(
              controller: controller,
              autovalidateMode: AutovalidateMode.onUserInteraction,
              keyboardType: keyboardType,
              maxLines: maxLines,
              cursorColor: Colors.black,
              onChanged: onChanged,
              cursorWidth: 1,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              decoration: InputDecoration(
                  // helperText: " ",
                  errorBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(
                      color: Color.fromARGB(0, 0, 51, 255),
                      width: 2.0,
                    ),
                  ),
                  filled: true,
                  focusedErrorBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(
                      color: Color.fromARGB(0, 240, 8, 8),
                      width: 2.0,
                    ),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: const BorderSide(
                      color: Color.fromARGB(255, 215, 215, 215),
                      width: 1.0,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: const BorderSide(
                      color: Color.fromARGB(255, 170, 170, 170),
                      width: 1.0,
                    ),
                  ),
                  contentPadding:
                      const EdgeInsets.only(bottom: 5, left: 10, right: 10),
                  fillColor: const Color.fromARGB(0, 255, 255, 255),
                  hintText: hintText,
                  hintStyle: GoogleFonts.koHo(
                      textStyle: const TextStyle(
                          fontSize: 14, color: Color.fromARGB(255, 0, 0, 0))))),
        ),
      ],
    );
  }
}

class RoundedButtonWithTextAndBGColor extends StatelessWidget {
  final Function()? onPressed;
  final String text;
  final Color? color;
  final Color? textColor;
  final double? borderRadius;
  final double? fontSize;
  const RoundedButtonWithTextAndBGColor(
      {super.key,
      this.onPressed,
      required this.text,
      this.borderRadius = 10,
      this.fontSize = 15,
      this.color,
      this.textColor});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: onPressed ?? () {},
        style: ElevatedButton.styleFrom(
            surfaceTintColor: color ?? const Color.fromRGBO(13, 110, 253, 1),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(borderRadius!)),
            backgroundColor: color ?? const Color.fromRGBO(13, 110, 253, 1)),
        child: TextWithStyle(
          text: text,
          textStyle: TextStyle(
            fontSize: fontSize,
            color: textColor ?? Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ));
  }
}

class DateWidget extends StatelessWidget {
  final String? customString;
  final Color? color;
  final String? title;
  final String? date;
  final String fieldName;

  final Function()? onTap;
  const DateWidget(
      {super.key,
      this.customString,
      this.fieldName = "",
      this.color = Colors.black,
      this.title,
      required this.onTap,
      this.date});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        fieldName != ""
            ? TextWithStyle(
                text: fieldName,
                textStyle: const TextStyle(
                  fontSize: 12,
                  color: Color.fromARGB(255, 97, 97, 97),
                ),
              )
            : Container(),
        fieldName != ""
            ? const SizedBox(
                height: 5,
              )
            : Container(),
        Container(
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(15),
              ),
              border: Border.all(
                color: const Color.fromARGB(255, 215, 215, 215),
              )),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextWithStyle(
                text: title ?? "Date",
                textStyle: TextStyle(
                  color: color,
                  fontSize: 14,
                ),
              ),
              InkWell(
                onTap: onTap ?? () {},
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    TextWithStyle(
                      text: date == "" ? "dd-mm-yyyy" : date!,
                      textStyle: TextStyle(
                        color: color,
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Icon(
                      Icons.calendar_month,
                      color: color,
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ],
    );
  }
}

datePicker(context) async {
  DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(), //get today's date
      firstDate: DateTime(
          1950), //DateTime.now() - not to allow to choose before today.
      lastDate: DateTime(2101));
  return pickedDate;
}

class TopSnackBar extends StatelessWidget {
  final String message;
  final Color backgroundColor;

  const TopSnackBar({
    super.key,
    required this.message,
    this.backgroundColor = Colors.green,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color.fromARGB(0, 255, 255, 255),
      child: Container(
        width: double.infinity,
        color: backgroundColor,
        padding: const EdgeInsets.all(16),
        child: Text(
          message,
          style:
              const TextStyle(color: Colors.white, fontWeight: FontWeight.w500),
          textAlign: TextAlign.left,
        ),
      ),
    );
  }
}

void showTopSnackBar(BuildContext context, String message,
    {Color backgroundColor = Colors.green}) {
  final overlay = Overlay.of(context);
  final overlayEntry = OverlayEntry(
    builder: (context) => Positioned(
      top: MediaQuery.of(context).padding.top,
      left: 0,
      right: 0,
      child: TopSnackBar(
        message: message,
        backgroundColor: backgroundColor,
      ),
    ),
  );
  overlay.insert(overlayEntry);

  Future.delayed(const Duration(seconds: 3)).then((_) => overlayEntry.remove());
}
