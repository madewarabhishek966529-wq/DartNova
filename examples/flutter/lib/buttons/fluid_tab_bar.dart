import 'package:flutter/material.dart';

class FluidTabBar extends StatefulWidget {
  final List<String> tabs;
  final ValueChanged<int>? onTabSelected;
  final int initialIndex;

  const FluidTabBar({
    super.key,
    this.tabs = const ['Motion', 'Physics', 'Shader', 'Gesture'],
    this.onTabSelected,
    this.initialIndex = 0,
  });

  @override
  State<FluidTabBar> createState() => _FluidTabBarState();
}

class _FluidTabBarState extends State<FluidTabBar> {
  late int _selectedIndex;

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: const Color(0xFF141414),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: const Color(0xFF262626)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: List.generate(widget.tabs.length, (index) {
          final isSelected = _selectedIndex == index;
          return GestureDetector(
            onTap: () {
              setState(() => _selectedIndex = index);
              widget.onTabSelected?.call(index);
            },
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              curve: Curves.easeInOut,
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFFC5FF35) : Colors.transparent,
                borderRadius: BorderRadius.circular(24),
              ),
              child: Text(
                widget.tabs[index],
                style: TextStyle(
                  color: isSelected ? const Color(0xFF080808) : const Color(0xFFA0A0A0),
                  fontSize: 13,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}
