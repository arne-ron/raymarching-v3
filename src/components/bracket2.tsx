import { Circle, Node, RectProps } from '@motion-canvas/2d/lib/components';
import { NodeProps, Rect } from '@motion-canvas/2d/lib/components';
import { signal, initial } from '@motion-canvas/2d/lib/decorators';
import { SignalValue, SimpleSignal, createSignal } from '@motion-canvas/core/lib/signals';
import { Spacing } from '@motion-canvas/core/lib/types';

  
export interface SwitchProps extends RectProps {
    initialState?: SignalValue<boolean>;
}

export class Boxy extends Rect {
@initial(false)
@signal()
public declare readonly initialState: SimpleSignal<boolean, this>;


private isOn: boolean;


public constructor(props?: SwitchProps) {
    super({
        size: [200, 200],
        fill: 'green',
        ...props,
        stroke: 'red',
        lineWidth: createSignal(props.radius) as SignalValue<number>
    });
    this.lineWidth(this.radius as SignalValue<number>)

    this.isOn = this.initialState();
}
}