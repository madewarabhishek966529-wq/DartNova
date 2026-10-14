import 'package:flutter/material.dart';

class DiagonalCarousel extends StatefulWidget {
  final int initialIndex;

  const DiagonalCarousel({super.key, this.initialIndex = 1});

  @override
  State<DiagonalCarousel> createState() => _DiagonalCarouselState();
}

class _DiagonalCarouselState extends State<DiagonalCarousel> {
  late int _selectedIndex;

  final List<Map<String, dynamic>> _cards = const [
    {'title': 'Motion 01', 'badge': 'Kinetic', 'color': Color(0xFF38DDF8)},
    {'title': 'Motion 02', 'badge': 'Dynamic', 'color': Color(0xFFC5FF35)},
    {'title': 'Motion 03', 'badge': 'Expressive', 'color': Color(0xFFA78BFA)},
  ];

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()
        ..rotateZ(-0.08)
        ..setEntry(0, 1, -0.05), // Skew
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(_cards.length, (index) {
          final isSelected = index == _selectedIndex;
          final item = _cards[index];
          return GestureDetector(
            onTap: () => setState(() => _selectedIndex = index),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutBack,
              margin: const EdgeInsets.symmetric(horizontal: 10),
              width: 150,
              height: 210,
              transform: Matrix4.translationValues(0, isSelected ? -14 : 0, 0),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFF1F1F1F) : const Color(0xFF141414),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isSelected ? (item['color'] as Color) : const Color(0xFF292929),
                  width: isSelected ? 2 : 1,
                ),
                boxShadow: [
                  BoxShadow(
                    color: isSelected
                        ? (item['color'] as Color).withOpacity(0.3)
                        : Colors.black45,
                    blurRadius: isSelected ? 24 : 10,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    item['badge'],
                    style: TextStyle(
                      color: item['color'] as Color,
                      fontFamily: 'monospace',
                      fontSize: 11,
                    ),
                  ),
                  Text(
                    item['title'],
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text('Select', style: TextStyle(color: Colors.grey, fontSize: 11)),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
