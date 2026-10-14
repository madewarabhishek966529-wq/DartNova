import { CATEGORIES } from './categories.js';
import { ROADMAP_COMPONENTS } from './roadmap-components.js';

export { CATEGORIES };

const LIVE_COMPONENTS = [
  // =========================================================================
  // CATEGORY A — BUTTONS & MICRO-INTERACTIONS
  // =========================================================================
  {
    id: 'pop-button',
    name: 'Pop Button',
    category: 'buttons',
    badge: 'Micro-interaction',
    description: 'Spring-like responsive button with bouncy scale press feedback and dynamic glow aura.',
    defaultProps: {
      label: 'Explore Motion',
      scaleHover: 1.08,
      scaleActive: 0.92,
      duration: 250,
      accentColor: '#C5FF35'
    },
    controls: [
      { type: 'text', label: 'Button Text', prop: 'label' },
      { type: 'slider', label: 'Hover Scale', prop: 'scaleHover', min: 1.0, max: 1.3, step: 0.02 },
      { type: 'slider', label: 'Press Scale', prop: 'scaleActive', min: 0.8, max: 0.98, step: 0.02 },
      { type: 'slider', label: 'Duration (ms)', prop: 'duration', min: 100, max: 600, step: 50, unit: 'ms' },
      { type: 'color', label: 'Accent Color', prop: 'accentColor' }
    ],
    render: (container, props) => {
      const btn = document.createElement('button');
      btn.className = 'dn-pop-btn';
      btn.innerHTML = `<span>${props.label}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      btn.style.backgroundColor = props.accentColor;
      btn.style.transitionDuration = `${props.duration}ms`;

      btn.addEventListener('mouseenter', () => {
        btn.style.transform = `scale(${props.scaleHover}) translateY(-2px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1) translateY(0)';
      });
      btn.addEventListener('mousedown', () => {
        btn.style.transform = `scale(${props.scaleActive}) translateY(2px)`;
      });
      btn.addEventListener('mouseup', () => {
        btn.style.transform = `scale(${props.scaleHover}) translateY(-2px)`;
      });

      container.innerHTML = '';
      container.appendChild(btn);

      return {
        restart: () => {
          btn.style.transform = 'scale(0.8)';
          setTimeout(() => {
            btn.style.transform = 'scale(1)';
          }, 80);
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `NovaPopButton(
  text: 'Explore Motion',
  accentColor: const Color(0xFFC5FF35),
  onPressed: () {
    print('Pop button tapped!');
  },
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'Explore Motion'", description: 'Button text label' },
      { name: 'accentColor', type: 'Color', defaultVal: 'Color(0xFFC5FF35)', description: 'Primary button background color' },
      { name: 'scaleHover', type: 'double', defaultVal: '1.08', description: 'Scale factor on pointer hover' },
      { name: 'scaleActive', type: 'double', defaultVal: '0.92', description: 'Scale factor while pressed' },
      { name: 'duration', type: 'Duration', defaultVal: '250ms', description: 'Animation transition duration' }
    ],
    notes: 'Uses SingleTickerProviderStateMixin with Tween and CurvedAnimation for springy physics.'
  },

  {
    id: 'radial-glow-button',
    name: 'Radial Glow Button',
    category: 'buttons',
    badge: 'Shader Effect',
    description: 'Dynamic button that tracks pointer coordinates to cast a high-precision radial gradient spotlight across its surface.',
    defaultProps: {
      label: 'Radial Glow',
      glowSize: 140,
      glowColor: '#C5FF35'
    },
    controls: [
      { type: 'text', label: 'Button Label', prop: 'label' },
      { type: 'slider', label: 'Glow Radius', prop: 'glowSize', min: 80, max: 240, step: 10, unit: 'px' },
      { type: 'color', label: 'Glow Color', prop: 'glowColor' }
    ],
    render: (container, props) => {
      const btn = document.createElement('button');
      btn.className = 'dn-radial-glow-btn';
      btn.innerHTML = `<span>${props.label}</span>`;
      btn.style.setProperty('--glow-size', `${props.glowSize}px`);

      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--glow-x', `${x}px`);
        btn.style.setProperty('--glow-y', `${y}px`);
      };

      btn.addEventListener('mousemove', handleMove);

      container.innerHTML = '';
      container.appendChild(btn);

      return {
        restart: () => {
          btn.style.setProperty('--glow-x', '50%');
          btn.style.setProperty('--glow-y', '50%');
        },
        destroy: () => btn.removeEventListener('mousemove', handleMove)
      };
    },
    flutterSnippet: `RadialGlowButton(
  text: 'Radial Glow',
  glowColor: const Color(0xFFC5FF35),
  glowRadius: 140.0,
  onPressed: () {},
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class RadialGlowButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color glowColor;
  final double glowRadius;

  const RadialGlowButton({
    super.key,
    required this.text,
    this.onPressed,
    this.glowColor = const Color(0xFFC5FF35),
    this.glowRadius = 140.0,
  });

  @override
  State<RadialGlowButton> createState() => _RadialGlowButtonState();
}

class _RadialGlowButtonState extends State<RadialGlowButton> {
  Offset? _pointerPosition;
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (e) => setState(() {
        _isHovered = true;
        _pointerPosition = e.localPosition;
      }),
      onHover: (e) => setState(() => _pointerPosition = e.localPosition),
      onExit: (_) => setState(() {
        _isHovered = false;
        _pointerPosition = null;
      }),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: CustomPaint(
          painter: _isHovered && _pointerPosition != null
              ? _RadialGlowPainter(
                  pointerOffset: _pointerPosition!,
                  glowColor: widget.glowColor,
                  radius: widget.glowRadius,
                )
              : null,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
            decoration: BoxDecoration(
              color: const Color(0xFF121212),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: _isHovered ? widget.glowColor.withOpacity(0.5) : const Color(0xFF292929),
              ),
            ),
            child: Text(
              widget.text,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 15,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RadialGlowPainter extends CustomPainter {
  final Offset pointerOffset;
  final Color glowColor;
  final double radius;

  _RadialGlowPainter({
    required this.pointerOffset,
    required this.glowColor,
    required this.radius,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final rrect = RRect.fromRectAndRadius(rect, const Radius.circular(10));
    canvas.clipRRect(rrect);

    final paint = Paint()
      ..shader = RadialGradient(
        center: Alignment(
          (pointerOffset.dx / size.width) * 2 - 1,
          (pointerOffset.dy / size.height) * 2 - 1,
        ),
        radius: radius / size.width,
        colors: [
          glowColor.withOpacity(0.35),
          Colors.transparent,
        ],
      ).createShader(rect);

    canvas.drawRRect(rrect, paint);
  }

  @override
  bool shouldRepaint(covariant _RadialGlowPainter oldDelegate) =>
      oldDelegate.pointerOffset != pointerOffset;
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'Radial Glow'", description: 'Button label' },
      { name: 'glowColor', type: 'Color', defaultVal: 'Color(0xFFC5FF35)', description: 'Color of radial glow bloom' },
      { name: 'glowRadius', type: 'double', defaultVal: '140.0', description: 'Radius of spotlight falloff' }
    ],
    notes: 'Implements MouseRegion combined with CustomPainter to render hardware-accelerated radial shader in Flutter.'
  },

  {
    id: 'corner-button',
    name: 'Corner Button',
    category: 'buttons',
    badge: 'Sci-Fi UI',
    description: 'Chiseled 45-degree polygon corner button with glowing status accent dot and high-tech border feedback.',
    defaultProps: {
      label: 'INITIALIZE',
      accentColor: '#C5FF35',
      cutSize: 10
    },
    controls: [
      { type: 'text', label: 'Button Text', prop: 'label' },
      { type: 'slider', label: 'Corner Notch (px)', prop: 'cutSize', min: 4, max: 20, step: 2, unit: 'px' },
      { type: 'color', label: 'Accent Color', prop: 'accentColor' }
    ],
    render: (container, props) => {
      const btn = document.createElement('button');
      btn.className = 'dn-corner-btn';
      btn.textContent = props.label;
      btn.style.color = props.accentColor;
      btn.style.clipPath = `polygon(${props.cutSize}px 0%, 100% 0%, 100% calc(100% - ${props.cutSize}px), calc(100% - ${props.cutSize}px) 100%, 0% 100%, 0% ${props.cutSize}px)`;

      container.innerHTML = '';
      container.appendChild(btn);

      return {
        restart: () => {
          btn.classList.add('active');
          setTimeout(() => btn.classList.remove('active'), 300);
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `CornerButton(
  label: 'INITIALIZE',
  accentColor: const Color(0xFFC5FF35),
  notchSize: 10.0,
  onPressed: () {},
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class CornerButton extends StatefulWidget {
  final String label;
  final VoidCallback? onPressed;
  final Color accentColor;
  final double notchSize;

  const CornerButton({
    super.key,
    required this.label,
    this.onPressed,
    this.accentColor = const Color(0xFFC5FF35),
    this.notchSize = 10.0,
  });

  @override
  State<CornerButton> createState() => _CornerButtonState();
}

class _CornerButtonState extends State<CornerButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: CustomPaint(
          painter: _BeveledBorderPainter(
            notch: widget.notchSize,
            borderColor: _isHovered ? widget.accentColor : const Color(0xFF383838),
            fillColor: _isHovered ? const Color(0xFF222222) : const Color(0xFF111111),
          ),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 14),
            child: Text(
              widget.label,
              style: TextStyle(
                color: _isHovered ? Colors.white : widget.accentColor,
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _BeveledBorderPainter extends CustomPainter {
  final double notch;
  final Color borderColor;
  final Color fillColor;

  _BeveledBorderPainter({
    required this.notch,
    required this.borderColor,
    required this.fillColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(notch, 0)
      ..lineTo(size.width, 0)
      ..lineTo(size.width, size.height - notch)
      ..lineTo(size.width - notch, size.height)
      ..lineTo(0, size.height)
      ..lineTo(0, notch)
      ..close();

    final fillPaint = Paint()
      ..color = fillColor
      ..style = PaintingStyle.fill;
    canvas.drawPath(path, fillPaint);

    final borderPaint = Paint()
      ..color = borderColor
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;
    canvas.drawPath(path, borderPaint);

    // Corner indicator
    final cornerPaint = Paint()..color = borderColor;
    canvas.drawCircle(Offset(size.width - 4, 4), 2.5, cornerPaint);
  }

  @override
  bool shouldRepaint(covariant _BeveledBorderPainter oldDelegate) =>
      oldDelegate.borderColor != borderColor || oldDelegate.fillColor != fillColor;
}`,
    params: [
      { name: 'label', type: 'String', defaultVal: "'INITIALIZE'", description: 'Button text' },
      { name: 'accentColor', type: 'Color', defaultVal: 'Color(0xFFC5FF35)', description: 'Accent border & text tint' },
      { name: 'notchSize', type: 'double', defaultVal: '10.0', description: 'Bevel chamfer cut size' }
    ],
    notes: 'Uses Flutter CustomPainter Path with lineTo polygon clipping for sharp sci-fi geometry.'
  },

  {
    id: 'magnetic-button',
    name: 'Magnetic Button',
    category: 'buttons',
    badge: 'Physics',
    description: 'Calculates cursor proximity and attracts the button toward the pointer like a magnetic field.',
    defaultProps: {
      label: 'Pull Me',
      attraction: 0.35,
      radius: 90
    },
    controls: [
      { type: 'text', label: 'Label', prop: 'label' },
      { type: 'slider', label: 'Magnet Strength', prop: 'attraction', min: 0.1, max: 0.7, step: 0.05 },
      { type: 'slider', label: 'Button Size', prop: 'radius', min: 70, max: 130, step: 5, unit: 'px' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-magnetic-wrapper';
      wrap.style.padding = '4rem';

      const btn = document.createElement('button');
      btn.className = 'dn-magnetic-btn';
      btn.textContent = props.label;
      btn.style.width = `${props.radius}px`;
      btn.style.height = `${props.radius}px`;

      wrap.appendChild(btn);

      const handleMove = (e) => {
        const rect = wrap.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * props.attraction;
        const dy = (e.clientY - centerY) * props.attraction;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      };

      const handleLeave = () => {
        btn.style.transform = 'translate(0px, 0px)';
      };

      wrap.addEventListener('mousemove', handleMove);
      wrap.addEventListener('mouseleave', handleLeave);

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          btn.style.transform = 'translate(0px, 0px)';
        },
        destroy: () => {
          wrap.removeEventListener('mousemove', handleMove);
          wrap.removeEventListener('mouseleave', handleLeave);
        }
      };
    },
    flutterSnippet: `MagneticButton(
  text: 'Pull Me',
  strength: 0.35,
  size: 90.0,
  onTap: () {},
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'Pull Me'", description: 'Centered button text' },
      { name: 'strength', type: 'double', defaultVal: '0.35', description: 'Magnetic attraction sensitivity' },
      { name: 'size', type: 'double', defaultVal: '90.0', description: 'Diameter of circular button' }
    ],
    notes: 'Calculates delta relative to RenderBox center and translates container with spring smoothing.'
  },

  // =========================================================================
  // CATEGORY B — TEXT & TRANSITIONS
  // =========================================================================
  {
    id: 'typing-text',
    name: 'Typing Text',
    category: 'text',
    badge: 'Sequential',
    description: 'Realistic typewriter character-by-character text reveal with blinking neon cursor and restart trigger.',
    defaultProps: {
      text: 'Build modern Flutter apps at hyperspeed.',
      speed: 45
    },
    controls: [
      { type: 'text', label: 'Message', prop: 'text' },
      { type: 'slider', label: 'Speed (ms)', prop: 'speed', min: 20, max: 120, step: 5, unit: 'ms' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-typing-container';

      const textSpan = document.createElement('span');
      const cursor = document.createElement('span');
      cursor.className = 'dn-typing-cursor';

      wrap.appendChild(textSpan);
      wrap.appendChild(cursor);

      let timer = null;
      let idx = 0;

      const run = () => {
        clearInterval(timer);
        textSpan.textContent = '';
        idx = 0;
        timer = setInterval(() => {
          if (idx < props.text.length) {
            textSpan.textContent += props.text[idx];
            idx++;
          } else {
            clearInterval(timer);
          }
        }, props.speed);
      };

      run();

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: run,
        destroy: () => clearInterval(timer)
      };
    },
    flutterSnippet: `TypingText(
  text: 'Build modern Flutter apps at hyperspeed.',
  speed: const Duration(milliseconds: 45),
  cursorColor: const Color(0xFFC5FF35),
)`,
    flutterFullCode: `import 'dart:async';
import 'package:flutter/material.dart';

class TypingText extends StatefulWidget {
  final String text;
  final Duration speed;
  final Color cursorColor;
  final TextStyle? style;

  const TypingText({
    super.key,
    required this.text,
    this.speed = const Duration(milliseconds: 45),
    this.cursorColor = const Color(0xFFC5FF35),
    this.style,
  });

  @override
  State<TypingText> createState() => _TypingTextState();
}

class _TypingTextState extends State<TypingText> {
  String _displayedText = '';
  Timer? _timer;
  int _charIndex = 0;

  @override
  void initState() {
    super.initState();
    _startTyping();
  }

  @override
  void didUpdateWidget(covariant TypingText oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text || oldWidget.speed != widget.speed) {
      _startTyping();
    }
  }

  void _startTyping() {
    _timer?.cancel();
    _displayedText = '';
    _charIndex = 0;
    _timer = Timer.periodic(widget.speed, (timer) {
      if (_charIndex < widget.text.length) {
        setState(() {
          _displayedText += widget.text[_charIndex];
          _charIndex++;
        });
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final textStyle = widget.style ??
        const TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.bold,
          fontFamily: 'monospace',
        );

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(_displayedText, style: textStyle),
        _BlinkingCursor(color: widget.cursorColor),
      ],
    );
  }
}

class _BlinkingCursor extends StatefulWidget {
  final Color color;
  const _BlinkingCursor({required this.color});

  @override
  State<_BlinkingCursor> createState() => _BlinkingCursorState();
}

class _BlinkingCursorState extends State<_BlinkingCursor> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: Container(
        width: 3,
        height: 28,
        margin: const EdgeInsets.only(left: 4),
        color: widget.color,
      ),
    );
  }
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'...'", description: 'String to type out' },
      { name: 'speed', type: 'Duration', defaultVal: '45ms', description: 'Delay per character' },
      { name: 'cursorColor', type: 'Color', defaultVal: 'Color(0xFFC5FF35)', description: 'Blinking cursor tint' }
    ],
    notes: 'Uses Timer.periodic for character appending alongside an AnimationController repeating blink cycle.'
  },

  {
    id: 'text-reveal',
    name: 'Text Reveal',
    category: 'text',
    badge: 'Mask Transition',
    description: 'Editorial slide-up reveal with geometric bounding mask and smooth cubic-bezier easing.',
    defaultProps: {
      headline: 'Next-Gen Motion',
      duration: 800
    },
    controls: [
      { type: 'text', label: 'Headline', prop: 'headline' },
      { type: 'slider', label: 'Duration (ms)', prop: 'duration', min: 300, max: 1500, step: 100, unit: 'ms' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-reveal-container';

      const h2 = document.createElement('h2');
      h2.className = 'dn-reveal-text';
      h2.textContent = props.headline;
      h2.style.animationDuration = `${props.duration}ms`;

      wrap.appendChild(h2);

      const trigger = () => {
        h2.style.animation = 'none';
        void h2.offsetHeight;
        h2.style.animation = `dnSlideUp ${props.duration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`;
      };

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: trigger,
        destroy: () => {}
      };
    },
    flutterSnippet: `TextReveal(
  text: 'Next-Gen Motion',
  duration: const Duration(milliseconds: 800),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'Next-Gen Motion'", description: 'Content to reveal' },
      { name: 'duration', type: 'Duration', defaultVal: '800ms', description: 'Transition speed' }
    ],
    notes: 'Combines ClipRect with SlideTransition to ensure text stays completely clipped until translated into view.'
  },

  {
    id: 'staggered-text',
    name: 'Staggered Text',
    category: 'text',
    badge: 'Stagger Animation',
    description: 'Sequentially animates words into view with staggered index delays and springy overshoot.',
    defaultProps: {
      phrase: 'Fluid expressive delightful interfaces for Flutter',
      staggerDelay: 60
    },
    controls: [
      { type: 'text', label: 'Sentence', prop: 'phrase' },
      { type: 'slider', label: 'Delay Step (ms)', prop: 'staggerDelay', min: 30, max: 150, step: 10, unit: 'ms' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-stagger-container';

      const renderWords = () => {
        wrap.innerHTML = '';
        const words = props.phrase.split(' ');
        words.forEach((w, idx) => {
          const span = document.createElement('span');
          span.className = 'dn-stagger-word';
          span.textContent = w;
          span.style.animationDelay = `${idx * props.staggerDelay}ms`;
          wrap.appendChild(span);
        });
      };

      renderWords();

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: renderWords,
        destroy: () => {}
      };
    },
    flutterSnippet: `StaggeredText(
  text: 'Fluid expressive delightful interfaces for Flutter',
  staggerDelay: const Duration(milliseconds: 60),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'...'", description: 'String split by whitespace' },
      { name: 'staggerDelay', type: 'Duration', defaultVal: '60ms', description: 'Offset delay between each word' }
    ],
    notes: 'Constructs staggered AnimationControllers inside Wrap widget with easeOutBack curves.'
  },

  // =========================================================================
  // CATEGORY C — CARDS & IMAGES
  // =========================================================================
  {
    id: 'cursor-card',
    name: 'Cursor Card',
    category: 'cards',
    badge: '3D Parallax',
    description: '3D perspective card tilting with pointer tracking and real-time glossy specular light reflection.',
    defaultProps: {
      title: 'Vengeance UI Pro',
      subtitle: 'FLUTTER MOTION KIT',
      maxTilt: 15
    },
    controls: [
      { type: 'text', label: 'Card Title', prop: 'title' },
      { type: 'text', label: 'Subtitle', prop: 'subtitle' },
      { type: 'slider', label: 'Max Tilt Angle', prop: 'maxTilt', min: 5, max: 30, step: 1, unit: 'deg' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-cursor-card-wrapper';

      const card = document.createElement('div');
      card.className = 'dn-cursor-card';
      card.innerHTML = `
        <div style="font-family:monospace; font-size:10px; color:#C5FF35; margin-bottom:auto;">⚡ DARTNOVA</div>
        <h4>${props.title}</h4>
        <p>${props.subtitle}</p>
      `;

      wrap.appendChild(card);

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const tiltX = ((y - cy) / cy) * -props.maxTilt;
        const tiltY = ((x - cx) / cx) * props.maxTilt;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
        card.style.setProperty('--card-shine-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--card-shine-y', `${(y / rect.height) * 100}%`);
      };

      const handleLeave = () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      };

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: handleLeave,
        destroy: () => {
          card.removeEventListener('mousemove', handleMove);
          card.removeEventListener('mouseleave', handleLeave);
        }
      };
    },
    flutterSnippet: `Cursor3DCard(
  title: 'Vengeance UI Pro',
  subtitle: 'FLUTTER MOTION KIT',
  maxTilt: 15.0,
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
  Offset _pointer = const Offset(0.5, 0.5);

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
            _pointer = Offset(px, py);
            _rotateX = (py - 0.5) * -widget.maxTilt * (3.14159 / 180);
            _rotateY = (px - 0.5) * widget.maxTilt * (3.14159 / 180);
          });
        }
      },
      onExit: (_) {
        setState(() {
          _rotateX = 0;
          _rotateY = 0;
          _pointer = const Offset(0.5, 0.5);
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
}`,
    params: [
      { name: 'title', type: 'String', defaultVal: "'Vengeance UI Pro'", description: 'Main heading text' },
      { name: 'subtitle', type: 'String', defaultVal: "'FLUTTER MOTION KIT'", description: 'Subheading badge' },
      { name: 'maxTilt', type: 'double', defaultVal: '15.0', description: 'Maximum angular tilt in degrees' }
    ],
    notes: 'Sets Matrix4 entry(3, 2, 0.001) for real 3D perspective projection on pointer hover.'
  },

  {
    id: 'image-trail',
    name: 'Image Trail',
    category: 'experiments',
    badge: 'Pointer Physics',
    description: 'Renders dynamic thumbnail stamps along pointer motion path with organic rotational drift.',
    defaultProps: {
      trailDistance: 35
    },
    controls: [
      { type: 'slider', label: 'Trail Spacing (px)', prop: 'trailDistance', min: 20, max: 80, step: 5, unit: 'px' }
    ],
    render: (container, props) => {
      const canvas = document.createElement('div');
      canvas.className = 'dn-trail-canvas';
      canvas.innerHTML = '<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#666; font-size:13px; pointer-events:none;">Move pointer across canvas</div>';

      const colors = ['#C5FF35', '#38DDF8', '#A78BFA', '#F59E0B', '#EF4444'];
      let lastX = 0;
      let lastY = 0;
      let colorIdx = 0;

      const handleMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dist = Math.hypot(x - lastX, y - lastY);
        if (dist > props.trailDistance) {
          lastX = x;
          lastY = y;
          const item = document.createElement('div');
          item.className = 'dn-trail-item';
          item.style.left = `${x}px`;
          item.style.top = `${y}px`;
          item.style.background = `linear-gradient(135deg, ${colors[colorIdx % colors.length]}, #111)`;
          item.style.setProperty('--trail-rot', `${(Math.random() - 0.5) * 30}deg`);
          colorIdx++;

          canvas.appendChild(item);
          setTimeout(() => item.remove(), 800);
        }
      };

      canvas.addEventListener('mousemove', handleMove);

      container.innerHTML = '';
      container.appendChild(canvas);

      return {
        restart: () => {
          canvas.querySelectorAll('.dn-trail-item').forEach(el => el.remove());
        },
        destroy: () => canvas.removeEventListener('mousemove', handleMove)
      };
    },
    flutterSnippet: `ImageTrailCanvas(
  spacing: 35.0,
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [
      { name: 'spacing', type: 'double', defaultVal: '35.0', description: 'Pixel distance between spawned trail stamps' }
    ],
    notes: 'Listens to pointer movement distance and uses delayed particle purge for seamless performance.'
  },

  {
    id: 'diagonal-carousel',
    name: 'Diagonal Carousel',
    category: 'three-d',
    badge: '3D Gallery',
    description: 'Angled skew card track with smooth prev/next translation and dynamic focal card magnification.',
    defaultProps: {
      activeIndex: 1
    },
    controls: [
      { type: 'slider', label: 'Active Card Index', prop: 'activeIndex', min: 0, max: 2, step: 1 }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-diagonal-wrapper';

      const items = [
        { title: 'Motion 01', subtitle: 'Kinetic', color: '#38DDF8' },
        { title: 'Motion 02', subtitle: 'Dynamic', color: '#C5FF35' },
        { title: 'Motion 03', subtitle: 'Expressive', color: '#A78BFA' }
      ];

      items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `dn-diagonal-card ${idx === props.activeIndex ? 'active' : ''}`;
        card.innerHTML = `
          <div style="font-size:11px; font-family:monospace; color:${item.color}">${item.subtitle}</div>
          <h4 style="color:#FFF; font-size:16px;">${item.title}</h4>
          <div style="font-size:11px; color:#888;">Tap to focus</div>
        `;
        card.addEventListener('click', () => {
          wrap.querySelectorAll('.dn-diagonal-card').forEach((c, i) => {
            c.classList.toggle('active', i === idx);
          });
        });
        wrap.appendChild(card);
      });

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          wrap.querySelectorAll('.dn-diagonal-card').forEach((c, i) => {
            c.classList.toggle('active', i === 1);
          });
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `DiagonalCarousel(
  initialIndex: 1,
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class DiagonalCarousel extends StatefulWidget {
  final int initialIndex;

  const DiagonalCarousel({super.key, this.initialIndex = 1});

  @override
  State<DiagonalCarousel> createState() => _DiagonalCarouselState();
}

class _DiagonalCarouselState extends State<DiagonalCarousel> {
  late int _selectedIndex;

  final List<Map<String, dynamic>> _cards = const [
    {'title': 'Motion 01', 'badge': 'Kinetic', 'color': Color(0xFF38DDF8)},
    {'title': 'Motion 02', 'badge': 'Dynamic', 'color': Color(0xFFC5FF35)},
    {'title': 'Motion 03', 'badge': 'Expressive', 'color': Color(0xFFA78BFA)},
  ];

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()
        ..rotateZ(-0.08)
        ..setEntry(0, 1, -0.05), // Skew
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(_cards.length, (index) {
          final isSelected = index == _selectedIndex;
          final item = _cards[index];
          return GestureDetector(
            onTap: () => setState(() => _selectedIndex = index),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutBack,
              margin: const EdgeInsets.symmetric(horizontal: 10),
              width: 150,
              height: 210,
              transform: Matrix4.translationValues(0, isSelected ? -14 : 0, 0),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFF1F1F1F) : const Color(0xFF141414),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isSelected ? (item['color'] as Color) : const Color(0xFF292929),
                  width: isSelected ? 2 : 1,
                ),
                boxShadow: [
                  BoxShadow(
                    color: isSelected
                        ? (item['color'] as Color).withOpacity(0.3)
                        : Colors.black45,
                    blurRadius: isSelected ? 24 : 10,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    item['badge'],
                    style: TextStyle(
                      color: item['color'] as Color,
                      fontFamily: 'monospace',
                      fontSize: 11,
                    ),
                  ),
                  Text(
                    item['title'],
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text('Select', style: TextStyle(color: Colors.grey, fontSize: 11)),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}`,
    params: [
      { name: 'initialIndex', type: 'int', defaultVal: '1', description: 'Index of active highlighted card' }
    ],
    notes: 'Rotates and skews container transform while animating card elevation on tap.'
  },

  {
    id: 'animated-card-stack',
    name: 'Animated Card Stack',
    category: 'cards',
    badge: 'Stack Layout',
    description: 'Overlapping physical card deck that cascades and fans out on tap with 3D depth layering.',
    defaultProps: {
      isExpanded: false
    },
    controls: [
      { type: 'toggle', label: 'Fan Out Stack', prop: 'isExpanded' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = `dn-stack-wrapper ${props.isExpanded ? 'expanded' : ''}`;

      for (let i = 1; i <= 3; i++) {
        const card = document.createElement('div');
        card.className = 'dn-stack-card';
        card.innerHTML = `
          <div style="font-size:11px; font-family:monospace; color:#A0A0A0">CARD #0${i}</div>
          <div style="font-weight:700; color:#FFF; font-size:15px;">Interactive Deck Layer</div>
          <div style="font-size:11px; color:#C5FF35;">Tap to Toggle</div>
        `;
        wrap.appendChild(card);
      }

      wrap.addEventListener('click', () => {
        wrap.classList.toggle('expanded');
      });

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => wrap.classList.remove('expanded'),
        destroy: () => {}
      };
    },
    flutterSnippet: `AnimatedCardStack()`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [],
    notes: 'Leverages AnimatedPositioned and AnimatedRotation for effortless multi-card deck transitions.'
  },

  // =========================================================================
  // CATEGORY D — AVATARS & TOOLTIPS
  // =========================================================================
  {
    id: 'avatar-group',
    name: 'Avatar Group',
    category: 'media',
    badge: 'Hover Expansion',
    description: 'Overlapping social avatar avatars that expand, scale, and bring individual profiles to the front.',
    defaultProps: {
      count: 4,
      avatarSize: 46
    },
    controls: [
      { type: 'slider', label: 'Avatars Count', prop: 'count', min: 2, max: 6, step: 1 },
      { type: 'slider', label: 'Avatar Size', prop: 'avatarSize', min: 36, max: 60, step: 2, unit: 'px' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-avatar-group';

      const faces = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
      ];

      for (let i = 0; i < props.count; i++) {
        const item = document.createElement('div');
        item.className = 'dn-avatar-item';
        item.style.width = `${props.avatarSize}px`;
        item.style.height = `${props.avatarSize}px`;
        item.style.backgroundImage = `url(${faces[i % faces.length]})`;
        item.style.zIndex = i + 1;
        wrap.appendChild(item);
      }

      const overflow = document.createElement('div');
      overflow.className = 'dn-avatar-item dn-avatar-overflow';
      overflow.style.width = `${props.avatarSize}px`;
      overflow.style.height = `${props.avatarSize}px`;
      overflow.textContent = '+8';
      wrap.appendChild(overflow);

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {},
        destroy: () => {}
      };
    },
    flutterSnippet: `AvatarGroup(
  imageUrls: [
    'https://...',
    'https://...',
  ],
  size: 46.0,
  overlap: 14.0,
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class AvatarGroup extends StatefulWidget {
  final List<String> imageUrls;
  final double size;
  final double overlap;

  const AvatarGroup({
    super.key,
    required this.imageUrls,
    this.size = 46.0,
    this.overlap = 14.0,
  });

  @override
  State<AvatarGroup> createState() => _AvatarGroupState();
}

class _AvatarGroupState extends State<AvatarGroup> {
  int? _hoveredIndex;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(widget.imageUrls.length, (index) {
        final isHovered = _hoveredIndex == index;
        return MouseRegion(
          onEnter: (_) => setState(() => _hoveredIndex = index),
          onExit: (_) => setState(() => _hoveredIndex = null),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOutBack,
            margin: EdgeInsets.only(left: index == 0 ? 0 : -widget.overlap),
            transform: Matrix4.diagonal3Values(
              isHovered ? 1.2 : 1.0,
              isHovered ? 1.2 : 1.0,
              1.0,
            )..setTranslationRaw(0.0, isHovered ? -4.0 : 0.0, 0.0),
            width: widget.size,
            height: widget.size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: isHovered ? const Color(0xFFC5FF35) : const Color(0xFF080808),
                width: 2,
              ),
              boxShadow: isHovered
                  ? const [BoxShadow(color: Colors.black87, blurRadius: 12)]
                  : null,
              image: DecorationImage(
                image: NetworkImage(widget.imageUrls[index]),
                fit: BoxFit.cover,
              ),
            ),
          ),
        );
      }),
    );
  }
}`,
    params: [
      { name: 'imageUrls', type: 'List<String>', defaultVal: '[]', description: 'List of avatar image links' },
      { name: 'size', type: 'double', defaultVal: '46.0', description: 'Avatar diameter' },
      { name: 'overlap', type: 'double', defaultVal: '14.0', description: 'Margin overlap in pixels' }
    ],
    notes: 'Coordinates negative margin overlap with MouseRegion hovered scale states.'
  },

  {
    id: 'tooltip-avatars',
    name: 'Tooltip Avatars',
    category: 'overlays',
    badge: 'Interactive Popover',
    description: 'Detailed user badge with animated floating card popover on hover or tap.',
    defaultProps: {
      username: 'Alex River',
      role: 'Flutter Motion Engineer'
    },
    controls: [
      { type: 'text', label: 'Name', prop: 'username' },
      { type: 'text', label: 'Role', prop: 'role' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-tooltip-avatar-container';

      const trigger = document.createElement('div');
      trigger.className = 'dn-tooltip-trigger';
      trigger.style.backgroundImage = 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80)';
      trigger.style.backgroundSize = 'cover';

      const popover = document.createElement('div');
      popover.className = 'dn-tooltip-popover';
      popover.innerHTML = `
        <div style="font-weight:700; color:#FFF; font-size:13px;">${props.username}</div>
        <div style="font-size:11px; color:#38DDF8; margin-bottom:6px;">${props.role}</div>
        <div style="display:flex; gap:4px;">
          <span class="badge badge-lime" style="font-size:9px;">Active</span>
          <span class="badge" style="font-size:9px;">Pro</span>
        </div>
      `;

      wrap.appendChild(trigger);
      wrap.appendChild(popover);

      // Support mobile tap toggle
      trigger.addEventListener('click', () => {
        wrap.classList.toggle('active');
      });

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => wrap.classList.remove('active'),
        destroy: () => {}
      };
    },
    flutterSnippet: `TooltipAvatar(
  name: 'Alex River',
  role: 'Flutter Motion Engineer',
  avatarUrl: 'https://...',
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class TooltipAvatar extends StatefulWidget {
  final String name;
  final String role;
  final String avatarUrl;

  const TooltipAvatar({
    super.key,
    required this.name,
    required this.role,
    required this.avatarUrl,
  });

  @override
  State<TooltipAvatar> createState() => _TooltipAvatarState();
}

class _TooltipAvatarState extends State<TooltipAvatar> {
  bool _showTooltip = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _showTooltip = true),
      onExit: (_) => setState(() => _showTooltip = false),
      child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.center,
        children: [
          GestureDetector(
            onTap: () => setState(() => _showTooltip = !_showTooltip),
            child: CircleAvatar(
              radius: 28,
              backgroundImage: NetworkImage(widget.avatarUrl),
            ),
          ),
          if (_showTooltip)
            Positioned(
              bottom: 64,
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 200),
                opacity: _showTooltip ? 1.0 : 0.0,
                child: Container(
                  width: 170,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF181818),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFF292929)),
                    boxShadow: const [BoxShadow(color: Colors.black87, blurRadius: 16)],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        widget.name,
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                      Text(
                        widget.role,
                        style: const TextStyle(color: Color(0xFF38DDF8), fontSize: 11),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}`,
    params: [
      { name: 'name', type: 'String', defaultVal: "'Alex River'", description: 'User display name' },
      { name: 'role', type: 'String', defaultVal: "'...'", description: 'Subtext role badge' }
    ],
    notes: 'Renders an animated floating overlay card with Stack and Clip.none positioning.'
  },

  // =========================================================================
  // CATEGORY E — BACKGROUNDS & VISUAL EFFECTS
  // =========================================================================
  {
    id: 'animated-gradient',
    name: 'Animated Gradient',
    category: 'backgrounds',
    badge: 'Atmosphere',
    description: 'Smooth shifting multi-stop mesh ambient gradient background with infinite continuous movement.',
    defaultProps: {
      speed: 10
    },
    controls: [
      { type: 'slider', label: 'Speed (seconds)', prop: 'speed', min: 3, max: 20, step: 1, unit: 's' }
    ],
    render: (container, props) => {
      const box = document.createElement('div');
      box.className = 'dn-animated-gradient-box';
      box.style.animationDuration = `${props.speed}s`;
      box.innerHTML = `
        <div style="text-align:center;">
          <h3 style="color:#FFF; font-size:22px; margin-bottom:4px;">Mesh Gradient Field</h3>
          <p style="font-size:12px; color:#A0A0A0;">Atmospheric background ambient animation</p>
        </div>
      `;

      container.innerHTML = '';
      container.appendChild(box);

      return {
        restart: () => {
          box.style.animation = 'none';
          void box.offsetHeight;
          box.style.animation = `dnGradShift ${props.speed}s ease infinite`;
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `AnimatedGradientMesh(
  duration: const Duration(seconds: 10),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class AnimatedGradientMesh extends StatefulWidget {
  final Duration duration;

  const AnimatedGradientMesh({
    super.key,
    this.duration = const Duration(seconds: 10),
  });

  @override
  State<AnimatedGradientMesh> createState() => _AnimatedGradientMeshState();
}

class _AnimatedGradientMeshState extends State<AnimatedGradientMesh> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration)
      ..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          width: double.infinity,
          height: 240,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              begin: Alignment(-1.0 + _controller.value * 2, -1.0),
              end: Alignment(1.0 - _controller.value * 2, 1.0),
              colors: const [
                Color(0xFF0D0D0D),
                Color(0xFF1A0B2E),
                Color(0xFF03202E),
                Color(0xFF0E2908),
                Color(0xFF181818),
              ],
            ),
          ),
          child: child,
        );
      },
      child: const Center(
        child: Text(
          'Animated Gradient Mesh',
          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    params: [
      { name: 'duration', type: 'Duration', defaultVal: '10s', description: 'Period of full gradient cycle' }
    ],
    notes: 'Uses AnimatedBuilder with mutating LinearGradient alignment offsets.'
  },

  {
    id: 'wave-animation',
    name: 'Wave Animation',
    category: 'backgrounds',
    badge: 'Procedural Wave',
    description: 'Multi-layer organic sine waves rendered on canvas with customizable amplitude and frequency.',
    defaultProps: {
      amplitude: 22,
      frequency: 0.02,
      speed: 0.04
    },
    controls: [
      { type: 'slider', label: 'Wave Amplitude', prop: 'amplitude', min: 10, max: 45, step: 2, unit: 'px' },
      { type: 'slider', label: 'Wave Speed', prop: 'speed', min: 0.01, max: 0.1, step: 0.01 }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-wave-container';

      const canvas = document.createElement('canvas');
      canvas.className = 'dn-wave-canvas';
      wrap.appendChild(canvas);

      let animId = null;
      let phase = 0;

      const resize = () => {
        canvas.width = wrap.clientWidth;
        canvas.height = wrap.clientHeight;
      };

      const draw = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Wave 1
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 5) {
          const y = h * 0.6 + Math.sin(x * props.frequency + phase) * props.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.fillStyle = 'rgba(56, 221, 248, 0.2)';
        ctx.fill();

        // Wave 2
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 5) {
          const y = h * 0.65 + Math.sin(x * (props.frequency * 1.2) + phase * 1.3) * (props.amplitude * 0.8);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.fillStyle = 'rgba(197, 255, 53, 0.25)';
        ctx.fill();

        phase += props.speed;
        animId = requestAnimationFrame(draw);
      };

      container.innerHTML = '';
      container.appendChild(wrap);
      resize();
      draw();

      return {
        restart: () => { phase = 0; },
        destroy: () => {
          if (animId) cancelAnimationFrame(animId);
        }
      };
    },
    flutterSnippet: `WaveAnimation(
  amplitude: 22.0,
  speed: 1.0,
)`,
    flutterFullCode: `import 'dart:math';
import 'package:flutter/material.dart';

class WaveAnimation extends StatefulWidget {
  final double amplitude;
  final double speed;

  const WaveAnimation({
    super.key,
    this.amplitude = 22.0,
    this.speed = 1.0,
  });

  @override
  State<WaveAnimation> createState() => _WaveAnimationState();
}

class _WaveAnimationState extends State<WaveAnimation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return CustomPaint(
          size: const Size(double.infinity, 220),
          painter: _WavePainter(
            phase: _controller.value * 2 * pi * widget.speed,
            amplitude: widget.amplitude,
          ),
        );
      },
    );
  }
}

class _WavePainter extends CustomPainter {
  final double phase;
  final double amplitude;

  _WavePainter({required this.phase, required this.amplitude});

  @override
  void paint(Canvas canvas, Size size) {
    // Background wave
    final path1 = Path()..moveTo(0, size.height);
    for (double x = 0; x <= size.width; x += 4) {
      final y = size.height * 0.6 + sin((x * 0.015) + phase) * amplitude;
      path1.lineTo(x, y);
    }
    path1.lineTo(size.width, size.height);
    path1.close();
    canvas.drawPath(path1, Paint()..color = const Color(0x3338DDF8));

    // Foreground wave
    final path2 = Path()..moveTo(0, size.height);
    for (double x = 0; x <= size.width; x += 4) {
      final y = size.height * 0.65 + sin((x * 0.02) + phase * 1.2) * (amplitude * 0.8);
      path2.lineTo(x, y);
    }
    path2.lineTo(size.width, size.height);
    path2.close();
    canvas.drawPath(path2, Paint()..color = const Color(0x40C5FF35));
  }

  @override
  bool shouldRepaint(covariant _WavePainter oldDelegate) => true;
}`,
    params: [
      { name: 'amplitude', type: 'double', defaultVal: '22.0', description: 'Peak wave crest height' },
      { name: 'speed', type: 'double', defaultVal: '1.0', description: 'Wave translation velocity factor' }
    ],
    notes: 'Implements sine curve plotting inside CustomPainter with continuously progressing phase angle.'
  },

  {
    id: 'neon-gradient',
    name: 'Neon Gradient Effect',
    category: 'backgrounds',
    badge: 'Cyberpunk Glow',
    description: 'Electric animated gradient border aura with double-layer soft gaussian blur diffusion.',
    defaultProps: {
      blurRadius: 14
    },
    controls: [
      { type: 'slider', label: 'Glow Intensity', prop: 'blurRadius', min: 6, max: 28, step: 2, unit: 'px' }
    ],
    render: (container, props) => {
      const card = document.createElement('div');
      card.className = 'dn-neon-gradient-card';
      card.innerHTML = `
        <div style="text-align:center; padding:1rem;">
          <div style="font-family:monospace; font-size:10px; color:#C5FF35;">CYBERPUNK GLOW</div>
          <h4 style="color:#FFF; font-size:17px; margin-top:4px;">Neon Border Aura</h4>
        </div>
      `;

      container.innerHTML = '';
      container.appendChild(card);

      return {
        restart: () => {},
        destroy: () => {}
      };
    },
    flutterSnippet: `NeonGradientCard(
  child: Center(
    child: Text('Neon Border Aura'),
  ),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class NeonGradientCard extends StatefulWidget {
  final Widget child;

  const NeonGradientCard({super.key, required this.child});

  @override
  State<NeonGradientCard> createState() => _NeonGradientCardState();
}

class _NeonGradientCardState extends State<NeonGradientCard> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 4))
      ..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          width: 280,
          height: 170,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: SweepGradient(
              transform: GradientRotation(_controller.value * 6.283),
              colors: const [
                Color(0xFFC5FF35),
                Color(0xFF38DDF8),
                Color(0xFFA78BFA),
                Color(0xFFC5FF35),
              ],
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFC5FF35).withOpacity(0.3),
                blurRadius: 18,
                spreadRadius: 1,
              ),
            ],
          ),
          padding: const EdgeInsets.all(2.5), // Border thickness
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xFF111111),
              borderRadius: BorderRadius.circular(14),
            ),
            child: widget.child,
          ),
        );
      },
    );
  }
}`,
    params: [
      { name: 'child', type: 'Widget', defaultVal: '...', description: 'Card content widget' }
    ],
    notes: 'Uses animated SweepGradient with GradientRotation inside container padding border.'
  },

  {
    id: 'particle-motion',
    name: 'Particle Motion',
    category: 'backgrounds',
    badge: 'Physics Canvas',
    description: 'Dynamic constellation of particles connected by distance-based affinity vectors with pointer repulsion.',
    defaultProps: {
      particleCount: 28,
      speed: 1
    },
    controls: [
      { type: 'slider', label: 'Particle Count', prop: 'particleCount', min: 10, max: 60, step: 2 },
      { type: 'slider', label: 'Velocity', prop: 'speed', min: 0.5, max: 2.5, step: 0.25 }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-particle-box';

      const canvas = document.createElement('canvas');
      canvas.className = 'dn-particle-canvas';
      wrap.appendChild(canvas);

      let animId = null;
      let particles = [];

      const init = () => {
        canvas.width = wrap.clientWidth || 400;
        canvas.height = wrap.clientHeight || 260;
        particles = [];
        for (let i = 0; i < props.particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5 * props.speed,
            vy: (Math.random() - 0.5) * 1.5 * props.speed,
            r: Math.random() * 2 + 1.5
          });
        }
      };

      const draw = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = '#C5FF35';
          ctx.fill();

          // Connect nearby
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 65) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(197, 255, 53, ${0.4 * (1 - dist / 65)})`;
              ctx.stroke();
            }
          }
        }

        animId = requestAnimationFrame(draw);
      };

      container.innerHTML = '';
      container.appendChild(wrap);
      init();
      draw();

      return {
        restart: init,
        destroy: () => {
          if (animId) cancelAnimationFrame(animId);
        }
      };
    },
    flutterSnippet: `ParticleMotionCanvas(
  count: 28,
)`,
    flutterFullCode: `import 'dart:math';
