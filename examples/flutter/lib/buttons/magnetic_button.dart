import 'package:flutter/material.dart';

class MagneticButton extends StatefulWidget {
  final String text;
  final VoidCallback? onTap;
  final double strength;
  final double size;

  const MagneticButton({
    super.key,
    required this.text,
    this.onTap,
    this.strength = 0.35,
    this.size = 90.0,
  });

  @override
  State<MagneticButton> createState() => _MagneticButtonState();
}

class _MagneticButtonState extends State<MagneticButton> {
  Offset _offset = Offset.zero;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (e) {
        final renderBox = context.findRenderObject() as RenderBox?;
        if (renderBox != null) {
          final center = renderBox.size.center(Offset.zero);
          final local = e.localPosition;
          setState(() {
            _offset = Offset(
              (local.dx - center.dx) * widget.strength,
              (local.dy - center.dy) * widget.strength,
            );
          });
        }
      },
      onExit: (_) => setState(() => _offset = Offset.zero),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          curve: Curves.easeOutQuad,
          transform: Matrix4.translationValues(_offset.dx, _offset.dy, 0),
          width: widget.size,
          height: widget.size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFF111111),
            border: Border.all(color: const Color(0xFFC5FF35), width: 1.5),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFC5FF35).withOpacity(0.2),
                blurRadius: 20,
              ),
            ],
          ),
          child: Center(
            child: Text(
              widget.text,
              style: const TextStyle(
                color: Color(0xFFC5FF35),
                fontWeight: FontWeight.bold,
                fontSize: 13,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
