import 'package:flutter/material.dart';

class AnimatedWelcomeScreen extends StatefulWidget {
  final String title;
  final String subtitle;

  const AnimatedWelcomeScreen({
    super.key,
    required this.title,
    required this.subtitle,
  });

  @override
  State<AnimatedWelcomeScreen> createState() => _AnimatedWelcomeScreenState();
}

class _AnimatedWelcomeScreenState extends State<AnimatedWelcomeScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );

    _fadeAnimation = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.25),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 280,
      decoration: BoxDecoration(
        color: const Color(0xFF0D0D0D),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF292929)),
      ),
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: SlideTransition(
          position: _slideAnimation,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                '● INITIALIZED',
                style: TextStyle(color: Color(0xFFC5FF35), fontFamily: 'monospace', fontSize: 11),
              ),
              const SizedBox(height: 10),
              Text(
                widget.title,
                style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 6),
              Text(
                widget.subtitle,
                style: const TextStyle(color: Colors.grey, fontSize: 13),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
