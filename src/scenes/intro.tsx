import { Txt, makeScene2D } from "@motion-canvas/2d";
import { createRef, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const text = createRef<Txt>()
    const text2 = createRef<Txt>()

    view.add(
        <>
            <Txt
                fill={'white'}
                fontSize={250}
                text={''}
                ref={text}
            />
            <Txt
                fill={'lightgray'}
                fontSize={100}
                text={''}
                ref={text2}
                y={() => (text().height()/2 + 15)}
            />
        </>
    )


    yield* text().text('Raymarching', 2);
    yield* text2().text('eine Alternative zum Raytraycing?', 2);
    yield* waitUntil('sceneChange');  
})