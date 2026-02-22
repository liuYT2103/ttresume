export function toggleWithAnimation(event:MouseEvent, toggleFunction:Function) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    toggleFunction();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    toggleFunction();
  });

  transition.ready.then(() => {
    const clipPathFrom = `circle(0px at ${x}px ${y}px)`;
    const clipPathTo = `circle(${maxRadius}px at ${x}px ${y}px)`;

    document.documentElement.animate(
      {
        clipPath: [clipPathFrom, clipPathTo],
      },
      {
        duration: 500,
        easing: 'cubic-bezier(.58,.13,.94,.04)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  });
}