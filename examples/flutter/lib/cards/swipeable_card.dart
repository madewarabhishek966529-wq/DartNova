import 'dart:math';
import 'package:flutter/material.dart';

class SwipeablePhysicsCard extends StatefulWidget {
  final String title;
  final String subtitle;
  final VoidCallback? onDismissed;

  const SwipeablePhysicsCard({
    super.key,
    this.title = 'Swipe Me',
    this.subtitle = 'Interactive Physics Spring',
    this.onDismissed,
  });

  @override
  State<SwipeablePhysicsCard> createState() => _SwipeablePhysicsCardState();
}

class _SwipeablePhysicsCardState extends State<SwipeablePhysicsCard> with SingleTickerProviderStateMixin {
  Offset _dragOffset = Offset.zero;
  late AnimationController _springController;
  late Animation<Offset> _springAnimation;

  @override
  void initState() {
    super.initState();
    _springController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 350),
    );
    _springAnimation = Tween<Offset>(begin: Offset.zero, end: Offset.zero).animate(
      CurvedAnimation(parent: _springController, curve: Curves.elasticOut),
    );
  }

  @override
  void dispose() {
    _springController.dispose();
    super.dispose();
  }

  void _onPanUpdate(DragUpdateDetails details) {
    setState(() {
      _dragOffset += details.delta;
    });
  }

  void _onPanEnd(DragEndDetails details) {
    if (_dragOffset.dx.abs() > 140) {
      widget.onDismissed?.call();
    }
    // Snap back to center
    _springAnimation = Tween<Offset>(begin: _dragOffset, end: Offset.zero).animate(
      CurvedAnimation(parent: _springController, curve: Curves.elasticOut),
    );
    _springController.forward(from: 0.0);
    _springController.addListener(() {
      setState(() {
        _dragOffset = _springAnimation.value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final rotationAngle = (_dragOffset.dx / 300) * (pi / 12);

    return GestureDetector(
      onPanUpdate: _onPanUpdate,
      onPanEnd: _onPanEnd,
      child: Transform.translate(
        offset: _dragOffset,
        child: Transform.rotate(
          angle: rotationAngle,
          child: Container(
            width: 280,
            height: 180,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF141414),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: _dragOffset != Offset.zero
                    ? const Color(0xFFC5FF35)
                    : const Color(0xFF292929),
                width: 1.5,
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.6),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('PHYSICS GESTURE', style: TextStyle(color: Color(0xFFC5FF35), fontFamily: 'monospace', fontSize: 10)),
                    Icon(Icons.touch_app, color: Colors.grey, size: 16),
                  ],
                ),
                Text(
                  widget.title,
                  style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Text(
                  widget.subtitle,
                  style: const TextStyle(color: Color(0xFF38DDF8), fontSize: 12),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
