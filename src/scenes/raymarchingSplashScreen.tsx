import { makeScene2D, Txt } from "@motion-canvas/2d"
import { createSignal, easeInOutCubic, easeOutCubic, easeOutQuint, waitFor, waitUntil } from "@motion-canvas/core"


export default makeScene2D( function* (view){
    
    yield* waitUntil("textPopup")

    let t = createSignal(15)

    const txtprops = {
        fill: 'white',
        fontSize: 100,
        padding: 20,
    }

    
    view.add(
        <>
            <Txt {...txtprops} offsetY={() => 1.5 * t()} fill={'gray'}>Raymarching</Txt>
            <Txt {...txtprops} offsetY={t} fill={'lightgray'}>Raymarching</Txt>
            <Txt {...txtprops} offsetY={() => 0.5 * t()}>Raymarching</Txt>
        </>
    )


    yield* waitFor(0.2)

    yield* t(0, 1.2, easeOutQuint)
    yield* waitUntil("sceneChange")
})