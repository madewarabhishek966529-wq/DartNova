import 'package:flutter/material.dart';

class Cursor3DCard extends StatefulWidget {
  final String title;
  final String subtitle;
  final double maxTilt;

  const Cursor3DCard({
    super.key,
    required this.title,
    required this.subtitle,
    this.maxTilt = 15.0,
  });

  @override
  State<Cursor3DCard> createState() => _Cursor3DCardState();
}

class _Cursor3DCardState extends State<Cursor3DCard> {
  double _rotateX = 0;
  double _rotateY = 0;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (e) {
        final box = context.findRenderObject() as RenderBox?;
        if (box != null) {
          final size = box.size;
          final local = e.localPosition;
          final px = (local.dx / size.width).clamp(0.0, 1.0);
          final py = (local.dy / size.height).clamp(0.0, 1.0);

          setState(() {
            _rotateX = (py - 0.5) * -widget.maxTilt * (3.14159 / 180);
            _rotateY = (px - 0.5) * widget.maxTilt * (3.14159 / 180);
          });
        }
      },
      onExit: (_) {
        setState(() {
          _rotateX = 0;
          _rotateY = 0;
        });
      },
      child: Transform(
        alignment: FractionalOffset.center,
        transform: Matrix4.identity()
          ..setEntry(3, 2, 0.001) // 3D Perspective
          ..rotateX(_rotateX)
          ..rotateY(_rotateY),
        child: Container(
          width: 300,
          height: 200,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF181818), Color(0xFF101010)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF292929)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.6),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const Spacer(),
              Text(
                widget.title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                widget.subtitle,
                style: const TextStyle(
                  color: Color(0xFF38DDF8),
                  fontSize: 12,
                  letterSpacing: 1.2,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
