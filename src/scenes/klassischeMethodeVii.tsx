import { Node, Circle, Line, makeScene2D } from "@motion-canvas/2d";
import { Color, Vector2, createRef, createSignal, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const right = createRef<Node>();
    const left = createRef<Node>();

    let tris:  Line[] = [];
    let rad = createSignal(200)



    view.add(
        <>
            <Node ref={left} x={-350} />

            <Node ref={right} x={350}>
                <Circle size={() => rad()*2} fill={'lightgreen'} opacity={0.5}/>
            </Node>
        </>
    );

    yield* waitFor(0.5);


    left().add(
        <Line
            points={[[-200, 250], [-200, 250]]}
            stroke={'lightgreen'}
            lineWidth={10}
            endArrow
        />
    )
    yield* left().childAs<Line>(0).points([[-200, 250], [200, -250]], 1.5);





    yield* waitFor(0.3);
    

    let waitTime = 0.25


    // middle three tris
    for (let i = 0; i < 3*2; i += 2) {

        let new_points : Vector2[] = [];

        let theta = ((i)/6) * 2 * Math.PI;
        new_points.push(new Vector2(Math.cos(theta), Math.sin(theta)))
        theta = ((i+1)/6) * 2 * Math.PI;
        new_points.push(new Vector2(Math.cos(theta), Math.sin(theta)))
        theta = ((i+2)/6) * 2 * Math.PI;
        new_points.push(new Vector2(Math.cos(theta), Math.sin(theta)))

        new_points.forEach((vec, i) => new_points[i] = vec.scale(rad()))

        tris.push(
            <Line
                points={new_points}
                fill={'ff5555'}
                size={200}
                stroke={'white'}
                lineWidth={4}
                closed
                lineJoin={'round'}
            /> as Line
        )
        right().add(tris[i/2])

        yield* waitFor(waitTime)
    }

    // center tri
    tris.push(
        <Line
            points={[[rad(),0],[Math.cos(2/3*Math.PI)*rad(),Math.sin(2/3*Math.PI)*rad()],[Math.cos(4/3*Math.PI)*rad(),Math.sin(4/3*Math.PI)*rad()]]}
            fill={'#ffaaaa'}
            size={200}
            stroke={'white'}
            lineWidth={4}
            lineCap={'round'}
        /> as Line
    )
    right().add(tris[3])
    yield* waitFor(waitTime)

    // outer six tris
    for (let i = 0; i < 6 * 2; i += 2) {

        let new_points : Vector2[] = [];

        let theta = ((i)/6/2) * 2 * Math.PI;
        new_points.push(new Vector2(Math.cos(theta), Math.sin(theta)))
        theta = ((i+1)/6/2) * 2 * Math.PI;
        new_points.push(new Vector2(Math.cos(theta), Math.sin(theta)))
        theta = ((i+2)/6/2) * 2 * Math.PI;
        new_points.push(new Vector2(Math.cos(theta), Math.sin(theta)))

        new_points.forEach((vec, i) => new_points[i] = vec.scale(rad()))

        tris.push(
            <Line
                points={new_points}
                fill={'#ff0000'}
                size={200}
                stroke={'white'}
                lineWidth={4}
                closed
                lineJoin={'round'}
            /> as Line
        )
        right().add(tris[4+i/2])

        yield* waitFor(waitTime)
    }



    yield* waitUntil("sceneChange");

});