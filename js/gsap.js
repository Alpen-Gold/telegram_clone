let animatBtn = () => {
  let time = gsap.timeline({
    defaults: { duration: 0.1 },
    repeat: -1,
    repeatDelay: 3,
  });
  time
    .to("#button-start-editor", { rotate: 10 })
    .to("#button-start-editor", { rotate: -10 })
    .to("#button-start-editor", { rotate: 10 })
    .to("#button-start-editor", { rotate: 0 });
  return time;
};

let lg = gsap.timeline({ defaults: { duration: 0.9 } });
lg.from(".mesage-1", { opacity: 0, y: 30 })
  .from(".mesage-2", {
    opacity: 0,
    y: -30,
  })
  .from("#button-start-editor ", {
    opacity: 0,
    y: 30,
  })
  .add(animatBtn);