import 'package:flutter/material.dart';

class ParticleMotionCanvas extends StatefulWidget {
  final int count;

  const ParticleMotionCanvas({super.key, this.count = 28});

  @override
  State<ParticleMotionCanvas> createState() => _ParticleMotionCanvasState();
}

class _Particle {
  double x;
  double y;
  double vx;
  double vy;
  double radius;

  _Particle({
    required this.x,
    required this.y,
    required this.vx,
    required this.vy,
    required this.radius,
  });
}

class _ParticleMotionCanvasState extends State<ParticleMotionCanvas> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<_Particle> _particles = [];
  final Random _rnd = Random();

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < widget.count; i++) {
      _particles.add(_Particle(
        x: _rnd.nextDouble() * 300,
        y: _rnd.nextDouble() * 200,
        vx: (_rnd.nextDouble() - 0.5) * 1.5,
        vy: (_rnd.nextDouble() - 0.5) * 1.5,
        radius: _rnd.nextDouble() * 2 + 1.5,
      ));
    }

    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 1))
      ..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return CustomPaint(
          size: const Size(double.infinity, 240),
          painter: _ParticlePainter(particles: _particles),
        );
      },
    );
  }
}

class _ParticlePainter extends CustomPainter {
  final List<_Particle> particles;

  _ParticlePainter({required this.particles});

