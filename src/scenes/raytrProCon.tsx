import { Layout, Rect, Txt, TxtProps, makeScene2D } from "@motion-canvas/2d";
import { waitFor, waitUntil } from "@motion-canvas/core";


export default makeScene2D(function* (view) {

    const header = {fontSize: 200};
    const bullet = {fill:'white', fontSize:80};


    view.add(
        <Layout direction={'row'} gap={100} layout>

            <Layout direction={'column'} gap={20}>
                <Txt {...header} fill={'green'}>Pro</Txt>
                <Txt {...bullet}>Simple Operationen</Txt>
                <Txt {...bullet}>Optimierte Hardware</Txt>
            </Layout>

            <Layout direction={'column'} gap={20}>
                <Txt {...header} fill={'red'}>Contra</Txt>
                {/* <Txt {...bullet}>Qualität ~ Tris^n</Txt> */}
                <Txt {...bullet}>{'Viel mehr Dreiecke\n-> nur gring bessere Qualität'}</Txt>
            </Layout>

        </Layout>
    )

    yield* waitUntil("sceneChange");


})