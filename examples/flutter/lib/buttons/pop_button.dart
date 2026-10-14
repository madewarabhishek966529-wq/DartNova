import 'package:flutter/material.dart';

class NovaPopButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color accentColor;
  final double scaleHover;
  final double scaleActive;
  final Duration duration;

  const NovaPopButton({
    super.key,
    required this.text,
    this.onPressed,
    this.accentColor = const Color(0xFFC5FF35),
    this.scaleHover = 1.08,
    this.scaleActive = 0.92,
    this.duration = const Duration(milliseconds: 250),
  });

  @override
  State<NovaPopButton> createState() => _NovaPopButtonState();
}

class _NovaPopButtonState extends State<NovaPopButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
      lowerBound: 0.0,
      upperBound: 1.0,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: widget.scaleActive,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutBack,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: (_) => _controller.forward(),
        onTapUp: (_) {
          _controller.reverse();
          widget.onPressed?.call();
        },
        onTapCancel: () => _controller.reverse(),
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            final hoverScale = _isHovered ? widget.scaleHover : 1.0;
            return Transform.scale(
              scale: _scaleAnimation.value * hoverScale,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                decoration: BoxDecoration(
                  color: widget.accentColor,
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: [
                    BoxShadow(
                      color: widget.accentColor.withOpacity(_isHovered ? 0.45 : 0.25),
                      blurRadius: _isHovered ? 24 : 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      widget.text,
                      style: const TextStyle(
                        color: Color(0xFF080808),
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Icon(Icons.arrow_forward, color: Color(0xFF080808), size: 18),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
