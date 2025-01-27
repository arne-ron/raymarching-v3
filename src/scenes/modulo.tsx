import { Node, Circle, Grid, Line, makeScene2D, Txt, Latex, Rect } from "@motion-canvas/2d";
import { Vector2, all, createRef, createSignal, linear, makeRef, sequence, waitFor, waitUntil } from "@motion-canvas/core";


export default makeScene2D(function* (view) {

    let pos_glob = createSignal<Vector2>(Vector2.zero);
    
    const vecParent = createRef<Grid>();


    view.add(
        <>
            <Grid
                size={'100%'}
                lineWidth={4}
                spacing={100}
                stroke={'#353535'}
                >
                <Node ref={vecParent}/>
                <Circle
                    size={20}
                    fill={'gray'}
                    />
            </Grid>
            <Latex
                width={450}
                y={-200}
                tex= '{ \color{white} \overrightarrow{pos} \; \% \; 1 = \overrightarrow{ {pos}}_{new} }' //'{ \color{white} \overrightarrow{pos} % 1 = \overrightarrow{ {pos}_{new} } }'
            />
            <Txt
                fill={'#ffffff'}
                y={-100}
                text={() => {
                    let x = pos_glob().x;
                    let y = pos_glob().y;
                    return `[${x.toFixed(1)} | ${y.toFixed(1)}] % 1 = [${(x%1).toFixed(1)} | ${(y%1).toFixed(1)}]`
                }}
            />
            <Rect
                position={[100,100]}
                fill={'#ffffee'}
                opacity={0.07}
                size={200}
            />
        </>
    )

    

    yield* waitFor(1)

    let lines : Line[] = []
    let pos = Vector2.zero;
    let dt = 0;
    let dir = new Vector2(1.5, 1);
    let scale = 200;

    for (let i = 0; i < 5; i++) {

        if (i != 0) {
            lines[i-1].endArrow(false).stroke('#555566')
        }

        let d = Vector2.one.sub(pos)
        let s = d.div(dir)
        dt = (s.x > s.y) ? s.y : s.x


        vecParent().add(
            <Line
                ref={makeRef(lines, i)}
                stroke={'white'}
                lineWidth={10}
                endArrow
                lineCap={'round'}
                arrowSize={18}
                points={[
                    pos.scale(scale),
                    pos.scale(scale)
                ]}
            />
        )
        yield* all(
            lines[i].points([pos.scale(scale), pos.add(dir.mul(dt)).scale(scale)], dt * 3, linear),
            pos_glob(pos_glob().add(dir.scale(dt)), dt*3, linear)
        )
        
        pos = pos.add(dir.mul(dt)).mod(Vector2.one)


    }


    yield* waitUntil("sceneChange")

})