  @override
  void paint(Canvas canvas, Size size) {
    final dotPaint = Paint()..color = const Color(0xFFC5FF35);
    final linePaint = Paint()..strokeWidth = 1.0;

    for (int i = 0; i < particles.length; i++) {
      final p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > size.width) p.vx *= -1;
      if (p.y < 0 || p.y > size.height) p.vy *= -1;

      canvas.drawCircle(Offset(p.x, p.y), p.radius, dotPaint);

      for (int j = i + 1; j < particles.length; j++) {
        final p2 = particles[j];
        final dist = sqrt(pow(p.x - p2.x, 2) + pow(p.y - p2.y, 2));
        if (dist < 65) {
          linePaint.color = Color.fromRGBO(197, 255, 53, 0.4 * (1 - dist / 65));
          canvas.drawLine(Offset(p.x, p.y), Offset(p2.x, p2.y), linePaint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant _ParticlePainter oldDelegate) => true;
}`,
    params: [
      { name: 'count', type: 'int', defaultVal: '28', description: 'Number of floating particles' }
    ],
    notes: 'Calculates particle collision and distance thresholds in CustomPainter paint loop.'
  },

  {
    id: 'animated-welcome-screen',
    name: 'Animated Welcome Screen',
    category: 'transitions',
    badge: 'Full Canvas Flow',
    description: 'Onboarding hero sequence with progressive staggered typography entrance, radial backdrop, and glowing action button.',
    defaultProps: {
      title: 'Welcome to DartNova',
      subtitle: 'The Interactive Motion Standard for Flutter'
    },
    controls: [
      { type: 'text', label: 'Hero Title', prop: 'title' },
      { type: 'text', label: 'Hero Subtitle', prop: 'subtitle' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-welcome-screen';

      const renderContent = () => {
        wrap.innerHTML = `
          <div style="font-family:monospace; font-size:11px; color:#C5FF35; letter-spacing:0.12em;">● INITIALIZED</div>
          <h2 class="dn-welcome-title">${props.title}</h2>
          <p class="dn-welcome-sub">${props.subtitle}</p>
          <button class="dn-pop-btn" style="margin-top:10px; font-size:13px; padding:0.5rem 1.25rem;">Get Started</button>
        `;
      };

      renderContent();

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: renderContent,
        destroy: () => {}
      };
    },
    flutterSnippet: `AnimatedWelcomeScreen(
  title: 'Welcome to DartNova',
  subtitle: 'The Interactive Motion Standard for Flutter',
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
}`,
    params: [
      { name: 'title', type: 'String', defaultVal: "'Welcome to DartNova'", description: 'Hero title' },
      { name: 'subtitle', type: 'String', defaultVal: "'...'", description: 'Supporting descriptor' }
    ],
    notes: 'Combines FadeTransition and SlideTransition with easeOutCubic curve for welcoming entrance.'
  },

  {
    id: 'spotlight-effect',
    name: 'Spotlight Effect',
    category: 'backgrounds',
    badge: 'Pointer Mask',
    description: 'Pointer-following circular beam that illuminates hidden textured grid surfaces in real-time.',
    defaultProps: {
      spotlightRadius: 180
    },
    controls: [
      { type: 'slider', label: 'Spotlight Beam Radius', prop: 'spotlightRadius', min: 100, max: 300, step: 20, unit: 'px' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-spotlight-wrapper';
      wrap.innerHTML = `
        <div style="text-align:center; pointer-events:none; z-index:2;">
          <h4 style="color:#FFF; font-size:17px;">Spotlight Flashlight</h4>
          <p style="font-size:12px; color:#A0A0A0;">Hover around to illuminate grid</p>
        </div>
      `;

      const beam = document.createElement('div');
      beam.className = 'dn-spotlight-beam';
      beam.style.width = `${props.spotlightRadius}px`;
      beam.style.height = `${props.spotlightRadius}px`;
      wrap.appendChild(beam);

      const handleMove = (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        beam.style.setProperty('--spot-x', `${x}px`);
        beam.style.setProperty('--spot-y', `${y}px`);
      };

      wrap.addEventListener('mousemove', handleMove);

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          beam.style.setProperty('--spot-x', '50%');
          beam.style.setProperty('--spot-y', '50%');
        },
        destroy: () => wrap.removeEventListener('mousemove', handleMove)
      };
    },
    flutterSnippet: `SpotlightEffect(
  radius: 180.0,
  child: Center(
    child: Text('Hover to illuminate'),
  ),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class SpotlightEffect extends StatefulWidget {
  final double radius;
  final Widget child;

  const SpotlightEffect({
    super.key,
    this.radius = 180.0,
    required this.child,
  });

  @override
  State<SpotlightEffect> createState() => _SpotlightEffectState();
}

class _SpotlightEffectState extends State<SpotlightEffect> {
  Offset? _spotlightPos;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (e) => setState(() => _spotlightPos = e.localPosition),
      onExit: (_) => setState(() => _spotlightPos = null),
      child: CustomPaint(
        foregroundPainter: _spotlightPos != null
            ? _SpotlightPainter(center: _spotlightPos!, radius: widget.radius)
            : null,
        child: Container(
          width: double.infinity,
          height: 200,
          decoration: BoxDecoration(
            color: const Color(0xFF111111),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF292929)),
          ),
          child: widget.child,
        ),
      ),
    );
  }
}

