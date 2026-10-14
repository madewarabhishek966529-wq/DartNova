import 'package:flutter/material.dart';

class AnimatedCardStack extends StatefulWidget {
  const AnimatedCardStack({super.key});

  @override
  State<AnimatedCardStack> createState() => _AnimatedCardStackState();
}

class _AnimatedCardStackState extends State<AnimatedCardStack> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => _expanded = !_expanded),
      child: SizedBox(
        width: 240,
        height: 200,
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Bottom card
            AnimatedPositioned(
              duration: const Duration(milliseconds: 350),
              curve: Curves.easeOutBack,
              top: _expanded ? 120 : 30,
              child: AnimatedRotation(
                duration: const Duration(milliseconds: 350),
                turns: _expanded ? 0.02 : 0,
                child: _buildCard('Card #03', const Color(0xFF141414)),
              ),
            ),
            // Middle card
            AnimatedPositioned(
              duration: const Duration(milliseconds: 350),
              curve: Curves.easeOutBack,
              top: _expanded ? 60 : 15,
              child: _buildCard('Card #02', const Color(0xFF181818)),
            ),
            // Top card
            AnimatedPositioned(
              duration: const Duration(milliseconds: 350),
              curve: Curves.easeOutBack,
              top: _expanded ? 0 : 0,
              child: AnimatedRotation(
                duration: const Duration(milliseconds: 350),
                turns: _expanded ? -0.02 : 0,
                child: _buildCard('Card #01', const Color(0xFF1E1E1E), borderColor: const Color(0xFFC5FF35)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCard(String label, Color bg, {Color? borderColor}) {
    return Container(
      width: 220,
      height: 120,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: borderColor ?? const Color(0xFF292929)),
        boxShadow: const [BoxShadow(color: Colors.black54, blurRadius: 12)],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 11)),
          const Text('Deck Layer', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          const Text('Tap to expand', style: TextStyle(color: Color(0xFFC5FF35), fontSize: 11)),
        ],
      ),
    );
  }
}
