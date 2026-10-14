import 'package:flutter/material.dart';

class StaggeredText extends StatefulWidget {
  final String text;
  final Duration staggerDelay;
  final TextStyle? style;

  const StaggeredText({
    super.key,
    required this.text,
    this.staggerDelay = const Duration(milliseconds: 60),
    this.style,
  });

  @override
  State<StaggeredText> createState() => _StaggeredTextState();
}

class _StaggeredTextState extends State<StaggeredText> with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<double>> _fadeAnimations;
  late List<Animation<Offset>> _slideAnimations;
  late List<String> _words;

  @override
  void initState() {
    super.initState();
    _initAnimations();
  }

  void _initAnimations() {
    _words = widget.text.split(' ');
    _controllers = List.generate(
      _words.length,
      (index) => AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 450),
      ),
    );

    _fadeAnimations = _controllers
        .map((c) => Tween<double>(begin: 0.0, end: 1.0).animate(c))
        .toList();

    _slideAnimations = _controllers
        .map((c) => Tween<Offset>(
              begin: const Offset(0, 0.4),
              end: Offset.zero,
            ).animate(CurvedAnimation(parent: c, curve: Curves.easeOutBack)))
        .toList();

    for (int i = 0; i < _controllers.length; i++) {
      Future.delayed(widget.staggerDelay * i, () {
        if (mounted) _controllers[i].forward();
      });
    }
  }

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8.0,
      runSpacing: 4.0,
      children: List.generate(_words.length, (index) {
        return FadeTransition(
          opacity: _fadeAnimations[index],
          child: SlideTransition(
            position: _slideAnimations[index],
            child: Text(
              _words[index],
              style: widget.style ??
                  const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
            ),
          ),
        );
      }),
    );
  }
}
