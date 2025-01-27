import { Line, LineProps } from "@motion-canvas/2d/lib/components";
import { signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";



export interface BracketProps extends LineProps {
    length?: SignalValue<number>;
    height?: SignalValue<number>;
};


/**
 * A curly bracket '{'
 */
export class Bracket extends Line {

    @signal()
    public declare readonly length: SimpleSignal<number, this>;

    @signal()
    public declare readonly heigth: SimpleSignal<number, this>;


    // Animatable properties:
    len = 100; // length
    heig = 30; // height

    public constructor(props?: BracketProps) {
        super({
            ...props,
            points: [
                  [-len / 2.0, 0],
                  [-len / 2.0, heig / 2.0],
                  [0, len / 2.0],
                  [0, heig / 2],
                  [0, heig / 2.0],
                  [len / 2.0, heig /2.0],
                  [len / 2.0, 0]
                ]
        });
    }
};