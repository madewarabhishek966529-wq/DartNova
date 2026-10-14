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

  testWidgets('SpringSpeedDialFAB renders and expands upon tap', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: SpringSpeedDialFAB(
            actionIcons: [Icons.star, Icons.share, Icons.code],
          ),
        ),
      ),
    );

    expect(find.byType(SpringSpeedDialFAB), findsOneWidget);
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));
  });

  testWidgets('FluidTabBar renders tabs and switches index', (WidgetTester tester) async {
    int selectedIndex = 0;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: FluidTabBar(
            tabs: const ['Home', 'Explore', 'Saved'],
            initialIndex: selectedIndex,
            onTabSelected: (index) => selectedIndex = index,
          ),
        ),
      ),
    );

    expect(find.text('Home'), findsOneWidget);
    expect(find.text('Explore'), findsOneWidget);
    await tester.tap(find.text('Explore'));
    await tester.pumpAndSettle();
    expect(selectedIndex, 1);
  });

  testWidgets('GlowPulseCard renders child and pulsates', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: GlowPulseCard(
            child: Text('Neural Core Telemetry'),
          ),
        ),
      ),
    );

    expect(find.text('Neural Core Telemetry'), findsOneWidget);
    expect(find.byType(GlowPulseCard), findsOneWidget);
  });

  testWidgets('KineticMarquee renders motion text ticker', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: KineticMarquee(
            text: 'MOTION FOR FLUTTER • 120 FPS',
          ),
        ),
      ),
    );

    expect(find.byType(KineticMarquee), findsOneWidget);
    await tester.pump(const Duration(milliseconds: 100));
  });

  testWidgets('ProceduralNeonGauge renders custom painter gauge', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: ProceduralNeonGauge(
            value: 0.75,
          ),
        ),
      ),
    );

    expect(find.byType(ProceduralNeonGauge), findsOneWidget);
  });
}
