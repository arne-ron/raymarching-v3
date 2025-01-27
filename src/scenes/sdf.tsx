import { makeScene2D, Txt, Layout } from "@motion-canvas/2d";
import { Direction, createRef, slideTransition, waitFor } from "@motion-canvas/core";


export default makeScene2D(function* (view) {
    
    const txt = createRef<Txt>();


    view.add(
    <>
        <Layout>
            <Txt fill={'#ffffff'} ref={txt}>f</Txt>

        </Layout>
    </>
    )

    // yield* slideTransition(Direction.Right);

    yield* waitFor(1);

    yield* txt().text("f(x)", 1).to("f(x) ––> d", 1.5);

    yield* waitFor(3)

});