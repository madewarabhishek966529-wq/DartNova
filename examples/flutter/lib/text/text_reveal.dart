import 'package:flutter/material.dart';

class TextReveal extends StatefulWidget {
  final String text;
  final Duration duration;
  final TextStyle? style;

  const TextReveal({
    super.key,
    required this.text,
    this.duration = const Duration(milliseconds: 800),
    this.style,
  });

  @override
  State<TextReveal> createState() => _TextRevealState();
}

class _TextRevealState extends State<TextReveal> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _offsetAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration);
    _offsetAnimation = Tween<Offset>(
      begin: const Offset(0.0, 1.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Cubic(0.16, 1.0, 0.3, 1.0),
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: SlideTransition(
        position: _offsetAnimation,
        child: Text(
          widget.text,
          style: widget.style ??
              const TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.w800,
                color: Colors.white,
              ),
        ),
      ),
    );
  }
}
