import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:dartnova/dartnova.dart';

void main() {
  testWidgets('NovaPopButton renders and triggers callback', (WidgetTester tester) async {
    bool tapped = false;

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: NovaPopButton(
            text: 'Test Pop',
            onPressed: () {
              tapped = true;
            },
          ),
        ),
      ),
    );

    expect(find.text('Test Pop'), findsOneWidget);
    await tester.tap(find.byType(NovaPopButton));
    await tester.pumpAndSettle();
    expect(tapped, isTrue);
  });

  testWidgets('TypingText renders text string', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: TypingText(text: 'Hello DartNova'),
        ),
      ),
    );

    expect(find.byType(TypingText), findsOneWidget);
  });

  testWidgets('CornerButton renders label', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: CornerButton(label: 'ACTIVATE'),
        ),
      ),
    );

    expect(find.text('ACTIVATE'), findsOneWidget);
  });
}
