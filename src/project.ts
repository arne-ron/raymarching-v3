import { makeProject } from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import klassischeMethode from './scenes/klassischeMethode?scene';
import klassischeMethodeVii from './scenes/klassischeMethodeVii?scene';
import raytrProCon from './scenes/raytrProCon?scene';
import LODuCulling from './scenes/LODuCulling?scene';
import raymarchingSplashScreen from './scenes/raymarchingSplashScreen?scene';
import sdf from './scenes/sdf?scene';
import raymarch from './scenes/raymarch?scene';
import vidsSec01 from './scenes/vidsSec01?scene';
import circleSDF from './scenes/circleSDF?scene';
import vidsSec02 from './scenes/vidsSec02?scene';
import verschieben from './scenes/verschieben?scene';
import vidsSec03 from './scenes/vidsSec03?scene';
import difference from './scenes/difference?scene';
import vidsSec04 from './scenes/vidsSec04?scene';
import modulo from './scenes/modulo?scene';
import vidsSec05 from './scenes/vidsSec05?scene';


import audio from '../audio/script_v1.mp3'


export default makeProject({
  scenes: [

    intro,
      klassischeMethode,
      klassischeMethodeVii,
      raytrProCon,
      LODuCulling,

    raymarchingSplashScreen,
      sdf,
      raymarch,
      vidsSec01,
      circleSDF,
      vidsSec02,
      verschieben,
      vidsSec03,
      difference,
      vidsSec04,
      modulo,
      vidsSec05,

  ],
  
  audio: audio,
});
