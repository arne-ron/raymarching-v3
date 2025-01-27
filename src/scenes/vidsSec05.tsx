import { Video, makeScene2D } from "@motion-canvas/2d";
import { waitFor, waitUntil } from "@motion-canvas/core";

import vid01 from '../../3d_renders/raymarch_v01.mp4';
import vid02 from '../../3d_renders/raymarch_v02.mp4';
import vid03 from '../../3d_renders/raymarch_v03.mp4';
import vid04 from '../../3d_renders/raymarch_v04.mp4';
import vid05 from '../../3d_renders/raymarch_v05.mp4';
import vid06 from '../../3d_renders/raymarch_v06.mp4';
import vid07 from '../../3d_renders/raymarch_v07.mp4';
import vid08 from '../../3d_renders/raymarch_v08.mp4';
import vid09 from '../../3d_renders/raymarch_v09.mp4';
import vid10 from '../../3d_renders/raymarch_v10.mp4';
import vid11 from '../../3d_renders/raymarch_v11.mp4';
import vid12 from '../../3d_renders/raymarch_v12.mp4';
import vid13 from '../../3d_renders/raymarch_v13.mp4';


export default makeScene2D(function* (view) {

    let start = 11
    let end = 12

    let vids : Video[] = []

    vids.push(<Video src={vid01}/> as Video)
    vids.push(<Video src={vid02}/> as Video)
    vids.push(<Video src={vid03}/> as Video)
    vids.push(<Video src={vid04}/> as Video)
    vids.push(<Video src={vid05}/> as Video)
    vids.push(<Video src={vid06}/> as Video)
    vids.push(<Video src={vid07}/> as Video)
    vids.push(<Video src={vid08}/> as Video)
    vids.push(<Video src={vid09}/> as Video)
    vids.push(<Video src={vid10}/> as Video)
    vids.push(<Video src={vid11}/> as Video)
    vids.push(<Video src={vid12}/> as Video)
    vids.push(<Video src={vid13}/> as Video)
   



    for (let i = start; i <= end; i++) {
        let vid = vids[i-1]
        view.add(vid)
        vid.play()
        vid.loop(true)

        yield* waitFor(6)
        // yield* waitUntil("vid" + i.toString().padStart(2, "0"));
        if (i == end) break
        vid.pause()
        vid.remove()
    }

    yield* waitUntil("theEnd?")
})