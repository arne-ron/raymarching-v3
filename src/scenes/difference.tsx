import { Node, Circle, Rect, makeScene2D, Layout, Txt, Shape, Line } from "@motion-canvas/2d";
import { Color, Origin, all, chain, createRef, createSignal, loop, loopFor, makeRef, sequence, threads, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view){
    
    const origObj = createRef<Node>();
    
    const one = createRef<Circle>();
    const two = createRef<Rect>();




    const rects : Rect[] = [];

    let x1 = createSignal(250);

    view.add(
        <>
            {/*** Rects for ref ***/}
            <Layout
                layout
                direction={"row"}
                width={'100%'}
                height={700}
                gap={40}
                padding={100}
                bottom={view.getOriginDelta(Origin.Bottom)}
            >
                <Rect size={'100%'} fill={'#333333'} ref={makeRef(rects, rects.length)}/>
                <Rect size={'100%'} fill={'#333333'} ref={makeRef(rects, rects.length)}/>
                <Rect size={'100%'} fill={'#333333'} ref={makeRef(rects, rects.length)}/>
                <Rect size={'100%'} fill={'#333333'} ref={makeRef(rects, rects.length)}/>
            </Layout>

            {/*** Original view ***/}
            <Rect
                ref={makeRef(rects, rects.length)}
                y={-300}
                fill={'#333333'}
                size={[500,400]}
            >
                
            </Rect>
            {/*** Legend ***/}
            <Layout
                direction={"column"}
                gap={15}
                layout
                topLeft={() => view.getOriginDelta(Origin.TopLeft)}
                padding={30}
            >
                <Layout direction={"row"} gap={15} padding={15}>
                    <Rect
                        size={50}
                        radius={5}
                        fill={'#ffbbbb'}
                        stroke={'#ff8888'}
                        lineWidth={10}
                    />
                    <Txt fill={'#ffffff'}>Ursprüngliche SDFs</Txt>
                </Layout>
                <Rect height={4} fill={'#404040'}/>
                <Layout direction={"row"} gap={15} padding={15}>
                    <Rect
                        size={50}
                        radius={5}
                        fill={'#bbffbb'}
                        stroke={'#88ff88'}
                        lineWidth={10}
                    />
                    <Txt fill={'#ffffff'}>Kombinierte SDF</Txt>
                </Layout>
            </Layout>
            

            <Node ref={origObj}>
                {/*** Circle ***/}
                <Circle
                    ref={one}
                    x={() => -1 * x1()}
                    y={-50}
                    stroke={'#ff8888'}
                    fill={'ffbbbb'}
                    lineWidth={10}
                    size={400}
                />

                {/*** Rect ***/}
                <Rect
                    ref={two}
                    x={x1}
                    stroke={'#ff8888'}
                    fill={'ffbbbb'}
                    lineWidth={10}
                    size={400}
                    radius={5}
                />
            </Node>        
        </>
    )




    rects.forEach((rect, i) => {
        rect.opacity(0)

        if (i == rects.length - 1) return
        rect.add(
        <Node scale={0.5} rotation={60}>
            {[
                one().reactiveClone().layout(false).opacity(0.3),
                two().reactiveClone().layout(false).opacity(0.3),
            ]}
        </Node>)

        let str
        switch (i) {
        case 0:
            str = 'max()'
            break;
        case 1:
            str = 'min()'
            break;
        case 2:
            str = 'max( + | - )'
            break;
        case 3:
            str = 'max( - | +)'
            break;
            default:
                str = 'err'
                break;
        }
        rect.add(
            <Txt
                alignSelf={'end'}
                fill={'white'}
                //bottom={rects[i].bottom}
            >
                {str}
            </Txt>
        )
    })




    {/*** max(++) ***/}
    rects[0].childAs(0).add(
        <Node cache>
            {[
                one().reactiveClone().layout(false)
                    .fill('lightgreen')
                    .stroke('lightgreen')
                    .zIndex(1)
                    .compositeOperation('source-in'),
                two().reactiveClone().layout(false)
            ]}
        </Node>
    )

    {/*** min(++) ***/}
    rects[1].childAs(0).add(
        <Node cache>
            {[
                one().reactiveClone().layout(false)
                    .fill('lightgreen')
                    .stroke('lightgreen')
                    .zIndex(1),
                two().reactiveClone().layout(false)
                    .fill('lightgreen')
                    .stroke('lightgreen')
                    .zIndex(1),
            ]}
        </Node>
    )

    
    {/*** min(+-) ***/}
    rects[2].childAs(0).add(
        <Node cache>
            {[
                one().reactiveClone().layout(false),
                two().reactiveClone().layout(false)
                    .fill('lightgreen')
                    .stroke('lightgreen')
                    .zIndex(1)
                    .compositeOperation('source-out'),
            ]}
        </Node>
    )

    {/*** max() ***/}
    rects[3].childAs(0).add(
        <Node cache>
            {[
                one().reactiveClone().layout(false)
                    .fill('lightgreen')
                    .stroke('lightgreen')
                    .zIndex(1)
                    .compositeOperation('source-out'),
                two().reactiveClone().layout(false),
            ]}
        </Node>
    )





    yield loop( () => x1(50, 2).back(2) )

    yield* waitUntil("smaller")
    yield* all(
        rects[rects.length-1].opacity(1,1),
        origObj().position(rects[rects.length-1].position(), 1),
        origObj().rotation(30,1),
        origObj().scale(0.5, 1),
    )
    origObj().reparent(rects[4])

    
    yield* waitUntil("intersection")
    yield* rects[0].opacity(1, 1)
    
    yield* waitUntil("union")
    yield* rects[1].opacity(1, 1)
    
    yield* waitUntil("difference_1")
    yield* rects[2].opacity(1, 1)

    yield* waitUntil("difference_2")
    yield* rects[3].opacity(1, 1)


    // yield* sequence(
    //     4,
    //     ...rects.map((rect) => rect.opacity(1, 1))
    // )
    

    yield* waitUntil("sceneChange");

})