class _SpotlightPainter extends CustomPainter {
  final Offset center;
  final double radius;

  _SpotlightPainter({required this.center, required this.radius});

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final rrect = RRect.fromRectAndRadius(rect, const Radius.circular(16));
    canvas.clipRRect(rrect);

    final paint = Paint()
      ..shader = RadialGradient(
        center: Alignment(
          (center.dx / size.width) * 2 - 1,
          (center.dy / size.height) * 2 - 1,
        ),
        radius: radius / size.width,
        colors: [
          const Color(0x40C5FF35),
          const Color(0x1538DDF8),
          Colors.transparent,
        ],
      ).createShader(rect);

    canvas.drawRRect(rrect, paint);
  }

  @override
  bool shouldRepaint(covariant _SpotlightPainter oldDelegate) =>
      oldDelegate.center != center;
}`,
    params: [
      { name: 'radius', type: 'double', defaultVal: '180.0', description: 'Illumination radius' }
    ],
    notes: 'Uses foregroundPainter on CustomPaint to overlay a dynamic illuminated spotlight.'
  },

  {
    id: 'shimmer-effect',
    name: 'Shimmer Effect',
    category: 'loaders',
    badge: 'Loading Skeleton',
    description: 'Iridescent high-speed linear gradient wave sweeping across placeholder skeleton surfaces.',
    defaultProps: {
      speed: 2.2
    },
    controls: [
      { type: 'slider', label: 'Sweep Duration (s)', prop: 'speed', min: 1.0, max: 4.0, step: 0.2, unit: 's' }
    ],
    render: (container, props) => {
      const card = document.createElement('div');
      card.className = 'dn-shimmer-card';
      card.innerHTML = `
        <div class="dn-shimmer-line title"></div>
        <div class="dn-shimmer-line"></div>
        <div class="dn-shimmer-line short"></div>
      `;

      card.style.setProperty('--shimmer-speed', `${props.speed}s`);

      container.innerHTML = '';
      container.appendChild(card);

      return {
        restart: () => {},
        destroy: () => {}
      };
    },
    flutterSnippet: `NovaShimmer(
  duration: const Duration(milliseconds: 2200),
  child: Column(
    children: [
      Container(height: 20, width: 140, color: Colors.white),
      Container(height: 14, width: 220, color: Colors.white),
    ],
  ),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class NovaShimmer extends StatefulWidget {
  final Widget child;
  final Duration duration;

  const NovaShimmer({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 2200),
  });

  @override
  State<NovaShimmer> createState() => _NovaShimmerState();
}

