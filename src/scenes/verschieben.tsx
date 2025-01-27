import { Circle, Grid, Latex, Line, Node, Txt, makeScene2D } from "@motion-canvas/2d";
import { Vector2, all, createRef, createSignal, waitFor, waitUntil } from "@motion-canvas/core";



export default makeScene2D(function* (view) {


    const world = createRef<Grid>()
    const tex1 = createRef<Latex>()
    const tex2 = createRef<Latex>()
    const vec1o = createRef<Line>()
    const vec2o = createRef<Line>()

    let vec1 = createSignal(new Vector2(0,0))
    let vec2 = createSignal(new Vector2(0,0))


    view.add(
        <>
            <Grid
                ref={world}
                size={'200%'}
                lineWidth={4}
                spacing={100}
                stroke={'#353535'}
            >
                <Circle
                    size={300}
                    // fill={'lightblue'}
                    stroke={'lightblue'}
                    lineWidth={8}
                />


                {/***** vec{s} ******/}
                <Line
                        ref={vec2o}
                        points={[[0,0], vec2]}
                        stroke={'red'}
                        lineWidth={8}
                        lineCap={'round'}
                        arrowSize={16}
                        endArrow
                        opacity={() => (Vector2.zero.equals(vec2(), 0.01)) ? 0 : 1}
                />
                {/***** Label ******/}
                <Latex
                    tex='{\color{red} \overrightarrow{s} \;\;}'
                    height={70}
                    left={() => vec2().scale(0.5).add(vec2().normalized.scale(50).rotate(90))}
                    opacity={() => (Vector2.zero.equals(vec2(), 0.01)) ? 0 : 1}
                />



                {/***** vec{x} ******/}
                <Line
                    ref={vec1o}
                    points={[vec2, () => vec1().add(vec2())]}
                    stroke={'white'}
                    lineWidth={8}
                    lineCap={'round'}
                    arrowSize={16}
                    endArrow
                    opacity={() => (Vector2.zero.equals(vec1(), 0.01)) ? 0 : 1}
                />
                {/***** Label ******/}
                <Latex
                    tex='{\color{white} \overrightarrow{x} \;\;}'
                    height={70}
                    left={() => vec1().scale(0.5).add(vec2()).add(vec1().normalized.scale(50).rotate(90))}
                    opacity={() => (Vector2.zero.equals(vec1(), 0.01)) ? 0 : 1}
                />
            </Grid>


            {/***** SDF ******/}
            <Latex
                ref={tex1}
                tex='{ \color{white} f( \; \overrightarrow{x} \; )= d }'
                height={100}
                topLeft={() => view.size().scale(-0.5).sub(-25)}
            />
            <Latex
                ref={tex2}
                tex='{ \color{white} f( \; \overrightarrow{x} + \color{red} \overrightarrow{s} \color{white} \; )= d }'
                height={100}
                topLeft={() => view.size().scale(-0.5).sub(-25)}
                opacity={0}
            />
        </>
    )

    yield* vec1(new Vector2(400,200), 3)
    yield* vec1(new Vector2(100,400), 3)
    tex1().opacity(0)
    tex2().opacity(1)
    yield* vec2(new Vector2(300,-200), 3)
    yield* all(
        world().position(vec2().scale(-1), 1),
        vec2o().opacity(0.3, 1),
    )
    yield* vec1(new Vector2(-100, -100), 3)
    yield* vec1(new Vector2(100, -200), 3)
    
    yield* waitUntil("sceneChange")

})