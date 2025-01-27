import { makeScene2D, Line, Circle, Txt, Node } from "@motion-canvas/2d";
import { createRef, createSignal, slideTransition, Direction, all, waitFor, waitUntil } from "@motion-canvas/core";
import { Boxy } from "../components/bracket2";

export default makeScene2D(function* (view) {


  const r = [272,80.86,54.37,50,56,74,112,190,71]

  var pos = -200 

  const oppac = createRef<Node>()
  const l = createSignal(pos);

  view.add(
    <>
      <Node ref={oppac} opacity={0.2}/>
      <Line
        points={[
          [pos, 0],
          () => [l(), 0]
        ]}
        lineWidth={5}
        stroke={'lightgray'}
      
      />
      <Circle
        stroke={'lightgray'}
        lineWidth={8}
        position={[200,-250]}
        width={400}
        height={400}
      />
      <Circle
        stroke={'white'}
        lineWidth={8}
        position={[960,0]}
        width={400}
        height={400}
      />
    </>
  )


  yield* slideTransition(Direction.Right);

  yield* waitFor(0.7)

  let speed = 1

  for (let i = 0; i < r.length; i++) {
    
    if (i == 3) speed = 0.5

    const point = createRef<Circle>()
    const v = r[i]
    view.add(
      <Circle
        ref={point}
        x={pos}
        fill="#5050ff"
        width={0}
        height={0}
        zIndex={1}
      />
    )


    yield* all(point().width(25, 0.2).to(20, 0.1 * speed), point().height(25, 0.2).to(20, 0.1 * speed))
    yield* waitFor(0.5 * speed)
    if (i == 0) yield* waitUntil("traycingStart")
    const circle = createRef<Circle>()
    view.add(
      <Circle
        ref={circle}
        x={pos}
        width={2*v}
        height={2*v}
        stroke="#b0b0ff"
        lineWidth={6}
        startAngle={0}
        endAngle={0}
      />
    )
    yield* circle().endAngle(360, 1 * speed),
    pos += v
    yield* l(pos, 0.5 * speed)
    oppac().insert(circle(), 0)

    yield* waitFor(0.4 * speed)
  }

  view.add(
  <Txt x={pos} fill={'#ee2222'} fontFamily={'Arial'} fontWeight={700}>x</Txt>
  )
  



  yield* waitUntil("sceneChange");

});