class _NovaShimmerState extends State<NovaShimmer> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration)
      ..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return ShaderMask(
          blendMode: BlendMode.srcATop,
          shaderCallback: (bounds) {
            return LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              stops: [
                _controller.value - 0.3,
                _controller.value,
                _controller.value + 0.3,
              ].map((s) => s.clamp(0.0, 1.0)).toList(),
              colors: const [
                Color(0xFF1E1E1E),
                Color(0xFF333333),
                Color(0xFF1E1E1E),
              ],
            ).createShader(bounds);
          },
          child: widget.child,
        );
      },
    );
  }
}`,
    params: [
      { name: 'duration', type: 'Duration', defaultVal: '2200ms', description: 'Duration of single shimmer cycle' },
      { name: 'child', type: 'Widget', defaultVal: '...', description: 'Skeleton layout widget to mask' }
    ],
    notes: 'Implements ShaderMask with BlendMode.srcATop for hardware-accelerated skeleton shimmer.'
  },

  {
    id: 'spring-fab',
    name: 'Spring Speed Dial FAB',
    category: 'navigation',
    badge: 'Elastic Spring',
    description: 'Floating action button that rotates and bursts into staggered circular secondary actions with spring overshoot.',
    defaultProps: {
      actionCount: 3,
      isOpen: false
    },
    controls: [
      { type: 'toggle', label: 'Toggle Speed Dial', prop: 'isOpen' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.className = 'dn-speed-dial-wrap';
      wrap.style.cssText = 'position:relative; width:160px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:10px;';

      const icons = ['⚡', '💡', '🚀'];
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'dn-speed-dial-actions';
      actionsContainer.style.cssText = 'display:flex; flex-direction:column; gap:12px; margin-bottom:14px;';

      for (let i = 0; i < props.actionCount; i++) {
        const item = document.createElement('div');
        item.className = 'dn-speed-dial-item';
        item.style.cssText = `
          width:42px; height:42px; border-radius:50%; background:#161616; border:1.5px solid var(--accent-cyan);
          display:flex; align-items:center; justify-content:center; color:var(--accent-cyan); font-size:16px;
          box-shadow:0 0 16px rgba(56, 221, 248, 0.35); transition:all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform:${props.isOpen ? 'scale(1) translateY(0)' : 'scale(0) translateY(40px)'};
          opacity:${props.isOpen ? '1' : '0'};
          transition-delay:${props.isOpen ? `${i * 60}ms` : '0ms'};
          cursor:pointer;
        `;
        item.textContent = icons[i % icons.length];
        actionsContainer.appendChild(item);
      }

      const mainBtn = document.createElement('button');
      mainBtn.className = 'dn-speed-dial-main';
      mainBtn.style.cssText = `
        width:56px; height:56px; border-radius:50%; background:var(--accent-primary);
        display:flex; align-items:center; justify-content:center; color:#080808; font-size:24px; font-weight:bold;
        box-shadow:0 4px 20px var(--accent-primary-glow); transition:transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        transform:${props.isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
        cursor:pointer;
      `;
      mainBtn.innerHTML = '+';

      wrap.appendChild(actionsContainer);
      wrap.appendChild(mainBtn);

      let openState = props.isOpen;
      const toggle = () => {
        openState = !openState;
        mainBtn.style.transform = openState ? 'rotate(45deg)' : 'rotate(0deg)';
        const items = actionsContainer.children;
        for (let j = 0; j < items.length; j++) {
          items[j].style.transform = openState ? 'scale(1) translateY(0)' : 'scale(0) translateY(40px)';
          items[j].style.opacity = openState ? '1' : '0';
          items[j].style.transitionDelay = openState ? `${j * 60}ms` : '0ms';
        }
      };

      mainBtn.addEventListener('click', toggle);

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          if (openState) toggle();
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `SpringSpeedDialFAB(
  actionIcons: const [Icons.bolt, Icons.code, Icons.share],
  onActionTap: (index) => print('Tapped $index'),
)`,
    flutterFullCode: `import 'dart:math';
import 'package:flutter/material.dart';

class SpringSpeedDialFAB extends StatefulWidget {
  final VoidCallback? onPrimaryTap;
  final List<IconData> actionIcons;
  final ValueChanged<int>? onActionTap;

  const SpringSpeedDialFAB({
    super.key,
    this.onPrimaryTap,
    this.actionIcons = const [Icons.bolt, Icons.code, Icons.share],
    this.onActionTap,
  });

  @override
  State<SpringSpeedDialFAB> createState() => _SpringSpeedDialFABState();
}

class _SpringSpeedDialFABState extends State<SpringSpeedDialFAB> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _expandAnimation;
  late Animation<double> _rotateAnimation;
  bool _isOpen = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _expandAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
      reverseCurve: Curves.easeInBack,
    );
    _rotateAnimation = Tween<double>(begin: 0.0, end: pi / 4).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() {
      _isOpen = !_isOpen;
      if (_isOpen) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
    widget.onPrimaryTap?.call();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 180,
      height: 220,
      child: Stack(
        alignment: Alignment.bottomCenter,
        clipBehavior: Clip.none,
        children: [
          ...List.generate(widget.actionIcons.length, (index) {
            final distance = 60.0 * (index + 1);
            return AnimatedBuilder(
              animation: _expandAnimation,
              builder: (context, child) {
                return Positioned(
                  bottom: _expandAnimation.value * distance,
                  child: Opacity(
                    opacity: _expandAnimation.value.clamp(0.0, 1.0),
                    child: Transform.scale(
                      scale: _expandAnimation.value,
                      child: GestureDetector(
                        onTap: () {
                          widget.onActionTap?.call(index);
                          _toggle();
                        },
                        child: Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: const Color(0xFF161616),
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF38DDF8), width: 1.5),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF38DDF8).withValues(alpha: 0.3),
                                blurRadius: 12,
                              ),
                            ],
                          ),
                          child: Icon(
                            widget.actionIcons[index],
                            color: const Color(0xFF38DDF8),
                            size: 20,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            );
          }),
          GestureDetector(
            onTap: _toggle,
            child: AnimatedBuilder(
              animation: _rotateAnimation,
              builder: (context, child) {
                return Transform.rotate(
                  angle: _rotateAnimation.value,
                  child: Container(
                    width: 58,
                    height: 58,
                    decoration: BoxDecoration(
                      color: const Color(0xFFC5FF35),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFC5FF35).withValues(alpha: 0.45),
                          blurRadius: 20,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.add,
                      color: Color(0xFF080808),
                      size: 28,
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}`,
    params: [
      { name: 'actionIcons', type: 'List<IconData>', defaultVal: '[Icons.bolt, ...]', description: 'Child action button icons' },
      { name: 'onActionTap', type: 'ValueChanged<int>?', defaultVal: 'null', description: 'Callback with tapped child index' }
    ],
    notes: 'Coordinates an elasticOut curve on an expanding distance scale alongside smooth 45-degree rotation.'
  },

  {
    id: 'fluid-tab-bar',
    name: 'Fluid Elastic Tab Bar',
    category: 'navigation',
    badge: 'Liquid Navigation',
    description: 'Segmented indicator pill that dynamically snaps and stretches between tab targets with spring inertia.',
    defaultProps: {
      initialTab: 0
    },
    controls: [
      { type: 'slider', label: 'Active Tab Index', prop: 'initialTab', min: 0, max: 3, step: 1 }
    ],
    render: (container, props) => {
      const tabs = ['Motion', 'Physics', 'Shader', 'Gesture'];
      const wrap = document.createElement('div');
      wrap.className = 'dn-fluid-tab-wrap';
      wrap.style.cssText = 'display:inline-flex; background:#141414; padding:4px; border-radius:30px; border:1px solid #262626; position:relative;';

      tabs.forEach((tab, idx) => {
        const btn = document.createElement('button');
        btn.textContent = tab;
        btn.style.cssText = `
          padding:10px 18px; border-radius:24px; font-size:13px; font-weight:600; cursor:pointer;
          transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color:${idx === props.initialTab ? '#080808' : '#A0A0A0'};
          background:${idx === props.initialTab ? 'var(--accent-primary)' : 'transparent'};
          box-shadow:${idx === props.initialTab ? '0 0 16px var(--accent-primary-glow)' : 'none'};
        `;
        btn.addEventListener('click', () => {
          wrap.querySelectorAll('button').forEach((b, i) => {
            b.style.color = i === idx ? '#080808' : '#A0A0A0';
            b.style.background = i === idx ? 'var(--accent-primary)' : 'transparent';
            b.style.boxShadow = i === idx ? '0 0 16px var(--accent-primary-glow)' : 'none';
          });
        });
        wrap.appendChild(btn);
      });

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          wrap.querySelectorAll('button').forEach((b, i) => {
            b.style.color = i === 0 ? '#080808' : '#A0A0A0';
            b.style.background = i === 0 ? 'var(--accent-primary)' : 'transparent';
            b.style.boxShadow = i === 0 ? '0 0 16px var(--accent-primary-glow)' : 'none';
          });
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `FluidTabBar(
  tabs: const ['Motion', 'Physics', 'Shader', 'Gesture'],
  onTabSelected: (index) => print('Selected tab $index'),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

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
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutBack,
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
              decoration: BoxDecoration(
                color: isSelected ? const Color(0xFFC5FF35) : Colors.transparent,
                borderRadius: BorderRadius.circular(24),
                boxShadow: isSelected
                    ? [
                        BoxShadow(
                          color: const Color(0xFFC5FF35).withValues(alpha: 0.35),
                          blurRadius: 14,
                        ),
                      ]
                    : null,
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
}`,
    params: [
      { name: 'tabs', type: 'List<String>', defaultVal: "['Motion', ...]", description: 'Tab text labels' },
      { name: 'onTabSelected', type: 'ValueChanged<int>?', defaultVal: 'null', description: 'Callback when tab is selected' }
    ],
    notes: 'Uses AnimatedContainer with Curves.easeOutBack to achieve elastic pill stretching.'
  },

  {
    id: 'swipeable-card',
    name: 'Swipeable Physics Card',
    category: 'gestures',
    badge: 'Physics Gesture',
    description: 'Interactive draggable card that calculates horizontal displacement and angular tilt, with spring snap-back physics.',
    defaultProps: {
      title: 'Swipe Me',
      subtitle: 'Interactive Physics Spring'
    },
    controls: [
      { type: 'text', label: 'Card Title', prop: 'title' },
      { type: 'text', label: 'Subtitle', prop: 'subtitle' }
    ],
    render: (container, props) => {
      const card = document.createElement('div');
      card.className = 'dn-swipeable-card';
      card.style.cssText = `
        width:280px; height:180px; padding:20px; background:#141414; border-radius:16px;
        border:1.5px solid #292929; display:flex; flex-direction:column; justify-content:space-between;
        cursor:grab; user-select:none; transition:box-shadow 0.2s ease;
        box-shadow:0 10px 30px rgba(0,0,0,0.7);
      `;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between;">
          <span style="font-family:monospace; font-size:10px; color:var(--accent-primary);">PHYSICS GESTURE</span>
          <span style="color:#666; font-size:12px;">✋ Drag left/right</span>
        </div>
        <div>
          <h4 style="color:#FFF; font-size:20px;">${props.title}</h4>
          <p style="color:var(--accent-cyan); font-size:12px;">${props.subtitle}</p>
        </div>
        <div style="font-size:11px; color:#555;">Releases with spring return</div>
      `;

      let isDragging = false;
      let startX = 0;
      let curX = 0;

      const onStart = (e) => {
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        card.style.cursor = 'grabbing';
        card.style.transition = 'none';
      };

      const onMove = (e) => {
        if (!isDragging) return;
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - startX;
        curX = x;
        const rot = (x / 200) * 15;
        card.style.transform = `translate(${x}px, 0px) rotate(${rot}deg)`;
        card.style.borderColor = Math.abs(x) > 40 ? 'var(--accent-primary)' : '#292929';
      };

      const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        card.style.cursor = 'grab';
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease';
        card.style.transform = 'translate(0px, 0px) rotate(0deg)';
        card.style.borderColor = '#292929';
      };

      card.addEventListener('mousedown', onStart);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);

      container.innerHTML = '';
      container.appendChild(card);

      return {
        restart: () => {
          card.style.transform = 'translate(0px, 0px) rotate(0deg)';
        },
        destroy: () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onEnd);
        }
      };
    },
    flutterSnippet: `SwipeablePhysicsCard(
  title: 'Swipe Me',
  subtitle: 'Interactive Physics Spring',
)`,
    flutterFullCode: `import 'dart:math';
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
}`,
    params: [
      { name: 'title', type: 'String', defaultVal: "'Swipe Me'", description: 'Primary card label' },
      { name: 'subtitle', type: 'String', defaultVal: "'...'", description: 'Subheading badge' }
    ],
    notes: 'Handles pan gestures and smoothly resets dragOffset using elasticOut animation controller.'
  },

  {
    id: 'glow-pulse-card',
    name: 'Glow Pulse Card',
    category: 'cards',
    badge: 'Breathing Glow',
    description: 'High-end card with continuous sinusoidal breathing border glow aura and specular ambient reflection.',
    defaultProps: {
      pulseSpeed: 2
    },
    controls: [
      { type: 'slider', label: 'Pulse Period (s)', prop: 'pulseSpeed', min: 1, max: 5, step: 0.5, unit: 's' }
    ],
    render: (container, props) => {
      const card = document.createElement('div');
      card.className = 'dn-pulse-card';
      card.style.cssText = `
        width:280px; height:180px; border-radius:16px; background:#121212;
        padding:20px; display:flex; flex-direction:column; justify-content:space-between;
        position:relative; animation:dnBorderPulse ${props.pulseSpeed}s infinite ease-in-out;
      `;
      card.innerHTML = `
        <div style="font-family:monospace; font-size:10px; color:var(--accent-primary);">BREATHING PULSE</div>
        <div>
          <h4 style="color:#FFF; font-size:18px;">Ambient Neon Glow</h4>
          <p style="color:#888; font-size:12px; margin-top:4px;">Dynamic border lumen cycle</p>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="status-dot" style="color:var(--accent-primary);"></span>
          <span style="font-size:11px; color:#A0A0A0; font-family:var(--font-mono);">Active loop</span>
        </div>
      `;

      container.innerHTML = '';
      container.appendChild(card);

      return {
        restart: () => {},
        destroy: () => {}
      };
    },
    flutterSnippet: `GlowPulseCard(
  pulseColor: const Color(0xFFC5FF35),
  child: Center(
    child: Text('Ambient Neon Glow'),
  ),
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class GlowPulseCard extends StatefulWidget {
  final Widget child;
  final Color pulseColor;
  final Duration duration;

  const GlowPulseCard({
    super.key,
    required this.child,
    this.pulseColor = const Color(0xFFC5FF35),
    this.duration = const Duration(seconds: 2),
  });

  @override
  State<GlowPulseCard> createState() => _GlowPulseCardState();
}

class _GlowPulseCardState extends State<GlowPulseCard> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    )..repeat(reverse: true);
    _glowAnimation = Tween<double>(begin: 4.0, end: 24.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _glowAnimation,
      builder: (context, _) {
        return Container(
          width: 290,
          height: 180,
          decoration: BoxDecoration(
            color: const Color(0xFF131313),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: widget.pulseColor.withValues(alpha: 0.3 + (_controller.value * 0.5)),
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: widget.pulseColor.withValues(alpha: 0.2 + (_controller.value * 0.25)),
                blurRadius: _glowAnimation.value,
                spreadRadius: 1,
              ),
            ],
          ),
          child: widget.child,
        );
      },
    );
  }
}`,
    params: [
      { name: 'pulseColor', type: 'Color', defaultVal: 'Color(0xFFC5FF35)', description: 'Color of pulsating glow perimeter' },
      { name: 'duration', type: 'Duration', defaultVal: '2s', description: 'Period of full breathe cycle' }
    ],
    notes: 'Loops AnimationController in reverse:true with AnimatedBuilder modulating box shadow and alpha.'
  },

  {
    id: 'kinetic-marquee',
    name: 'Kinetic Marquee Banner',
    category: 'text',
    badge: 'Continuous Flow',
    description: 'Smooth, hardware-accelerated horizontal kinetic typography banner with infinite looping and pause-on-hover.',
    defaultProps: {
      message: 'MOTION FOR FLUTTER • DARTNOVA 1.0 • ZERO PUB DEPENDENCIES • 60-120 FPS NATIVE',
      speed: 12
    },
    controls: [
      { type: 'text', label: 'Marquee Text', prop: 'message' },
      { type: 'slider', label: 'Loop Speed (s)', prop: 'speed', min: 6, max: 24, step: 2, unit: 's' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'width:100%; max-width:440px; overflow:hidden; white-space:nowrap; border-radius:12px; background:#121212; border:1px solid #282828; padding:12px 0;';

      const track = document.createElement('div');
      track.style.cssText = `display:inline-block; animation:dnMarqueeScroll ${props.speed}s linear infinite;`;

      const content = `<span style="font-family:var(--font-mono); font-size:14px; font-weight:bold; color:var(--text-primary);">${props.message} • ${props.message} • </span>`;
      track.innerHTML = content + content;

      wrap.appendChild(track);

      wrap.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });
      wrap.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          track.style.animation = 'none';
          void track.offsetHeight;
          track.style.animation = `dnMarqueeScroll ${props.speed}s linear infinite`;
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `KineticMarquee(
  text: 'MOTION FOR FLUTTER • DARTNOVA 1.0',
  velocity: 50.0,
)`,
    flutterFullCode: `import 'package:flutter/material.dart';

class KineticMarquee extends StatefulWidget {
  final String text;
  final TextStyle? style;
  final double velocity;

  const KineticMarquee({
    super.key,
    required this.text,
    this.style,
    this.velocity = 50.0,
  });

  @override
  State<KineticMarquee> createState() => _KineticMarqueeState();
}

class _KineticMarqueeState extends State<KineticMarquee> with SingleTickerProviderStateMixin {
  late ScrollController _scrollController;
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..addListener(_scroll);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _startScrolling();
    });
  }

  void _startScrolling() {
    _animationController.repeat();
  }

  void _scroll() {
    if (_scrollController.hasClients) {
      final maxScroll = _scrollController.position.maxScrollExtent;
      final current = _animationController.value * maxScroll;
      _scrollController.jumpTo(current);
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final textStyle = widget.style ??
        const TextStyle(
          color: Colors.white,
          fontSize: 22,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
        );

    return MouseRegion(
      onEnter: (_) => _animationController.stop(),
      onExit: (_) => _animationController.repeat(),
      child: SingleChildScrollView(
        controller: _scrollController,
        scrollDirection: Axis.horizontal,
        physics: const NeverScrollableScrollPhysics(),
        child: Row(
          children: List.generate(10, (index) {
            return Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(widget.text, style: textStyle),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text('•', style: TextStyle(color: Color(0xFFC5FF35), fontSize: 20)),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }
}`,
    params: [
      { name: 'text', type: 'String', defaultVal: "'...'", description: 'Content string to repeat in ticker' },
      { name: 'velocity', type: 'double', defaultVal: '50.0', description: 'Scroll translation speed factor' }
    ],
    notes: 'Leverages continuous ScrollController translation driven by a looping AnimationController.'
  },

  {
    id: 'neon-gauge',
    name: 'Procedural Neon Gauge',
    category: 'charts',
    badge: 'CustomPainter Arc',
    description: 'Hardware-accelerated procedural radial meter with glowing neon stroke sweep and digital percentage readout.',
    defaultProps: {
      percent: 85
    },
    controls: [
      { type: 'slider', label: 'Progress (%)', prop: 'percent', min: 10, max: 100, step: 5, unit: '%' }
    ],
    render: (container, props) => {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative; width:180px; height:180px; display:flex; align-items:center; justify-content:center;';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.cssText = 'width:100%; height:100%; transform:rotate(-90deg);';

      // Background Track
      const circleBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circleBg.setAttribute('cx', '50');
      circleBg.setAttribute('cy', '50');
      circleBg.setAttribute('r', '40');
      circleBg.setAttribute('fill', 'none');
      circleBg.setAttribute('stroke', '#222222');
      circleBg.setAttribute('stroke-width', '8');

      // Active Arc
      const circumference = 2 * Math.PI * 40;
      const offset = circumference - (props.percent / 100) * circumference;

      const circleActive = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circleActive.setAttribute('cx', '50');
      circleActive.setAttribute('cy', '50');
      circleActive.setAttribute('r', '40');
      circleActive.setAttribute('fill', 'none');
      circleActive.setAttribute('stroke', 'var(--accent-primary)');
      circleActive.setAttribute('stroke-width', '8');
      circleActive.setAttribute('stroke-dasharray', `${circumference}`);
      circleActive.setAttribute('stroke-dashoffset', `${offset}`);
      circleActive.setAttribute('stroke-linecap', 'round');
      circleActive.style.cssText = 'transition:stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1); filter:drop-shadow(0 0 8px var(--accent-primary));';

      svg.appendChild(circleBg);
      svg.appendChild(circleActive);

      const label = document.createElement('div');
      label.style.cssText = 'position:absolute; text-align:center; font-family:var(--font-mono);';
      label.innerHTML = `
        <div style="font-size:26px; font-weight:bold; color:var(--accent-primary);">${props.percent}%</div>
        <div style="font-size:9px; color:#888; letter-spacing:1px;">FPS LOAD</div>
      `;

      wrap.appendChild(svg);
      wrap.appendChild(label);

      container.innerHTML = '';
      container.appendChild(wrap);

      return {
        restart: () => {
          circleActive.setAttribute('stroke-dashoffset', `${circumference}`);
          setTimeout(() => {
            circleActive.setAttribute('stroke-dashoffset', `${offset}`);
          }, 50);
        },
        destroy: () => {}
      };
    },
    flutterSnippet: `ProceduralNeonGauge(
  value: 0.85,
  neonColor: const Color(0xFFC5FF35),
)`,
    flutterFullCode: `import 'dart:math';
import 'package:flutter/material.dart';

class ProceduralNeonGauge extends StatefulWidget {
  final double value; // 0.0 to 1.0
  final Color neonColor;

  const ProceduralNeonGauge({
    super.key,
    this.value = 0.75,
    this.neonColor = const Color(0xFFC5FF35),
  });

  @override
  State<ProceduralNeonGauge> createState() => _ProceduralNeonGaugeState();
}

class _ProceduralNeonGaugeState extends State<ProceduralNeonGauge> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _valueAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _valueAnimation = Tween<double>(begin: 0.0, end: widget.value).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );
    _controller.forward();
  }

  @override
  void didUpdateWidget(covariant ProceduralNeonGauge oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value != widget.value) {
      _valueAnimation = Tween<double>(begin: _valueAnimation.value, end: widget.value).animate(
        CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
      );
      _controller.forward(from: 0.0);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _valueAnimation,
      builder: (context, _) {
        return CustomPaint(
          size: const Size(200, 200),
          painter: _GaugePainter(
            progress: _valueAnimation.value,
            color: widget.neonColor,
          ),
          child: SizedBox(
            width: 200,
            height: 200,
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '\${(_valueAnimation.value * 100).toInt()}%',
                    style: TextStyle(
                      color: widget.neonColor,
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'monospace',
                    ),
                  ),
                  const Text('FPS SPEED', style: TextStyle(color: Colors.grey, fontSize: 10, letterSpacing: 1.2)),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _GaugePainter extends CustomPainter {
  final double progress;
  final Color color;

  _GaugePainter({required this.progress, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final radius = size.width / 2 - 14;

    final bgPaint = Paint()
      ..color = const Color(0xFF222222)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      pi * 0.75,
      pi * 1.5,
      false,
      bgPaint,
    );

    final activePaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      pi * 0.75,
      pi * 1.5 * progress,
      false,
      activePaint,
    );
  }

  @override
  bool shouldRepaint(covariant _GaugePainter oldDelegate) =>
      oldDelegate.progress != progress || oldDelegate.color != color;
}
`,
    params: [
      { name: 'value', type: 'double', defaultVal: '0.75', description: 'Normalized gauge percentage (0.0 to 1.0)' },
      { name: 'neonColor', type: 'Color', defaultVal: 'Color(0xFFC5FF35)', description: 'Arc stroke & glow color' }
    ],
    notes: 'Draws dual arcs with Canvas.drawArc and StrokeCap.round for high-precision procedural rendering.'
  }
];

export const COMPONENTS = [
  ...LIVE_COMPONENTS.map(c => ({
    ...c,
    status: 'complete',
    difficulty: c.difficulty || 'intermediate',
    dependencies: c.dependencies || []
  })),
  ...ROADMAP_COMPONENTS
];

export function getComponentById(id) {
  return COMPONENTS.find(c => c.id === id) || COMPONENTS[0];
}

export function getComponentsByCategory(catId) {
  if (catId === 'all') return COMPONENTS;
  return COMPONENTS.filter(c => c.category === catId);
}

