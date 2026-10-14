import 'package:flutter/material.dart';

class ImageTrailCanvas extends StatefulWidget {
  final double spacing;

  const ImageTrailCanvas({
    super.key,
    this.spacing = 35.0,
  });

  @override
  State<ImageTrailCanvas> createState() => _ImageTrailCanvasState();
}

class _TrailParticle {
  final Offset position;
  final double rotation;
  final Color color;
  final DateTime createdAt;

  _TrailParticle({
    required this.position,
    required this.rotation,
    required this.color,
  }) : createdAt = DateTime.now();
}

class _ImageTrailCanvasState extends State<ImageTrailCanvas> {
  final List<_TrailParticle> _particles = [];
  Offset _lastPosition = Offset.zero;

  final List<Color> _palette = const [
    Color(0xFFC5FF35),
    Color(0xFF38DDF8),
    Color(0xFFA78BFA),
    Color(0xFFF59E0B),
  ];
  int _colorIndex = 0;

  void _onHover(PointerEvent details) {
    final current = details.localPosition;
    if ((current - _lastPosition).distance > widget.spacing) {
      _lastPosition = current;
      setState(() {
        _particles.add(_TrailParticle(
          position: current,
          rotation: (_particles.length % 2 == 0 ? 1 : -1) * 0.15,
          color: _palette[_colorIndex % _palette.length],
        ));
        _colorIndex++;
      });

      Future.delayed(const Duration(milliseconds: 700), () {
        if (mounted && _particles.isNotEmpty) {
          setState(() {
            _particles.removeAt(0);
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: _onHover,
      child: Container(
        width: double.infinity,
        height: 300,
        decoration: BoxDecoration(
          color: const Color(0xFF111111),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF292929)),
        ),
        child: Stack(
          children: [
            const Center(
              child: Text(
                'Move pointer inside area',
                style: TextStyle(color: Color(0xFF666666), fontSize: 13),
              ),
            ),
            ..._particles.map((p) => Positioned(
                  left: p.position.dx - 30,
                  top: p.position.dy - 37,
                  child: Transform.rotate(
                    angle: p.rotation,
                    child: Container(
                      width: 60,
                      height: 75,
                      decoration: BoxDecoration(
                        color: p.color.withOpacity(0.85),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.white24),
                        boxShadow: const [
                          BoxShadow(color: Colors.black45, blurRadius: 10),
                        ],
                      ),
                    ),
                  ),
                )),
          ],
        ),
      ),
    );
  }
}
