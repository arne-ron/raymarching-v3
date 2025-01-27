import { Circle, Line, Rect, makeScene2D } from "@motion-canvas/2d";
import { DEG2RAD, RAD2DEG, Vector2, createRef, easeInOutSine, waitFor, waitUntil } from "@motion-canvas/core";


export default makeScene2D(function* (view) {
    
    let grid_size = 30
    let box_size = 27
    let dist = 32
    let angle = 25
    let threshold = Math.cos((angle+5) * DEG2RAD)

    const cam = createRef<Circle>()


    view.add(
        <Circle
        size={1400}
            ref={cam}
            startAngle={-angle}
            endAngle={angle }
            stroke={'white'}
            lineWidth={7}
            lineJoin={'round'}
            zIndex={1}
            closed
        >
            // Camera
            <Rect
                stroke={'gray'}
                lineWidth={8}
                size={[65,50]}
                lineJoin={'round'}
                x={-60}
                zIndex={1}
            >
                <Line
                    points={[
                        [0, -10],
                        [20, -20],
                        [20, 20],
                        [0, 10]
                    ]}
                    x={32.5}
                    stroke={'gray'}
                    lineWidth={8}
                    lineJoin={'round'}
                >

                </Line>
            </Rect>
        </Circle>    
    )

    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {

            let pos = [dist*i - (grid_size-1)*dist/2, dist*j - (grid_size-1)*dist/2]
            
            view.add(
                <Rect
                    position={[pos[0], pos[1]]}
                    size={box_size}
                    fill={'lightgreen'}
                    opacity={() => {
                        let dot = new Vector2(pos[0], pos[1]).normalized.dot(Vector2.right.rotate(cam().rotation()))
                        return (dot > threshold) ? dot*dot : 0.13
                    }}
                />
            )
        }
    }
    
    yield* cam().rotation(360, 5, easeInOutSine)


    yield* waitUntil("fadeOut");
})