import { Circle, Line, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { chain, createRef, easeOutQuad, linear, sequence, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    
    const l1 = createRef<Line>();
    const l2 = createRef<Line>();
    const col1 = createRef<Txt>();
    const col2 = createRef<Rect>();

    view.add(
        <>
            // --- Bulb ---
            <Circle
                stroke={'#ffffa0'}
                lineWidth={8}
                size={50}
                position={[0, -400]}
            >
                <Line
                    points={[[-10,10],[-10,-10],[10,-10],[10,10]]}
                    stroke={'ffffa0'}
                    lineWidth={8}
                    size={20}
                    radius={5}
                    y={-25-10}
                />

            </Circle>
            // --- Camera ---
            <Rect
                stroke={'gray'}
                lineWidth={8}
                size={[65,50]}
                lineJoin={'round'}
                position={[-451,0]}
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
            // --- Reflectors ---
            <Line
                points={[
                    [413, -70],
                    [391, 70],
                    [391+40, 70+5],
                    [413+40, -70+5],
                ]}
                closed
                lineWidth={10}
                stroke={'#bbbbbb'}
                fill={'#bbbbbb'}
                lineJoin={'round'}
                lineCap={'square'}
            >
            </Line>
            <Line
                points={[
                    [-20,210],
                    [135,210],
                    [135,210+40],
                    [-20,210+40],
                ]}
                closed
                lineWidth={10}
                stroke={'lightgreen'}
                fill={'lightgreen'}
                lineJoin={'round'}
                lineCap={'square'}
            >
            </Line>
            // --- Rays ---
            <Line
                ref = {l1}
                points={[
                    [30,-370],
                    [400,0],
                    [60,200],
                    [-400,0]
                ]}
                lineWidth={15}
                stroke={'gray'}
                endArrow
                arrowSize={20}
                radius={15}
                opacity={0}
            >
            </Line>
            <Line
                ref = {l2}
                points={[
                    [30,-370],
                    [400,0],
                    [60,200],
                    [-400,0]
                ]}
                lineWidth={15}
                stroke={'pink'}
                startArrow
                radius={15}
                opacity={0}
            >
            </Line>
            // --- Color ---
            <Txt
                ref={col1}
                position={[-100,-300]}
                fontFamily='Arial'
                fill={'gray'}
                opacity={0}
            >
                (1.0|1.0|1.0)
            </Txt>
            <Rect
                ref={col2}
                position={() => col1().position()}
                size={[50,50]}
                fill={'lightgreen'}
                radius={7}
                scale={0}
            >
            </Rect>
        </>
    );

    // Calculate arrow length
    var len = 0
    const points = l1().parsedPoints()
    for (let i = 1; i < points.length; i++) {
        var dir = points[i].sub(points[i-1]);
        len += dir.magnitude
    }
    
    
    l2().startOffset(len-10)
    l1().endOffset(len-10)
    

    // Start
    yield* waitFor(2);
    


    // Ray 1
    l1().opacity(1);
    yield* l1().endOffset(0,1);
    l1().endArrow(false);
    yield* waitFor(0.4)
    // Ray 2
    l2().opacity(1);
    yield* l2().startOffset(0,3, linear);
    yield* waitFor(1);
    yield* l2().opacity(0,0.2)

    // Color
    yield* chain(
        col1().position([-450,-80],0),
        waitFor(1),
        col1().opacity(1,0.2),
        waitFor(1),
        col1().position([40,100],1),
        col1().text('(0.5|1.0|0.5)', 0.5),
        waitFor(0.7),
        col1().position([225,-10],1),
        col1().text('(0.4|0.8|0.4)', 0.5),
        waitFor(0.7),
        col1().position([-100,-300], 1),
        waitFor(0.7),
        sequence(0.3,
            col1().scale(0, 1),
            col2().scale(1, 1),
        )
    );



    // End wait
    yield* waitUntil("sceneChange");

});