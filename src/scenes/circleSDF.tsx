import { Circle, Grid, Line, Txt, makeScene2D } from "@motion-canvas/2d";
import { PossibleVector2, Vector2, all, chain, createRef, createSignal, useLogger, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view){

    const vec1 = createRef<Line>();
    const vec2 = createRef<Line>();
    const circle = createRef<Circle>();
    var dest = createSignal(new Vector2(0,0))
    var rad = createSignal(0)

    let logger = useLogger()

    view.add(
    <>
        <Grid
            size={'100%'}
            lineWidth={4}
            spacing={100}
            stroke={'#353535'}
        >
            <Circle
                ref = {circle}
                stroke={'#ffffff'}
                lineWidth={5}
                opacity={0.2}
                rotation={-45}
                size={() => rad()*2}
                endAngle={0}
                fill={'#ff5555'}
                closed
            />
            <Line
                ref={vec1}
                points={[[0,0], () => dest()]}
                stroke={'lightgray'}
                lineWidth={8}
                lineCap={'round'}
                arrowSize={16}
                endArrow
            />
            <Circle
                size={20}
                fill={'gray'}
            />
            <Line
                ref={vec2}
                stroke={'red'}
                lineWidth={8}
                endArrow
                opacity={0}
                lineCap={'round'}
                arrowSize={16}
                points={[
                    () => {return (dest().magnitude > rad()) ? dest().normalized.scale(rad()) : dest()},
                    () => {return (dest().magnitude > rad()) ? dest().normalized.scale(rad()) : dest()},
                    //() => {return (dest().magnitude < rad()) ? dest().normalized.scale(dest().magnitude - rad()) : [0,0]}
                    ]}
            />
        </Grid>
        <Txt
            position={[-600,-300]}
            fill={() => {return (dest().magnitude - rad() >= 0) ? 'white' : 'red'}}
            text={() => "d = "+(dest().magnitude - rad()).toString().split(".", 1)}
        />
    </>
    )

    yield* waitUntil("position")
    yield* dest(new Vector2(250, -150), 3)
    yield* dest(new Vector2(250, -250), 2)


    yield* waitUntil("subtraction")
    vec2().opacity(1)
    rad(275)
    yield* vec2().points(
        [
            vec2().points()[0],
            () => {return (dest().magnitude < rad()) ? dest().normalized.scale(dest().magnitude - rad()) : [0,0]},
        ], 1)
    yield* circle().endAngle(360,1.3),
    circle().closed(false),

    yield* waitUntil("negativ")
    yield* dest(new Vector2(150,100), 1.6)
    yield* waitUntil("null")
    yield* dest(new Vector2(rad() *  Math.SQRT1_2), 1.6)
    yield* waitUntil("positiv")
    yield* dest(new Vector2(350,250), 1.6)

    yield* waitFor(2)
    
});